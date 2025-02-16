export type BaseMetric = {
    metric_value: number;
    price: number;
    timestamp: Date;
};

export type BaseResponse = {
    code: number;
    message: string;
    message_level: string;
    data: null;
};

export type ThreeMonthResponse = {
    code: number;
    message: string;
    message_level: string;
    data: ThreeMonthData;
};

export type HistoricalResponse = {
    code: number;
    message: string;
    message_level: string;
    data: HistoricalData;
};

export type WebsocketUrlResponse = {
    code: number;
    message: string;
    message_level: string;
    data: {
        websocket_url: string;
    };
};

export type RegisterResponse = {
    code: number;
    message: string;
    message_level: string;
    data: RegisterData;
};

export type RegisterData = {
    user?: string;
    role?: string;
};

export type LoginData = RegisterData;

export type LoginResponse = RegisterResponse;

export type ThreeMonthData = {
    symbol: string;
    threshold: number;
    values: ThreeMonthBuyValues[] | ThreeMonthSellValues[];
};

export type ThreeMonthBuyData = {
    symbol: string;
    values: ThreeMonthBuyValues[];
};

export type ThreeMonthSellData = {
    symbol: string;
    values: ThreeMonthSellValues[];
};

export function isErrorTypeEnum(
    data:
        | ThreeMonthBuyData
        | ThreeMonthSellData
        | ErrorTypeEnum
        | HistoricalSellData
): boolean {
    return typeof data === "number";
}

export function isThreeMonthBuyData(
    data: ThreeMonthBuyData | ThreeMonthSellData
): data is ThreeMonthBuyData {
    return (data as ThreeMonthBuyData).values !== undefined;
}

export function isThreeMonthBuyValues(
    data: ThreeMonthBuyValues | ThreeMonthSellValues
): data is ThreeMonthBuyValues {
    const _data = data as ThreeMonthBuyValues;
    return (
        _data.timestamp !== undefined &&
        _data.price !== undefined &&
        _data.metric_value !== undefined
    );
}

export type HistoricalData = {
    symbol: string;
    values: HistoricalBuyValues[] | HistoricalSellValues[];
};

export type HistoricalBuyData = ThreeMonthBuyData;

export type HistoricalSellData = {
    symbol: string;
    values: HistoricalSellValues[];
};

export type HistoricalBuyValues = ThreeMonthBuyValues;

export type HistoricalSellValues = {
    timestamp: number;
    open: number;
    high: number;
    low: number;
    close: number;
    metric_value: number;
    threshold: number;
};

export type ThreeMonthBuyValues = {
    timestamp: Date;
    price: number;
    metric_value: number;
    threshold: number;
};

export type ThreeMonthSellValues = {
    timestamp: number;
    open: number;
    high: number;
    low: number;
    close: number;
    threshold: number;
    metric_value: number;
};

export type RealtimeResponse = {
    message: string;
    message_level: string;
    code: number;
    data: RealtimeBuyData[] | RealtimeSellData[];
};

export type RealtimeBuyData = {
    timestamp: Date;
    symbol: string;
    price: number;
    metric: string;
    metric_value: number;
    threshold: number;
};

export type RealtimeSellData = {
    timestamp: number;
    symbol: string;
    open: number;
    high: number;
    low: number;
    close: number;
    metric: string;
    metric_value: number;
    threshold: number;
};

export const BUY = "buy";

export const SELL = "sell";

export type BARealtimeData = {
    e: string;
    E: Date;
    s: string;
    k: {
        t: Date;
        T: Date;
        s: string;
        i: string;
        o: string;
    };
};

export enum MetricTypeEnum {
    free,
    pay,
}

export type SymbolAndMetric = {
    symbol: string;
    metric: string;
};

export interface UserContext {
    email: string | "";
    username: string | "";
    role: string | "";
}
export interface SystemContext {
    language?: string;
}

export enum ErrorTypeEnum {
    FALSE,
    NULL,
    NO_PERMISSION,
    EMAIL_EXISTS,
    INVALID_VERIFICATION_CODE,
    INVALID_CREDENTIALS,
    SYSTEM_ERROR,
}

export type XaxisType = {
    xAxis: string;
};

export type CoordType = [XaxisType, XaxisType];

export type BuyOptionBuilderParam = {
    title: string;
    symbol: string;
    metric: string;
    timestamps: string[];
    threshold: number;
    metricData: number[];
    priceData: any;
    watermark: string;
    includeMark: boolean;
};

export type SellOptionBuilderParam = {
    title: string;
    symbol: string;
    metric: string;
    timestamps: string[];
    threshold: number[];
    metricData: number[];
    priceData: any;
    watermark: string;
    includeMark: boolean;
    kLine: string;
};

export function isHistoricalSellValues(
    data: HistoricalBuyValues | HistoricalSellValues
): data is HistoricalSellValues {
    return Array.isArray((data as HistoricalSellValues).threshold);
}
