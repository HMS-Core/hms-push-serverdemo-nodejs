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

import { ErrIndex } from "./message";

export interface TopicConfig {
    devappid: string;
    topicUrl?: string;
}

export interface TopicRequest {
    topic: string;
    tokenArray: Array<string>;
}

export interface QueryTopicRequest {
    token: string;
}

export interface TopicResponse {
    code: string;
    msg: string;
    requestId: string;
    failureCount: number;
    successCount: number;
    errors?: Array<ErrIndex>;
}

export interface QueryTopicResponse {
    code: string;
    msg: string;
    requestId: string;
    topics?:Array<TopicBody>
}

export interface TopicBody {
    name?: string;
    addDate?: string;
}