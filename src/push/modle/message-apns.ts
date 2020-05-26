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

export interface ApnsConfig {
    headers?: {[key: string]: string};
    payload: ApnsPayload;
    hms_options: ApnsOptions;
}

export interface ApnsOptions {
    target_user_type: number;
  }

export interface ApnsPayload {
    aps: Aps;
    acme_account: string;
    acme_message: string;
  }

  export interface Aps {
    alert?: string | AlertDictionary;
    badge?: number;
    sound?: string;
    content_available?: boolean;
    category?: string;
    thread_id?: string;
  }

  export interface AlertDictionary {
    title?: string;
    body?: string;
    title_loc_key?: string;
    title_loc_args?: string[];
    action_loc_key?: string;
    loc_key?: string;
    loc_args?: string[];
    launch_image?: string;
  }