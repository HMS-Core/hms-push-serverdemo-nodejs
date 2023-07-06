# 华为推送服务服务端Node.js示例代码
[English](README.md) | 中文

## 目录

 * [简介](#简介)
 * [安装](#安装)
 * [环境要求](#环境要求)
 * [配置](#配置)
 * [示例代码](#示例代码)
 * [技术支持](#技术支持)
 * [授权许可](#授权许可)

## 简介

Node.js示例代码对华为推送服务（HUAWEI Push Kit）服务端接口进行封装，供您参考使用。

示例代码目录结构如下：
| 包名 | 说明
| ---- | ----- 
| [examples](examples)|示例代码包
| [utils](src/utils)|公共网络请求和公共验证方法包
| [push](src/push)|接口封装包

## 安装

使用本示例代码前，请确保您的设备上已安装node.js开发环境。

在nodejs-sdk项目工程中进行如下操作：

```bash
$ npm install
```

运行示例程序：

```bash
$ npm run build
```

## 环境要求

Node.js 8.13.0及以上版本。

注意Node.js示例代码只能在您控制的服务端或后端中使用，包括大部分服务端和无服务端平台（本地和云端）。

## 配置

Node.js示例代码以index.ts文件为入口。创建一个HcmNamespace对象，调用其中的方法进行初始化操作，进入不同的方法模块，如消息或主题方法模块，再调用每个模块中的方法。

如需使用examples的各种功能，请在config.js中设置初始化的相关参数。


| 参数 | 说明 |
| ---- | ----- |
| AppId|应用ID，从应用消息中获取 |
| AppSecret|应用访问密钥，从应用信息中获取|
| AuthUrl|华为OAuth 2.0获取token的地址。详情请参见[基于OAuth 2.0开放鉴权-客户端模式](https://developer.huawei.com/consumer/cn/doc/development/HMSCore-Guides/oauth2-0000001212610981)。|
| PushUrl|推送服务的访问地址。详情请参见[推送服务-下行消息](https://developer.huawei.com/consumer/cn/doc/development/HMSCore-Guides/android-server-dev-0000001050040110?ha_source=hms1)。|


| 需求参数 | 说明 |
| ---- | ----- |
| TargetTopic|订阅、退订或查询的主题名称 |
| TargetCondition|消息的条件表达式组合|
| TargetToken|目标设备token |


## 示例代码

本示例代码使用index.ts作为入口。调用HcmNamespace对象中的messaging和topic方法。

HcmNamespace包括如下方法：
| 方法 | 说明 |
| ---- | ---- |
| messaging | Messaging对象的入口，用于验证初始化输入的参数 |
| topic | Topic对象的入口，用于验证初始化输入的参数 |
	
Messaging包括如下方法：
| 方法 | 说明 |
| ---- | ---- |
| send | 验证是否更新token并调用sendRequest方法 |
| sendRequest | 向设备发送消息 |

Topic包括如下方法：
| 方法 | 说明 |
| ---- | ---- |
| subScribeTopic | 订阅主题 |
| unSubScribeTopic | 退订主题 |
| queryTopicList | 查询主题列表 |

#### 1.	发送Android透传消息
代码位置: [examples/send_data_message.js](examples/send_data_message.js)

#### 2.	发送Android通知栏消息
代码位置: [examples/send_notify_message.js](examples/send_notify_message.js)

#### 3.	基于主题发送消息
代码位置: [examples/send_topic_message.js](examples/send_topic_message.js)
	
#### 4.	基于条件发送消息
代码位置: [examples/send_condition_message.js](examples/send_condition_message.js)

#### 5.	向华为快应用发送消息
代码位置: [examples/send_instance_app_message.js](examples/send_instance_app_message.js)

#### 6.	基于WebPush代理发送消息
代码位置: [examples/send_webpush_message.js](examples/send_webpush_message.js)

#### 7.	基于APNs代理发送消息
代码位置: [examples/send_apns_message.js](examples/send_apns_message.js)

#### 8.	发送测试消息
代码位置: [examples/send_test_message.js](examples/send_test_message.js)

## 技术支持
如果您对HMS Core还处于评估阶段，可在[Reddit社区](https://www.reddit.com/r/HuaweiDevelopers/)获取关于HMS Core的最新讯息，并与其他开发者交流见解。

如果您对使用HMS示例代码有疑问，请尝试：
- 开发过程遇到问题上[Stack Overflow](https://stackoverflow.com/questions/tagged/huawei-mobile-services?tab=Votes)，在`huawei-mobile-services`标签下提问，有华为研发专家在线一对一解决您的问题。
- 到[华为开发者论坛](https://developer.huawei.com/consumer/cn/forum/blockdisplay?fid=18?ha_source=hms1) HMS Core板块与其他开发者进行交流。

如果您在尝试示例代码中遇到问题，请向仓库提交[issue](https://github.com/HMS-Core/hms-push-serverdemo-nodejs/issues)，也欢迎您提交[Pull Request](https://github.com/HMS-Core/hms-push-serverdemo-nodejs/pulls)。

## 授权许可
华为推送服务Node.js示例代码经过[Apache License, version 2.0](http://www.apache.org/licenses/LICENSE-2.0)授权许可。
