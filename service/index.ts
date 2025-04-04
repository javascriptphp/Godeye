import {
    BUY,
    ErrorTypeEnum,
    HistoricalBuyData,
    HistoricalSellData,
    LoginData,
    LoginWithWalletResponse,
    RegisterData,
    ThreeMonthBuyData,
    ThreeMonthSellData, TweetPostDataResponse,
} from "@/types";
import axios, { AxiosResponse } from "axios";
import { UserContextHandler } from "@/utils/store";
import type { MessageInstance } from "antd/es/message/interface";
import { SERVER_HOST } from "@/service/axios";
import { getCookie } from "@/utils/auth";

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
                return responseData;
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
): Promise<any> => {
    return fetchApi(
        "/api/getVerificationCode",
        { email },
        (data) => data,
        messageApi
    );
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
                type: "NORMAL",
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

export const getChatResponse = async (message: string): Promise<string> => {
    return fetchApi(
        "/api/getChatResponse",
        { user_text: message },
        (data) => data
    );
};

export const getChatResponseSSE = (
    message: string,
    onMessage: (data: string) => void
) => {
    const email = getCookie("email");
    const deviceId = getCookie("device_id");

    const params = new URLSearchParams({
        user_text: message,
        ...(email && { email }),
        ...(deviceId && { device_id: deviceId }),
    });

    const url = `/api/getChatResponseSSE?${params.toString()}`;
    // const url = `${SERVER_HOST}/api/chatbot/generate_response?${params.toString()}`;

    try {
        const eventSource = new EventSource(url);

        eventSource.onmessage = (event) => {
            onMessage(JSON.parse(event.data));
        };

        eventSource.onerror = (error) => {
            console.error("SSE 连接发生错误：", error);
            eventSource.close();
        };

        // 添加连接建立的处理器
        eventSource.onopen = () => {
            console.log("SSE 连接已建立", {
                email,
                deviceId,
                url,
            });
        };

        return eventSource;
    } catch (error) {
        console.error("创建 EventSource 失败:", error);
        throw error;
    }
};

export const getChatHistory = async (message: string): Promise<string> => {
    return fetchApi(
        "/api/getChatHistory",
        { user_text: message },
        (data) => data
    );
};

export const getChatClearance = async (message: string): Promise<string> => {
    return fetchApi(
        "/api/getChatClearance",
        { user_text: message },
        (data) => data
    );
};

export const loginWithWallet = async (
    wallet: string,
    wallet_address: string,
    loginHandler: UserContextHandler,
    messageApi?: MessageInstance
): Promise<LoginWithWalletResponse | ErrorTypeEnum> => {
    return fetchApi(
        "/api/loginWithWallet",
        { wallet, wallet_address },
        (data) => {
            loginHandler({
                email: data.email,
                username: data.user || "",
                role: data.role || "",
                type: "WALLET",
            });
            return data as LoginWithWalletResponse;
        },
        messageApi
    );
};

export const getTweetPostData = async (
  user: string,
  startTimestamp: number,
  endTimestamp: number
) : Promise<TweetPostDataResponse | ErrorTypeEnum> => {
    return fetchApi(
      "/api/getTweetPostData",
      {user, "start_ts_in_ms":startTimestamp, "end_ts_in_ms":endTimestamp},
      (data) => data,
    );
}