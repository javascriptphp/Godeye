import {
    BUY,
    ErrorTypeEnum,
    HistoricalBuyData,
    HistoricalSellData,
    LoginData,
    RegisterData,
    ThreeMonthBuyData,
    ThreeMonthSellData,
} from "@/types";
import axios, { AxiosResponse } from "axios";
import { UserContextHandler } from "@/utils/store";
import type { MessageInstance } from "antd/es/message/interface";

async function fetchApi<T>(
    endpoint: string,
    requestData: any,
    responseMapper: (response: any) => T,
    messageApi?: MessageInstance,
    method: "POST" | "GET" = "POST"
): Promise<T | ErrorTypeEnum> {
    try {
        let response: AxiosResponse;

        if (method === "POST") {
            response = await axios.post(endpoint, requestData);
        } else {
            response = await axios.get(endpoint, { params: requestData });
        }

        if (response.status === 200) {
            const responseData = response.data;
            if (Number(responseData.code) === 200) {
                return responseMapper(responseData.data);
            } else if (Number(responseData.code) === 401) {
                return ErrorTypeEnum.NO_PERMISSION;
            } else if (responseData.message_level === "user") {
                messageApi &&
                    messageApi.open({
                        type: "error",
                        content: responseData.message,
                        duration: 3,
                    });
            }
        }

        return ErrorTypeEnum.NULL;
    } catch (error: any) {
        messageApi?.error(error.message || "Request failed");
        return ErrorTypeEnum.NULL;
    }
}

const capitalizeFirstLetter = (str: string): string => {
    return str ? str[0].toUpperCase() + str.slice(1) : str;
};

export const getThreeMonthData = async (
    symbol: string,
    metric: string,
    messageApi?: MessageInstance
): Promise<ThreeMonthBuyData | ThreeMonthSellData | ErrorTypeEnum> => {
    return fetchApi(
        `/api/getThreeMonth${capitalizeFirstLetter(metric)}Data`,
        { symbol },
        (data) =>
            metric === BUY
                ? (data as ThreeMonthBuyData)
                : (data as ThreeMonthSellData),
        messageApi
    );
};

export const getHistoricalData = async (
    symbol: string,
    metric: string,
    messageApi?: MessageInstance
): Promise<HistoricalBuyData | HistoricalSellData | ErrorTypeEnum> => {
    return fetchApi(
        `/api/getHistorical${capitalizeFirstLetter(metric)}Data`,
        { symbol },
        (data) =>
            metric === BUY
                ? (data as HistoricalBuyData)
                : (data as HistoricalSellData),
        messageApi
    );
};

export const getRealtimeDataUrl = async (
    metric: string,
    symbol: string,
    version?: string,
    messageApi?: MessageInstance
): Promise<string | null> => {
    return fetchApi(
        "/api/getRealtimeDataUrl",
        { metric, symbol, version },
        (data) => data.websocket_url,
        messageApi
    );
};

export const getVerificationCode = async (
    email: string,
    messageApi: MessageInstance
): Promise<boolean> => {
    const res = fetchApi(
        "/api/getVerificationCode",
        { email },
        () => true,
        messageApi
    );
    return Boolean(res);
};

export const invokeRegister = async (
    registerInfo: RegisterInfo,
    messageApi?: MessageInstance
): Promise<RegisterData | ErrorTypeEnum> => {
    return fetchApi(
        "/api/invokeRegister",
        { ...registerInfo },
        (data) => data as RegisterData,
        messageApi
    );
};

export const invokeLogin = async (
    loginInfo: LoginInfo,
    loginHandler: UserContextHandler,
    messageApi?: MessageInstance
): Promise<LoginData | ErrorTypeEnum> => {
    return fetchApi(
        "/api/invokeLogin",
        { ...loginInfo },
        (data) => {
            loginHandler({
                email: loginInfo.email,
                username: data.user || "",
                role: data.role || "",
            });
            return data as LoginData;
        },
        messageApi
    );
};

export const invokeLogout = async (
    email: string,
    logoutHandler: VoidFunction,
    messageApi?: MessageInstance
): Promise<boolean> => {
    const res = fetchApi(
        "/api/invokeLogout",
        { email },
        () => {
            logoutHandler();
            return true;
        },
        messageApi
    );
    return Boolean(res);
};

export const getMemeMarketList = async (
    messageApi?: MessageInstance
): Promise<any> => {
    return fetchApi(
        "/api/getMemeMarketList",
        null,
        (data) => data,
        messageApi,
        "GET"
    );
};

export const getChainData = async (): Promise<any> => {
    return axios.get("/api/getChainData").then((res) => {
        return res.data;
    });
};

export const getCoinData = async (
    chain: string,
    token: string
): Promise<any> => {
    return fetchApi("/api/getCoinData", { chain, token }, (data) => data);
};

export const getCirculationInData = async (params: {
    chain: string;
    token: string;
    startTime: string;
    endTime: string;
}): Promise<any> => {
    return fetchApi("/api/getCirculationInData", params, (data) => data);
};

export const getCirculationOutData = async (params: {
    chain: string;
    token: string;
    startTime: string;
    endTime: string;
}): Promise<any> => {
    return fetchApi("/api/getCirculationOutData", params, (data) => data);
};

export const getCirculationPriceData = async (params: {
    chain: string;
    token: string;
    startTime: string;
    endTime: string;
}): Promise<any> => {
    return fetchApi("/api/getCirculationPriceData", params, (data) => data);
};
