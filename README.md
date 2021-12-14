# HMS Core Push Kit Sample Code (Node.js)
English | [中文](README_ZH.md)
## Contents

 * [Introduction](#Introduction)
 * [Installation](#Installation)
 * [Environment Requirements](#Environment-Requirements)
 * [Configuration](#Configuration)
 * [Sample Code](#Sample-Code)
 * [License](#License)

## Introduction

The sample code for Node.js encapsulates the server-side APIs of Push Kit, for your reference or direct use.

The following table describes packages of Node.js sample code.
| Package| Description
| ---- | ----- 
| examples|Sample code packages.
| utils|Package that provides methods for sending public network requests and for common verification.
| push|Package where Push Kit server APIs are encapsulated.

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
| AuthUrl|URL for Huawei OAuth 2.0 to obtain a token. For details, please refer to [OAuth 2.0-based Authentication](https://developer.huawei.com/consumer/en/doc/development/HMSCore-Guides/oauth2-0000001212610981?ha_source=hms1).|
| PushUrl|Access address of Push Kit. For details, please refer to [Downlink Message Sending](https://developer.huawei.com/consumer/en/doc/development/HMSCore-Guides/android-server-dev-0000001050040110?ha_source=hms1).|


| Request Parameter| Description|
| ---- | ----- |
| TargetTopic|Name of the topic to be subscribed to, unsubscribed from, or queried.|
| TargetCondition|Combined condition expression for sending a message.|
| TargetToken|Token of a target device.|
| TargetTokenArray|Tokens of all target devices.|


## Sample Code

The **HcmNamespace** object includes the following methods.
| Method| Description|
| ---- | ---- |
| messaging| Verifies the input parameters for initialization.|
| topic | Verifies the input parameters for initialization.|

The **Messaging** object provides the following methods.
| Method| Description|
| ---- | ---- |
| send | Checks whether the token is updated and calls the **sendRequest** method.|
| sendRequest | Sends a message to a device.|

The **Topic** object contains the following methods.
| Method| Description|
| ---- | ---- |
| subScribeTopic | Subscribes to a topic.|
| unSubScribeTopic | Unsubscribes from a topic.|
| queryTopicList | Queries a topic list.|

1. Send a data message to an Android app.
File path: **examples/send_data_message.js**

	.	Send a notification message to an Android app.
File path: **examples/send_notify_message.js**

	.	Send a message by topic.
File path: **examples/send_topic_message.js**
	
	.	Send a message by condition.
File path: **examples/send_condition_message.js**

	.	Send a message to a Huawei quick app.
File path: **examples/send_instance_app_message.js**

	.	Send a message by WebPush.
File path: **examples/send_webpush_message.js**

	.	Send a message by APNs.
File path: **examples/send_apns_message.js**

	.	Send a test message.
File path: **examples/send_test_message.js**

## Technical Support
You can visit the [Reddit community](https://www.reddit.com/r/HuaweiDevelopers/) to obtain the latest information about HMS Core and communicate with other developers.

If you have any questions about the sample code, try the following:
- Visit [Stack Overflow](https://stackoverflow.com/questions/tagged/huawei-mobile-services?tab=Votes), submit your questions, and tag them with `huawei-mobile-services`. Huawei experts will answer your questions.
- Visit the HMS Core section in the [HUAWEI Developer Forum](https://forums.developer.huawei.com/forumPortal/en/home?fid=0101187876626530001?ha_source=hms1) and communicate with other developers.

If you encounter any issues when using the sample code, submit your [issues](https://github.com/HMS-Core/hms-push-serverdemo-nodejs/issues) or submit a [pull request](https://github.com/HMS-Core/hms-push-serverdemo-nodejs/pulls).

## License
The sample code is licensed under [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0).
