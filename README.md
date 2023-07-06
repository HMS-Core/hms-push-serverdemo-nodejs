# HMS Core Push Kit Sample Code (Node.js)
English | [中文](README_ZH.md)
## Contents

 * [Introduction](#Introduction)
 * [Installation](#Installation)
 * [Environment Requirements](#Environment-Requirements)
 * [Configuration](#Configuration)
 * [Sample Code](#Sample-Code)
 * [Technical Support](#technical-support)
 * [License](#License)

## Introduction

The sample code for Node.js encapsulates the server-side APIs of Push Kit, for your reference or direct use.

The following table describes packages of Node.js sample code.
| Package| Description
| ---- | ----- 
| [examples](examples) | Sample code packages.
| [utils](src/utils) | Package that provides methods for sending public network requests and for common verification.
| [push](src/push) | Package where Push Kit server APIs are encapsulated.

## Installation

Install Node.js on your device.

Run the following command in the **nodejs-sdk** project:

```bash
$ npm install
```

Run the following command:

```bash
$ npm run build
```

## Environment Requirements

Node.js 8.13.0 or later.

Note that the Node.js sample code can be used only in the server-side or background environments that you control, including most servers and serverless platforms (both on-premise and in the cloud).

## Configuration

Start configuration with the **index.ts** file. Create an **HcmNamespace** object, and call the methods in the object to perform initialization. Access different modules, such as the messaging or topic module, and call the methods in each module.

To use the functions provided by the packages in **examples**, set initialization and request parameters in the **config.js** file.


| Parameter| Description|
| ---- | ----- |
| AppId|App ID, which is obtained from the app information.|
| AppSecret|App secret, which is obtained from the app information.|
| AuthUrl|URL for Huawei OAuth 2.0 to obtain a token. For details, please refer to [OAuth 2.0-based Authentication](https://developer.huawei.com/consumer/en/doc/development/HMSCore-Guides/oauth2-0000001212610981).|
| PushUrl|Access address of Push Kit. For details, please refer to [Downlink Message Sending](https://developer.huawei.com/consumer/en/doc/development/HMSCore-Guides/android-server-dev-0000001050040110?ha_source=hms1).|


| Request Parameter| Description|
| ---- | ----- |
| TargetTopic|Name of the topic to be subscribed to, unsubscribed from, or queried.|
| TargetCondition|Combined condition expression for sending a message.|
| TargetToken|Token of a target device.|


## Sample Code

node.js sample code uses index.ts as the entry. Call methods on object HcmNamespace: messaging and topic.

The following table lists methods in HcmNamespace.
| Method | Description |
| ---- | ---- |
| messaging | The entry of the Messaging object, and verify the initialization input parameters. |
| topic | The entry of the Topic object, and verify the initialization input parameters. |
	
The following table lists methods in Messaging.
| Method | Description |
| ---- | ---- |
| send | Verify if the token needs to be updated and call the method sendRequest. |
| sendRequest | Sends a message to a device. |

The following table lists methods in Topic.
| Method | Description |
| ---- | ---- |
| subScribeTopic | Subscribe to topic. |
| unSubScribeTopic | Unsubscribe topic. |
| queryTopicList | Query subject list. |

#### 1. Send an Android data message.
Code location: [examples/send_data_message.js](examples/send_data_message.js)

#### 2. Send an Android notification message.
Code location: [examples/send_notify_message.js](examples/send_notify_message.js)

#### 3. Send a message by topic.
Code location: [examples/send_topic_message.js](examples/send_topic_message.js)
	
#### 4. Send a message by conditions.
Code location: [examples/send_condition_message.js](examples/send_condition_message.js)

#### 5. Send a message to a Huawei quick app.
Code location: [examples/send_instance_app_message.js](examples/send_instance_app_message.js)

#### 6. Send a message through the WebPush agent.
Code location: [examples/send_webpush_message.js](examples/send_webpush_message.js)

#### 7. Send a message through the APNs agent.
Code location: [examples/send_apns_message.js](examples/send_apns_message.js)

#### 8. Send a test message.
Code location: [examples/send_test_message.js](examples/send_test_message.js)

## Technical Support
You can visit the [Reddit community](https://www.reddit.com/r/HuaweiDevelopers/) to obtain the latest information about HMS Core and communicate with other developers.

If you have any questions about the sample code, try the following:
- Visit [Stack Overflow](https://stackoverflow.com/questions/tagged/huawei-mobile-services?tab=Votes), submit your questions, and tag them with `huawei-mobile-services`. Huawei experts will answer your questions.
- Visit the HMS Core section in the [HUAWEI Developer Forum](https://forums.developer.huawei.com/forumPortal/en/home?fid=0101187876626530001?ha_source=hms1) and communicate with other developers.

If you encounter any issues when using the sample code, submit your [issues](https://github.com/HMS-Core/hms-push-serverdemo-nodejs/issues) or submit a [pull request](https://github.com/HMS-Core/hms-push-serverdemo-nodejs/pulls).

## License
The sample code is licensed under [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0).
