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

import { TopicConfig, TopicRequest, TopicResponse, QueryTopicRequest, QueryTopicResponse } from "./modle/topic";
import { AuthClient } from "../auth/auth";
import { HttpClient, HttpRequestConfig, ENDPOINT, TOKENTIMEOUTERR } from "../utils/api-request";

const SEND_METHOD = "POST";
export class Topic {
    private config: TopicConfig;
    private authClient: AuthClient;
    private _httpClient: HttpClient;

    constructor(conf: TopicConfig, auth: AuthClient) {
        this.config = conf;
        this.authClient = auth;
        this._httpClient = new HttpClient();
    }

    // subscribeTopic
    // The developer server calls this interface to single or multiple users to complete the topic subscription operation
    public async subScribeTopic(req: TopicRequest) {
        if (!this.authClient) {
            throw new Error("can't refresh token because getting auth client fail");
        }
        if (!this.authClient.token) {
            await this.authClient.refreshToken();
        }
        let result = await this.getSubscribeTopicReq(req);
        if (result.code === TOKENTIMEOUTERR) {
            await this.authClient.refreshToken();
            result = await this.getSubscribeTopicReq(req);
        }
        return result;
    }

    private async getSubscribeTopicReq(req:TopicRequest): Promise<TopicResponse> {
        let option: HttpRequestConfig = {} as any;
        let url = this.config.topicUrl ? this.config.topicUrl : ENDPOINT;
        option.uri = `${url}/${this.config.devappid}/topic:subscribe`;
        option.headers = {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Bearer ${this.authClient.token}`
        };
        option.body = req;
        option.method = SEND_METHOD;
        option.json = true;
        return this._httpClient.send(option).then(res => {
            let data = res.data;
            return data;
        });
    }

    // unsubscribeTopic
    // The developer server calls this interface to single or multiple users to complete the topic unsubscription operation
    public async unSubScribeTopic(req: TopicRequest) {
        if (!this.authClient) {
            throw new Error("can't refresh token because getting auth client fail");
        }
        if (!this.authClient.token) {
            await this.authClient.refreshToken();
        }
        let result = await this.getUnSubscribeTopicReq(req);
        if (result.code === TOKENTIMEOUTERR) {
            await this.authClient.refreshToken();
            result = await this.getUnSubscribeTopicReq(req);
        }
        return result;
    }

    private async getUnSubscribeTopicReq(req:TopicRequest): Promise<TopicResponse> {
        let option: HttpRequestConfig = {} as any;
        let url = this.config.topicUrl ? this.config.topicUrl : ENDPOINT;
        option.uri = `${url}/${this.config.devappid}/topic:unsubscribe`;
        option.headers = {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Bearer ${this.authClient.token}`
        };
        option.body = req;
        option.method = SEND_METHOD;
        option.json = true;
        return this._httpClient.send(option).then(res => {
            let data = res.data;
            return data;
        });
    }

    // queryTopic
    // The developer server calls this interface to single or multiple users to complete the topic query operation
    public async queryTopicList(req: QueryTopicRequest) {
        if (!this.authClient) {
            throw new Error("can't refresh token because getting auth client fail");
        }
        if (!this.authClient.token) {
            await this.authClient.refreshToken();
        }
        let result = await this.getQueryTopic(req);
        if (result.code === TOKENTIMEOUTERR) {
            await this.authClient.refreshToken();
            result = await this.getQueryTopic(req);
        }
        return result;
    }

    private async getQueryTopic(req: QueryTopicRequest): Promise<QueryTopicResponse> {
        let option: HttpRequestConfig = {} as any;
        let url = this.config.topicUrl ? this.config.topicUrl : ENDPOINT;
        option.uri = `${url}/${this.config.devappid}/topic:list`;
        option.headers = {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Bearer ${this.authClient.token}`
        };
        option.body = req;
        option.method = SEND_METHOD;
        option.json = true;
        return this._httpClient.send(option).then(res => {
            let data = res.data;
            return data;
        });
    }
}
