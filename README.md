# HMS Pushkit Node.js Severdemo

## Table of Contents

 * [Introduction](#introduction)
 * [Installation](#installation)
 * [Configuration ](#configuration )
 * [Supported Environments](#supported-environments)
 * [Sample Code](#sample-code)
 * [License](#license)
 
## Introduction

Node.js sample code encapsulates APIs of the HUAWEI Push Kit server. It provides many sample programs for your reference or usage.

The following table describes packages of Node.js sample code.


| Package | Description
| ---- | ----- 
| examples|Sample code packages. Each package can run independently to call an API. 
| utils|Tool package, which contains common network requests and common verification methods. 
| push|Package where APIs of the HUAWEI Push Kit server are encapsulated. 

## Installation

Before using Node.js sample code, ensure that the node environment has been installed.

In the nodejs-sdk project directory:

```bash
$ npm install
```

Run the sample project:

```bash
$ npm run build
```

## Supported Environments

We support Node.js 8.13.0 and higher.

Please also note that the Sample Code should only be used in server-side/back-end environments controlled by the app developer.
This includes most server and serverless platforms (both on-premise and in the cloud). It is not recommended to use the Sample Code in client-side environments.

## Configuration 

Node.js sample code uses the index.ts file as the entry, creates a HcmNamespace object, calls a method in the object for initialization, enters a method module such as the message or topic method module, and then calls an API of the HUAWEI Push Kit server using a method in the module.

Before using functions provided by packages in examples, you need to set parameters for initialization in config.js.


	
| Initialization Parameter | Description |
| ---- | ----- |
| AppId|App ID, which is obtained from app information. |
| AppSecret|Secret access key of an app, which is obtained from app information. |
| AuthUrl|URL for the Huawei OAuth 2.0 service to obtain a token, please refer to Generating an App-Level Access Token. |
| PushUrl|URL for accessing HUAWEI Push Kit, please refer to Sending Messages. |


| Request Parameter | Description |
| ---- | ----- |
| TargetTopic|Name of a topic to be subscribed to, unsubscribed from, or queried. |
| TargetCondition|Combination of condition expressions for a message. |
| TargetToken|Token of a destination device. |
| TargetTokenArray|Tokens of destination devices. |


## Sample Code
Download node.js sample code in Downloading Server Sample Code.
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

### 1 Send an Android data message.
Code location: examples/send_data_message.js

### 2 Send an Android notification message.
Code location: examples/send_notify_message.js

### 3 Send a message by topic.
Code location: examples/send_topic_message.js
	
### 4 Send a message by conditions.
Code location: examples/send_condition_message.js

### 5 Send a message to a Huawei quick app.
Code location: examples/send_instance_app_message.js

### 6 Send a message through the WebPush agent.
Code location: examples/send_webpush_message.js

### 7 Send a message through the APNs agent.
Code location: examples/send_apns_message.js

### 8 Send a test message.
Code location: examples/send_test_message.js

## Question or issues
If you have questions about how to use HMS samples, try the following options:
- [Stack Overflow](https://stackoverflow.com/questions/tagged/huawei-mobile-services) is the best place for any programming questions. Be sure to tag your question with 
**huawei-mobile-services**.
- [Huawei Developer Forum](https://forums.developer.huawei.com/forumPortal/en/home?fid=0101187876626530001) HMS Core Module is great for general questions, or seeking recommendations and opinions.

If you run into a bug in our samples, please submit an [issue](https://github.com/HMS-Core/hms-push-serverdemo-nodejs/issues) to the Repository. Even better you can submit a [Pull Request](https://github.com/HMS-Core/hms-push-serverdemo-nodejs/pulls) with a fix.

## License
Pushkit Node.js sample is licensed under the [Apache License, version 2.0](http://www.apache.org/licenses/LICENSE-2.0).
