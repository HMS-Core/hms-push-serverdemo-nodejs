/*!
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 * 2020.1.15-Changed Refer to send request method (send) and retry send 
 * request method (sendWithRetry)
 *                                          Huawei Technologies Co., Ltd.
 */

import rp from "request-promise";
import * as validator from "./validator";
async function send(options: HttpRequestConfig): Promise<HttpResponse> {
    options.resolveWithFullResponse = true;
    return rp(options)
        .then(result => {
            return Promise.resolve(createHttpResponse(result));
        })
        .catch(err => {
            return Promise.reject(err);
        });
}

/**
 * Specifies how failing HTTP requests should be retried.
 */
export interface RetryConfig {
    /** Maximum number of times to retry a given request. */
    maxRetries: number;

    /** HTTP status codes that should be retried. */
    statusCodes?: number[];

    /** Low-level I/O error codes that should be retried. */
    ioErrorCodes?: string[];

    /**
     * The multiplier for exponential back off. When the backOffFactor is setto 0, retries are not delayed. 
     * When the backOffFactor is 1, retry duration is doubled each iteration.
     */
    backOffFactor?: number;

    /** Maximum duration to wait before initiating a retry. */
    maxDelayInMillis: number;
}

/**
 * Default retry configuration for HTTP requests. Retries up to 4 times on connection reset and timeout errors
 * as well as HTTP 503 errors. Exposed as a function to ensure that every HttpClient gets its own RetryConfig
 * instance.
 */
export function defaultRetryConfig(): RetryConfig {
    return {
        maxRetries: 4,
        statusCodes: [503],
        ioErrorCodes: ["ECONNRESET", "ETIMEDOUT"],
        backOffFactor: 0.5,
        maxDelayInMillis: 60 * 1000
    };
}

/**
 * Ensures that the given RetryConfig object is valid.
 *
 * @param retry The configuration to be validated.
 */
function validateRetryConfig(retry: RetryConfig) {
    if (!validator.isNumber(retry.maxRetries) || retry.maxRetries < 0) {
        throw new Error("maxRetries must be a non-negative integer");
    }

    if (typeof retry.backOffFactor !== "undefined") {
        if (!validator.isNumber(retry.backOffFactor) || retry.backOffFactor < 0) {
            throw new Error("backOffFactor must be a non-negative number");
        }
    }

    if (!validator.isNumber(retry.maxDelayInMillis) || retry.maxDelayInMillis < 0) {
        throw new Error("maxDelayInMillis must be a non-negative integer");
    }

    if (typeof retry.statusCodes !== "undefined" && !Array.isArray(retry.statusCodes)) {
        throw new Error("statusCodes must be an array");
    }

    if (typeof retry.ioErrorCodes !== "undefined" && !Array.isArray(retry.ioErrorCodes)) {
        throw new Error("ioErrorCodes must be an array");
    }
}
/**
 * Represents an HTTP response received from a remote server.
 */
export interface HttpResponse {
    readonly status: number;
    readonly headers: any;
    /** Response data as a raw string. */
    readonly text: string;
    /** Response data as a parsed JSON object. */
    readonly data: any;
    /** For multipart responses, the payloads of individual parts. */
    readonly multipart?: Buffer[];
    /**
     * Indicates if the response content is JSON-formatted or not. If true, data field can be used
     * to retrieve the content as a parsed JSON object.
     */
    isJson(): boolean;
}

interface LowLevelResponse {
    statusCode: number;
    headers: any;
    body: string;
    request: any;
}

class DefaultHttpResponse implements HttpResponse {
    public readonly status: number;
    public readonly headers: any;
    public readonly text: string;
    private readonly request: string;
    private readonly parsedData: any;
    private readonly parseError: Error;

    /**
     * Constructs a new HttpResponse from the given LowLevelResponse.
     */
    constructor(resp: LowLevelResponse) {
        this.status = resp.statusCode;
        this.headers = resp.headers;
        let body = resp.body || "";
        this.text = validator.isString(body) ? body : JSON.stringify(body);

        try {
            this.parsedData = validator.isString(body) ? JSON.parse(body) : body;
        } catch (err) {
            this.parsedData = undefined;
            this.parseError = err;
        }
        this.request = resp.request;
    }

    get data(): any {
        if (this.isJson()) {
            return this.parsedData;
        }
        throw new Error(
            `Error while parsing response data: "${this.parseError.toString()}". Raw server ` +
                `response: "${this.text}". Status code: "${this.status}". Outgoing ` +
                `request: "${this.request}."`
        );
    }

    public isJson(): boolean {
        return !!this.parsedData;
    }
}
function createHttpResponse(resp: LowLevelResponse): HttpResponse {
    if (!resp) {
        return;
    }
    return new DefaultHttpResponse(resp);
}

export class HttpClient {
    constructor(private readonly retry: RetryConfig = defaultRetryConfig()) {
        if (this.retry) {
            validateRetryConfig(this.retry);
        }
    }

