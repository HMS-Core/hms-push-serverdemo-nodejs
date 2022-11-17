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
let headers = {
    ttl:"990",
    urgency:"low",
    topic:"12313"
}
let notification = {
    title:"notication string",
    body: "web push body",
    actions:[
        {
            action: "123",
            icon: "https://res.vmallres.com/pimages//common/config/logo/SXppnESYv4K11DBxDFc2.png",
            title: "string"
        }
    ],
    badge: "string",
    dir: "auto",
    icon: "https://res.vmallres.com/pimages//common/config/logo/SXppnESYv4K11DBxDFc2.png",
    image: "string",
    lang: "string",
    renotify: true,
    require_interaction: true,
    silent: true,
    tag: "string",
    timestamp:1545201266,
    vibrate:[1,2,3]
}
let WebPushConfig = {
    headers:headers,
    notification: notification,
    hms_options:{
        link:"https://www.huawei.com/"
    }
}
let message = {
    webpush: WebPushConfig,
    token: config.WebPushTokenArray
}

mc.send(message, false).then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});
