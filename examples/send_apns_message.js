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

const hcm = require("../dist/index").default;
const config = require("./common/config");

hcm.init({
    appId: config.AppId,
    appSecret: config.AppSecret,
    authUrl: config.AuthUrl,
    pushUrl: config.PushUrl
});

let mc = hcm.messaging().messaging;

let headers = {HEAD_APNs_ID: "21349-141324"}
let apns_alert = {
    title:"apnstest",
    body:"body",
    launch_image:"image",
    custom_data:{"key1": "value1", "key2": "value2"}
}
let apns_payload_aps = {
    alert:apns_alert,
    badge:1,
    sound:"wtewt.mp4",
    content_available:true,
    category:"category",
    thread_id:"id"
}
let payload = {
    aps:apns_payload_aps,
    acme_account:"jane.appleseed@apple.com",
    acme_message:"message123456"
}
let apns_hms_options = {
    target_user_type:1
}
let apns_push_config = {
    headers:headers,
    payload:payload,
    hms_options:apns_hms_options
}
let message = {
    apns:apns_push_config,
    token: config.APNSTokenArray
};    
mc.send(message, false).then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});
