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

//AppId of application, obtained from application information
exports.AppId = "your appid";
//The application's secretkey, obtained from the application information
exports.AppSecret = "your AppSecret";
//Obtain the token interface address from Huawei oauth2.0 service from the application information
exports.AuthUrl = "https://oauth-login.cloud.huawei.com/oauth2/v3/token";
//Huawei push service access address
exports.PushUrl = "https://push-api.cloud.huawei.com/v1";

//TargetToken the topic to be subscribed/unsubscribed
exports.TargetTopic = "targetTopic";
//TargetCondition the condition of the devices operated
exports.TargetCondition = "'targetTopic\' in topics";
//TargetToken the token of the device operated
exports.TargetToken = 'pushtoken';
//WebPushTokenArra the collection of the tokens of th devices operated
exports.WebPushTokenArray = new Array('pushtoken1','pushtoken2');
//APNSTokenArray the collection of the tokens of th devices operated
exports.APNSTokenArray = new Array('pushtoken1','pushtoken2');
//AndroidTokenArray the collection of the tokens of th devices operated
exports.AndroidTokenArray = new Array('pushtoken1','pushtoken2');
//FastTokenArray the collection of the tokens of th devices operated
exports.FastTokenArray = new Array('pushtoken1','pushtoken2');
