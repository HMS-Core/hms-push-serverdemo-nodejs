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

let AndroidConfig = {
    collapse_key: -1,
    urgency: "HIGH",
    ttl: "10000s",
    bi_tag: "the_sample_bi_tag_for_receipt_service"
}
let message = {
    data: "test",
    android: AndroidConfig,
    token: config.AndroidTokenArray
            
};    
mc.send(message, false).then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});