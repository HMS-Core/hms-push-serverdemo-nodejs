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

import { HttpClient, HttpRequestConfig, HttpMethod } from "../utils/api-request";
import { HcmConfig } from "../hcm-namespace";
const REFRESH_TOKEN_METHOD: HttpMethod = "POST";
const ENDPOINT = "https://logintestlf.hwcloudtest.cn/oauth2/token";

export class AuthClient {
    private _httpClient: HttpClient;
    private config: HcmConfig;
    private _token: string;
    constructor(conf: HcmConfig) {
        this._httpClient = new HttpClient();
        this.config = conf;
    }

    get httpClient(): HttpClient {
        return this._httpClient;
    }

    get token(): string {
        return this._token;
    }

    public async refreshToken() {
        let option: HttpRequestConfig = {} as any;
        option.uri = this.config.authUrl ? this.config.authUrl : ENDPOINT;
        option.headers = {
            "Content-Type": "application/x-www-form-urlencoded"
        };
        option.form = {
            grant_type: "client_credentials",
            client_secret: this.config.appSecret,
            client_id: this.config.appId
        };
        option.method = REFRESH_TOKEN_METHOD;
        option.json = true;
        return this._httpClient.sendWithRetry(option).then(res => {
            this._token = res.data.access_token;
            return this._token;
        });
    }
}
