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

import { Messaging } from "./push/messaging";
import { Topic } from "./push/topic";
import { MessagingConfig } from "./push/modle/message";
import { TopicConfig } from "./push/modle/topic";
import { AuthClient } from "./auth/auth";

export class HcmNamespace {
    private authClient: AuthClient;
    private config: HcmConfig;

    public init(conf: HcmConfig) {
        this.config = conf;
        this.authClient = new AuthClient(conf);
    }

    public async auth() {
        if (!this.checkInit()) {
            return;
        }
        let token = await this.authClient.refreshToken();
        return token;
    }

    public messaging(conf?: MessagingConfig): HcmServiceNamespace<Messaging> {
        if (!this.checkInit()) {
            return;
        }
        if (!conf) {
            conf = {
                devappid: this.config.appId
            };
        }
        conf.devappid = conf.devappid ? conf.devappid : this.config.appId;
        conf.messagingUrl = conf.messagingUrl ? conf.messagingUrl : this.config.pushUrl;
        let messaging = new Messaging(conf, this.authClient);

        return { messaging };
    }

    public topic(tconf?: TopicConfig): HcmServiceNamespace<Topic> {
        if (!this.checkInit()) {
            return;
        }
        if (!tconf) {
            tconf = {
                devappid: this.config.appId
            };
        }
        tconf.devappid = tconf.devappid ? tconf.devappid : this.config.appId;
        tconf.topicUrl = tconf.topicUrl ? tconf.topicUrl : this.config.pushUrl;
        let topic = new Topic(tconf, this.authClient);

        return { topic };
    }

    private checkInit() {
        if (!this.config || !this.config.appId || !this.config.appSecret) {
            throw new Error("appId or appsecret is null, please init Hcm first!");
        }
        return true;
    }
}

export interface HcmServiceNamespace<T> {
    [key: string]: T;
}

export interface HcmConfig {
    appId: string;
    appSecret: string;
    authUrl?: string;
    pushUrl?: string
}
