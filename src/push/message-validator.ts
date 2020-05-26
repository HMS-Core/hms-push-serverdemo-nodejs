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

import { Message,Notification, AndroidConfig, AndroidNotification, ClickAction, LightSettings } from "./modle/message";
import { WebPushConfig } from "./modle/message-webpush";
import * as validator from "../utils/validator";

const PriorityHight = "HIGH",
      PriorityNormal = "NORMAL";

const ImportanceHight = "HIGH",
      ImportanceNormal = "NORMAL",
      ImportanceLow = "LOW";

const DirAuto = "auto",
      DirLtr = "ltr",
      DirRtl = "rtl";

const UrgencyHight = "high",
      UrgencyNormal = "normal",
      UrgencyLow = "low",
      UrgencyVeryLow = "very-low";

const SytleBigText = 1,
      SytleBigPicture = 2;

const TypeIntent = 1,
      TypeUrl = 2,
      TypeApp = 3,
      TypeRichResource = 4;

const Pattern = new RegExp("\\d+|\\d+[sS]|\\d+.\\d{1,9}|\\d+.\\d{1,9}[sS]");
const colorPattern = new RegExp("^#[0-9a-fA-F]{6}$");
const TTLINIT = "86400";

export function validateMessage(message: Message) {
    if (!message) {
        throw new Error("message must not be null!");
    }
    validateFieldTarget(message.token, message.topic, message.condition);
    if(message.webpush){
        validateWebPushConfig(message.webpush, message.notification);
    }
    return validateAndroidConfig(message.android, message.notification);
}

function validateFieldTarget(token: Array<string>, ...params: Array<string>) {
    let count = 0;
    if (token) {
        count++;
    }
    params &&
        params.forEach(pa => {
            if (validator.isNonEmptyString(pa)) {
                count++;
            }
        });
    if (count === 1) {
        return;
    }
    throw new Error("token, topic or condition must be choice one");
}

function validateWebPushConfig(webPushConfig: WebPushConfig, notification?: Notification){
    if (!validator.isNonEmptyString(webPushConfig.notification.title)&&!validator.isNonEmptyString(notification.title)) {
        throw new Error("title must not be empty");
    }
    if (!validator.isNonEmptyString(webPushConfig.notification.body)&&!validator.isNonEmptyString(notification.body)) {
        throw new Error("body must not be empty");
    }
    if (validator.isNonEmptyString(webPushConfig.notification.dir) &&
    (webPushConfig.notification.dir !== DirAuto &&
        webPushConfig.notification.dir !== DirLtr &&
        webPushConfig.notification.dir !== DirRtl)) {
            throw new Error("dir must be 'auto', 'ltr' or 'rtl'");
    }
    if (validator.isNonEmptyString(webPushConfig.headers.urgency) &&
    (webPushConfig.headers.urgency !== UrgencyHight &&
        webPushConfig.headers.urgency !== UrgencyNormal &&
        webPushConfig.headers.urgency !== UrgencyLow&&
        webPushConfig.headers.urgency !== UrgencyVeryLow)) {
            throw new Error("urgency must be 'HIGH', 'LOW' , 'low' or 'very-low'");
    }
}

function validateAndroidConfig(androidConfig: AndroidConfig, notification?: Notification) {
    if (!androidConfig) {
        return;
    }
    if (androidConfig.collapse_key < -1 || androidConfig.collapse_key > 100) {
        throw new Error("collapse_key must be in interval [-1 - 100]");
    }

    if (
        validator.isNonEmptyString(androidConfig.urgency) &&
        (androidConfig.urgency !== PriorityHight &&
            androidConfig.urgency !== PriorityNormal)
    ) {
        throw new Error("priority must be 'HIGH', 'NORMAL'");
    }

    if (!androidConfig.ttl) {
        androidConfig.ttl = TTLINIT;
    }
    if (validator.isNonEmptyString(androidConfig.ttl) && !Pattern.exec(androidConfig.ttl)) {
        throw new Error("Wrong input format");
    }

    if(!androidConfig.fast_app_target){
        androidConfig.fast_app_target = 2;
    }
    // validate android notification
    return validateAndroidNotification(androidConfig.notification, notification);
}

function validateAndroidNotification(androidNotification: AndroidNotification, notification?:Notification) {
    if (!notification) {
        return;
    }

    if (!validator.isNonEmptyString(androidNotification.title)&&!validator.isNonEmptyString(notification.title)) {
        throw new Error("title must not be empty");
    }

    if (!validator.isNonEmptyString(androidNotification.body)&&!validator.isNonEmptyString(notification.body)) {
        throw new Error("body must not be empty");
    }

    switch (androidNotification.style) {
        case SytleBigText:
            if (!validator.isNonEmptyString(androidNotification.big_title)) {
                throw new Error("big_title must not be empty when style is 1");
            }

            if (!validator.isNonEmptyString(androidNotification.big_body)) {
                throw new Error("big_body must not be empty when style is 1");
            }
            break;
        case SytleBigPicture:
            if (!validator.isNonEmptyString(androidNotification.big_picture)) {
                throw new Error("big_picture must not be empty when style is 2");
            }
    }

    if (androidNotification.color && !colorPattern.exec(androidNotification.color)) {
        throw new Error("color must be in the form #RRGGBB");
    }

    if(validator.isNonEmptyString(androidNotification.group)&&validator.isNonEmptyString(androidNotification.notify_id)) {
        throw new Error("notify_id must be empty when group exist");
    }

    if(validator.isNonEmptyString(androidNotification.importance)&&
    androidNotification.importance !== ImportanceHight &&
    androidNotification.importance !== ImportanceNormal &&
    androidNotification.importance !== ImportanceLow)
    {
        throw new Error("importance must be 'LOW', 'NORMAL' or 'HIGH'");
    }

    // validate click action
    validateClickAction(androidNotification.click_action);

    // validate light setting
    return(validateLightSetting(androidNotification.light_settings));
}

function validateClickAction(clickAction: ClickAction) {
    if (!clickAction) {
        throw new Error("click_action object must not be null");
    }

    switch (clickAction.type) {
        case TypeIntent:
            if (!validator.isNonEmptyString(clickAction.intent)&&!validator.isNonEmptyString(clickAction.action)) {
                throw new Error("intent and action have at least one when type is 1");
            }
            break;
        case TypeUrl:
            if (!validator.isNonEmptyString(clickAction.url)) {
                throw new Error("url must not be empty when type is 2");
            }
            break;
        case TypeApp:
            break;
        case TypeRichResource:
            if (!validator.isNonEmptyString(clickAction.rich_resource)) {
                throw new Error("rich_resource must not be empty when type is 4");
            }
            break;
        default:
            throw new Error("type must be in the interval [1 - 4]");
    }
}

function validateLightSetting(lightSettings: LightSettings) {
    if(!lightSettings) {
        return;
    }
    if(!lightSettings.color){
        throw new Error("color must not be empty");
    }
    if (validator.isNonEmptyString(lightSettings.light_off_duration) && !Pattern.exec(lightSettings.light_off_duration)) {
        throw new Error("Wrong input format");
    }
    if (validator.isNonEmptyString(lightSettings.light_on_duration) && !Pattern.exec(lightSettings.light_on_duration)) {
        throw new Error("Wrong input format");
    }
}
