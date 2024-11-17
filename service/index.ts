import {
    BaseResponse,
    BUY,
    ErrorTypeEnum,
    HistoricalBuyData,
    HistoricalResponse,
    HistoricalSellData,
    LoginData,
    LoginResponse,
    RegisterData,
    RegisterResponse,
    SELL,
    ThreeMonthBuyData,
    ThreeMonthResponse,
    ThreeMonthSellData,
    WebsocketUrlResponse,
} from "@/types";
import { message } from "antd";
import axios, { AxiosResponse } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { SERVER_HOST } from "@/utils/axios";
import { UserContextHandler } from "@/utils/store";
import type { MessageInstance } from "antd/es/message/interface";

export const apiHandler = async function (
    req: NextApiRequest,
    res: NextApiResponse,
    url: string
): Promise<void> {
    const { method, body, headers } = req;
    try {
        const response = await axios({
            method: method,
            url: SERVER_HOST + url,
            headers: headers,
            responseType: "json",
            data: body,
            withCredentials: true,
            timeout: 15000,
        });
        const cookies = response.headers["set-cookie"] as string[];
        res.setHeader("Set-Cookie", cookies);
        res.status(response.status).json(response.data);
    } catch (error: any) {
        message.error(error);
    }
};

export const request = function (
    url: string,
    data: any
): Promise<AxiosResponse> {
    return axios.post(url, data, {
        timeout: 0,
        responseType: "json",
    });
};
function capitalizeFirstLetter(str: string) {
    if (!str) return str; // 确保字符串非空
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const getThreeMonthData = async function (
    symbol: string,
    metric: string,
    messageApi?: MessageInstance
): Promise<ThreeMonthBuyData | ThreeMonthSellData | ErrorTypeEnum> {
    let data;
    const response = await request(
        "/api/getThreeMonth" + capitalizeFirstLetter(metric) + "Data",
        {
            symbol: symbol,
        }
    );
    const responseData = response.data as ThreeMonthResponse;
    if (response.status === 200) {
        if (responseData.code === 200) {
            if (metric === BUY) {
                data = responseData.data as ThreeMonthBuyData;
            } else if (metric === SELL) {
                data = responseData.data as ThreeMonthSellData;
            }
        } else if (responseData.code === 401) {
            data = ErrorTypeEnum.NO_PERMISSION;
        }
    }
    return data || ErrorTypeEnum.NULL;
};
export const getHistoricalData = async function (
    symbol: string,
    metric: string,
    messageApi?: MessageInstance
): Promise<HistoricalBuyData | HistoricalSellData | ErrorTypeEnum> {
    let data;
    const response = await request(
        "/api/getHistorical" + capitalizeFirstLetter(metric) + "Data",
        {
            symbol: symbol,
        }
    );
    const responseData = response.data as HistoricalResponse;
    if (response.status === 200) {
        if (responseData.code === 200) {
            if (metric === BUY) {
                data = responseData.data as HistoricalBuyData;
            } else if (metric === SELL) {
                data = responseData.data as HistoricalSellData;
            }
        } else if (responseData.code === 401) {
            data = ErrorTypeEnum.NO_PERMISSION;
        }
    }
    return data || ErrorTypeEnum.NULL;
};
export const getRealtimeDataUrl = async function (
    metric: string,
    symbol: string,
    messageApi?: MessageInstance
): Promise<string | null> {
    let url = null;
    const response = await request("/api/getRealtimeDataUrl", {
        metric: metric,
        symbol: symbol,
        version: "v2",
    });
    const responseData = response.data as WebsocketUrlResponse;
    if (response.status === 200) {
        if (responseData.code === 200) {
            url = responseData.data.websocket_url;
        } else if (responseData.message_level === "user") {
            messageApi &&
                messageApi
                    .open({
                        type: "error",
                        content: responseData.message,
                        duration: 3,
                    })
                    .then((r) => r);
        }
    }
    return url;
};
export const getVerificationCode = async function (
    email: string,
    messageApi: MessageInstance
): Promise<boolean> {
    let isCodeSent = false;
    const response = await request("/api/getVerificationCode", {
        email: email,
    });
    const responseData = response.data as BaseResponse;
    if (response.status === 200) {
        if (responseData.code === 200) {
            isCodeSent = true;
        } else if (responseData.message_level === "user") {
            messageApi &&
                messageApi
                    .open({
                        type: "error",
                        content: responseData.message,
                        duration: 3,
                    })
                    .then((r) => r);
        }
    }
    return isCodeSent;
};

export interface RegisterInfo {
    username: string;
    password: string;
    email: string;
    verification_code: string;
}

export const invokeRegister = async function (
    registerInfo: RegisterInfo,
    messageApi?: MessageInstance
): Promise<RegisterData | null> {
    let data = null;
    const response = await request("/api/invokeRegister", { ...registerInfo });
    const responseData = response.data as RegisterResponse;
    if (response.status === 200) {
        if (responseData.code === 200) {
            data = responseData.data as RegisterData;
        } else if (responseData.message_level === "user") {
            console.log(responseData.message);
            console.log(messageApi);
            messageApi &&
                messageApi
                    .open({
                        type: "error",
                        content: responseData.message,
                        duration: 3,
                    })
                    .then((r) => r);
        }
    }
    return data;
};

export interface LoginInfo {
    password: string;
    email: string;
}

export const invokeLogin = async function (
    loginInfo: LoginInfo,
    loginHandler: UserContextHandler,
    messageApi?: MessageInstance
): Promise<LoginData | null> {
    let data = null;
    const response = await request("/api/invokeLogin", { ...loginInfo });
    const responseData = response.data as LoginResponse;
    if (response.status === 200) {
        if (responseData.code === 200) {
            data = responseData.data as LoginData;
            loginHandler({
                email: loginInfo.email,
                username: data.user || "",
                role: data.role || "",
            });
        } else if (responseData.message_level === "user") {
            console.log(responseData.message);
            console.log(messageApi);
            messageApi &&
                messageApi
                    .open({
                        type: "error",
                        content: responseData.message,
                        duration: 3,
                    })
                    .then((r) => r);
        }
    }
    return data;
};

export const invokeLogout = async function (
    email: string,
    logoutHandler: VoidFunction,
    messageApi?: MessageInstance
): Promise<boolean> {
    let data = false;
    const response = await request("/api/invokeLogout", { email: email });
    const responseData = response.data as BaseResponse;
    if (response.status === 200) {
        if (responseData.code === 200) {
            data = true;
            logoutHandler();
        } else if (responseData.message_level === "user") {
            messageApi &&
                messageApi
                    .open({
                        type: "error",
                        content: responseData.message,
                        duration: 3,
                    })
                    .then((r) => r);
        }
    }
    return data;
};