    /**
     * Sends an HTTP request to a remote server. 
     *
     * @param {HttpRequest} config HTTP request to be sent.
     * @return {Promise<HttpResponse>} A promise that resolves with the response details.
     */
    public async send(config: HttpRequestConfig): Promise<HttpResponse> {
        return send(config)
            .then(resp => {
                return resp;
            })
            .catch(err => {
                if (err.response) {
                    throw new Error(JSON.stringify(createHttpResponse(err.response)));
                }
                if (err.error.code === "ETIMEDOUT") {
                    throw new Error(`Error while making request: ${err.message}.`);
                }
                throw new Error(`Error while making request: ${err.message}. Error code: ${err.error.code}`);
            });
    }

    /**
     * Meet the conditions, repeat the request. 
     *
     * @param {HttpRequest} config HTTP request to be sent.
     * @return {Promise<HttpResponse>} A promise that resolves with the response details.
     */
    public async sendWithRetry(config: HttpRequestConfig, retryAttempts: number = 0): Promise<HttpResponse> {
        return send(config)
            .then(resp => {
                return resp;
            })
            .catch(err => {
                const [delayMillis, canRetry] = this.getRetryDelayMillis(retryAttempts, err);
                if (canRetry && delayMillis <= this.retry.maxDelayInMillis) {
                    return this.waitForRetry(delayMillis).then(() => {
                        return this.sendWithRetry(config, retryAttempts + 1);
                    });
                }
                if (err.response) {
                    throw new Error(JSON.stringify(createHttpResponse(err.response)));
                }
                if (err.error.code === "ETIMEDOUT") {
                    throw new Error(`Error while making request: ${err.message}.`);
                }
                throw new Error(`Error while making request: ${err.message}. Error code: ${err.error.code}`);
            });
    }

    private async waitForRetry(delayMillis: number): Promise<any> {
        if (delayMillis > 0) {
            return new Promise(resolve => {
                setTimeout(resolve, delayMillis);
            });
        }
        return Promise.resolve();
    }

    /**
     * Parses the Retry-After HTTP header as a milliseconds value. Return value is negative if the Retry-After header
     * contains an expired timestamp or otherwise malformed.
     */
    private parseRetryAfterIntoMillis(retryAfter: string): number {
        const delaySeconds: number = parseInt(retryAfter, 10);
        if (!isNaN(delaySeconds)) {
            return delaySeconds * 1000;
        }

        const date = new Date(retryAfter);
        if (!isNaN(date.getTime())) {
            return date.getTime() - Date.now();
        }
        return -1;
    }

    private backOffDelayMillis(retryAttempts: number): number {
        if (retryAttempts === 0) {
            return 0;
        }

        const backOffFactor = this.retry.backOffFactor || 0;
        const delayInSeconds = 2 ** retryAttempts * backOffFactor;
        return Math.min(delayInSeconds * 1000, this.retry.maxDelayInMillis);
    }

    /**
     * Checks if a failed request is eligible for a retry, and if so returns the duration to wait before initiating
     * the retry.
     *
     * @param {number} retryAttempts Number of retries completed up to now.
     * @param {LowLevelError} err The last encountered error.
     * @returns {[number, boolean]} A 2-tuple where the 1st element is the duration to wait before another retry, and the
     *     2nd element is a boolean indicating whether the request is eligible for a retry or not.
     */
    private getRetryDelayMillis(retryAttempts: number, err: any): [number, boolean] {
        if (!this.isRetryEligible(retryAttempts, err)) {
            return [0, false];
        }
        let response = err.response;
        let headers = response ? response.headers : undefined;
        if (headers && headers["retry-after"]) {
            const delayMillis = this.parseRetryAfterIntoMillis(headers["retry-after"]);
            if (delayMillis > 0) {
                return [delayMillis, true];
            }
        }

        return [this.backOffDelayMillis(retryAttempts), true];
    }

    private isRetryEligible(retryAttempts: number, err: any): boolean {
        if (!this.retry) {
            return false;
        }

        if (retryAttempts >= this.retry.maxRetries) {
            return false;
        }
        if (err.response) {
            const statusCodes = this.retry.statusCodes || [];
            return statusCodes.indexOf(err.response.status) !== -1;
        }

        const retryCodes = this.retry.ioErrorCodes || [];
        return retryCodes.indexOf(err.error.code) !== -1;
    }
}

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD";
export interface HttpRequestConfig {
    method: HttpMethod;
    /** Target URL of the request. Should be a well-formed URL including protocol, hostname, port and path. */
    uri: string;
    headers?: { [key: string]: string };
    body?: string | object | Buffer;
    /** Connect and read timeout (in milliseconds) for the outgoing request. */
    timeout?: number;
    json?: boolean;
    form?: object;
    resolveWithFullResponse?: boolean;
}

export const ENDPOINT = "https://pushtrslftest.hwcloudtest.cn:28446/v1";
export const TOKENTIMEOUTERR = "80200003";
export const TOKENFAILEDERR  = "80200001";
