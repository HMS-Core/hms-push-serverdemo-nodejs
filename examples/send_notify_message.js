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

let notification = {
    title: "sample title",
    body: "sample message body"
}
let androidNotification = {
    icon: '/raw/ic_launcher2',
    color: '#AACCDD',
    sound: '/raw/shake',
    default_sound: true,
    tag: 'tagBoom',
    click_action: {
        type: 2,
        url: "https://www.huawei.com"
    },
    body_loc_key: 'M.String.body',
    body_loc_args: ['boy', 'dog'],
    title_loc_key: 'M.String.title',
    title_loc_args: ["Girl", "Cat"],
    channel_id: 'Your Channel ID',
    notify_summary: 'some summary',
    multi_lang_key: {        
        title_key: {            
            en: "添加好友请求",            
            zh: "添加好友请求",            
            ru: "添加好友请求"        
        },        
        body_key: {            
            en: "My name is %s, I am from %s.",            
            zh: "我叫%s，来自%s。",            
            ru: "我叫%s，来自%s。"        
        }
    },
    style: 1,
    big_title: 'test notify lkq',
    big_body: 'Big Boom Body',
    auto_clear: 86400000,
    notify_id: 486,
    group: 'Group1',
    auto_cancel: true,
    importance: "HIGH",
    light_settings: {
        color: {
            alpha:0, red:0, green:1, blue:1
        }, 
        light_on_duration: "3.5", 
        light_off_duration: "5S"
    },
    badge:{
        add_num: 1, clazz: 'Classic'
    },
    visibility: 'PUBLIC',
    foreground_show:true
}
let androidConfig = {
    collapse_key: -1,
    urgency:"HIGH",
    ttl: "10000s",
    bi_tag: "the_sample_bi_tag_for_receipt_service",
    notification: androidNotification
}
let message = {
    notification: notification,
    android: androidConfig,
    token: config.AndroidTokenArray
            
};    

mc.send(message, false).then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});