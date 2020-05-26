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
    appId: config.FastAppId,
    appSecret: config.FastAppSecret,
    authUrl: config.AuthUrlOn,
    pushUrl: config.PushUrlOn
});

let mc = hcm.messaging().messaging;

let androidConfig = {
    collapse_key: -1,
    urgency:"HIGH",
    ttl: "10000s",
    bi_tag: "the_sample_bi_tag_for_receipt_service",
    fast_app_target: 1
}  

let message = {
    data: "{\"pushtype\":0,\"pushbody\":{\"title\":\"This is a test message of fastApp\",\"description\":\"Happy new year!\",\"page\":\"/\",\"params\":{\"key1\":\"test1\",\"key2\":\"test2\"},\"ringtone\":{\"vibration\":\"true\",\"breathLight\":\"true\"}}}",
	android: androidConfig,
	token: config.FastTokenArray
};
mc.send(message, false).then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});