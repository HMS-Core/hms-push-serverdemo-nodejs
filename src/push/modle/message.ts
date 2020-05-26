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

import { RetryConfig } from "../../utils/api-request";
import { WebPushConfig } from "./message-webpush";
import { ApnsConfig } from "./message-apns";

export interface MessagingConfig {
    devappid: string;
    messagingUrl?: string;
    retryConfig?: RetryConfig;
}

export interface MsgRequest {
    validate_only: boolean;
    message: Message;
}

export interface AndroidConfig {
    collapse_key?: number;
    urgency?: string;
    ttl?: string;
    bi_tag?: string;
    fast_app_target?: number;
    data?: string;
    notification?: AndroidNotification;
}

export interface AndroidNotification {
    title?: string;
    body?: string;
    icon?: string;
    color?: string;
    sound?: string;
    default_sound?:boolean;
    tag?: string;
    click_action?: ClickAction;
    body_loc_key?: string;
    body_loc_args?: Array<string>;
    title_loc_key?: string;
    title_loc_args?: Array<string>;
    multi_lang_key?: MultiLanguageKey;
    channel_id?: string;
    notify_summary?: string;
    image?: string;
    style: number;
    big_title?: string;
    big_body?: string;
    big_picture?: string;
    auto_clear?: number;
    notify_id?: number;
    group?: string;
    badge?: BadgeNotification;
    ticker?:string;
    auto_cancel?:boolean;
    when?:string;
    importance?:string;
    use_default_vibrate?:boolean;
    use_default_light?:boolean;
    vibrate_config?:Array<string>;
    visibility?:string;
    light_settings?:LightSettings;
    foreground_show?:boolean;
}

export interface MultiLanguageKey {
    title_key?: MultiLanguageSelect;
    body_key?: MultiLanguageSelect;
}

export interface MultiLanguageSelect {
    en?: string;
    zh?: string;
    ru?: string;
}

export interface ClickAction {
    type: number;
    intent?: string;
    url?: string;
    rich_resource?: string;
    action?:string;
}

export interface BadgeNotification {
    add_num?: number;
    class?: string;
    set_num?:number;
}

export interface LightSettings {
    color?: Color;
    light_on_duration?: string;
    light_off_duration?:string;
}

export interface Color {
    alpha?: number;
    red?: number;
    green?:number;
    blue?:number;
}

export interface Notification {
    title?: string;
    body?: string;
    image?:string;
}

export interface Message {
    data?: string;
    notification?: Notification;
    android?: AndroidConfig;
    apns?: ApnsConfig;
    webpush?: WebPushConfig;
    token?: Array<string>;
    topic?: string;
    condition?: string;
}

export interface MsgResponse {
    code: string;
    msg: string;
    requestId: string;
}

export interface ErrIndex {
    index?: number;
    reason?: string;
}