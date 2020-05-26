/*!
 * Copyright 2020. Huawei Technologies Co., Ltd. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { MessagingConfig, Message, MsgRequest, MsgResponse } from "./modle/message";
import { AuthClient } from "../auth/auth";
import { HttpClient, HttpRequestConfig, ENDPOINT, TOKENTIMEOUTERR } from "../utils/api-request";
import { validateMessage } from "./message-validator";

const SEND_METHOD = "POST";
export class Messaging {
    private config: MessagingConfig;
    private authClient: AuthClient;
    private _httpClient: HttpClient;

    constructor(conf: MessagingConfig, auth: AuthClient) {
        this.config = conf;
        this.authClient = auth;
        this._httpClient = new HttpClient(conf.retryConfig);
    }

    public async send(message: Message, validationOnly: boolean = false, dryRun: boolean = true) {
        let request: MsgRequest = {
            validate_only: validationOnly,
            message
        };
        if (!this.authClient) {
            throw new Error("can't refresh token because getting auth client fail");
        }
        if (!this.authClient.token) {
            await this.authClient.refreshToken();
        }
        let result = await this.sendRequest(request, dryRun);
        if (result.code === TOKENTIMEOUTERR) {
            await this.authClient.refreshToken();
            result = await this.sendRequest(request, dryRun);
        }
        return result;
    }

    private async sendRequest(req: MsgRequest, dryRun?: boolean): Promise<MsgResponse> {
        validateMessage(req.message);
        let option: HttpRequestConfig = {} as any;
        let url = this.config.messagingUrl ? this.config.messagingUrl : ENDPOINT;
        option.uri = `${url}/${this.config.devappid}/messages:send`;
        option.headers = {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Bearer ${this.authClient.token}`
        };
        option.body = req;
        option.method = SEND_METHOD;
        option.json = true;
        if (dryRun) {
            return this._httpClient.sendWithRetry(option).then(res => {
                let data = res.data;
                return data;
            });
        }
        return this._httpClient.send(option).then(res => {
            let data = res.data;
            return data;
        });
    }
}
