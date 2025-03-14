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

export type LoginWithWalletResponse = {
    code: number;
    message: string;
    message_level: string;
    data: LoginWithWalletData | null;
};

export type LoginWithWalletData = {
    email?: string;
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

export enum MetricType {
    BUY = "buy",
    SELL = "sell",
}

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
    type: "NORMAL" | "WALLET";
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

export class SupportWallet {
    private readonly icon : string;
    private readonly rdns : string;
    private constructor(rdns: string, icon: string) {
        this.rdns = rdns;
        this.icon = icon;
    }

    static readonly OKX = new SupportWallet("com.okex.wallet","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJDSURBVHgB7Zq9jtpAEMfHlhEgQLiioXEkoAGECwoKxMcTRHmC5E3IoyRPkPAEkI7unJYmTgEFTYwA8a3NTKScLnCHN6c9r1e3P2llWQy7M/s1Gv1twCP0ej37dDq9x+Zut1t3t9vZjDEHIiSRSPg4ZpDL5fxkMvn1cDh8m0wmfugfO53OoFQq/crn8wxfY9EymQyrVCqMfHvScZx1p9ls3pFxXBy/bKlUipGPrVbLuQqAfsCliq3zl0H84zwtjQrOw4Mt1W63P5LvBm2d+Xz+YzqdgkqUy+WgWCy+Mc/nc282m4FqLBYL+3g8fjDxenq72WxANZbLJeA13zDX67UDioL5ybXwafMYu64Ltn3bdDweQ5R97fd7GyhBQMipx4POeEDHIu2LfDdBIGGz+hJ9CQ1ABjoA2egAZPM6AgiCAEQhsi/C4jHyPA/6/f5NG3Ks2+3CYDC4aTccDrn6ojG54MnEvG00GoVmWLIRNZ7wTCwDHYBsdACy0QHIhiuRETxlICWpMMhGZHmqS8qH6JLyGegAZKMDkI0uKf8X4SWlaZo+Pp1bRrwlJU8ZKLIvUjKh0WiQ3sRUbNVq9c5Ebew7KEo2m/1p4jJ4qAmDaqDQBzj5XyiAT4VCQezJigAU+IDU+z8vJFnGWeC+bKQV/5VZ71FV6L7PA3gg3tXrdQ+DgLhC+75Wq3no69P3MC0NFQpx2lL04Ql9gHK1bRDjsSBIvScBnDTk1WrlGIZBorIDEYJj+rhdgnQ67VmWRe0zlplXl81vcyEt0rSoYDUAAAAASUVORK5CYII=");
    static readonly METAMASK = new SupportWallet("io.metamask","data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzUiIGhlaWdodD0iMzQiIHZpZXdCb3g9IjAgMCAzNSAzNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMyLjcwNzcgMzIuNzUyMkwyNS4xNjg4IDMwLjUxNzRMMTkuNDgzMyAzMy45MDA4TDE1LjUxNjcgMzMuODk5MUw5LjgyNzkzIDMwLjUxNzRMMi4yOTIyNSAzMi43NTIyTDAgMjUuMDQ4OUwyLjI5MjI1IDE2LjQ5OTNMMCA5LjI3MDk0TDIuMjkyMjUgMC4zMTIyNTZMMTQuMDY3NCA3LjMxNTU0SDIwLjkzMjZMMzIuNzA3NyAwLjMxMjI1NkwzNSA5LjI3MDk0TDMyLjcwNzcgMTYuNDk5M0wzNSAyNS4wNDg5TDMyLjcwNzcgMzIuNzUyMloiIGZpbGw9IiNGRjVDMTYiLz4KPHBhdGggZD0iTTIuMjkzOTUgMC4zMTIyNTZMMTQuMDY5MSA3LjMyMDQ3TDEzLjYwMDggMTIuMTMwMUwyLjI5Mzk1IDAuMzEyMjU2WiIgZmlsbD0iI0ZGNUMxNiIvPgo8cGF0aCBkPSJNOS44Mjk1OSAyNS4wNTIyTDE1LjAxMDYgMjguOTgxMUw5LjgyOTU5IDMwLjUxNzVWMjUuMDUyMloiIGZpbGw9IiNGRjVDMTYiLz4KPHBhdGggZD0iTTE0LjU5NjYgMTguNTU2NUwxMy42MDA5IDEyLjEzMzNMNy4yMjY5MiAxNi41MDA5TDcuMjIzNjMgMTYuNDk5M1YxNi41MDI1TDcuMjQzMzUgMjAuOTk4M0w5LjgyODA5IDE4LjU1NjVIOS44Mjk3NEgxNC41OTY2WiIgZmlsbD0iI0ZGNUMxNiIvPgo8cGF0aCBkPSJNMzIuNzA3NyAwLjMxMjI1NkwyMC45MzI2IDcuMzIwNDdMMjEuMzk5MyAxMi4xMzAxTDMyLjcwNzcgMC4zMTIyNTZaIiBmaWxsPSIjRkY1QzE2Ii8+CjxwYXRoIGQ9Ik0yNS4xNzIyIDI1LjA1MjJMMTkuOTkxMiAyOC45ODExTDI1LjE3MjIgMzAuNTE3NVYyNS4wNTIyWiIgZmlsbD0iI0ZGNUMxNiIvPgo8cGF0aCBkPSJNMjcuNzc2NiAxNi41MDI1SDI3Ljc3ODNIMjcuNzc2NlYxNi40OTkzTDI3Ljc3NSAxNi41MDA5TDIxLjQwMSAxMi4xMzMzTDIwLjQwNTMgMTguNTU2NUgyNS4xNzIyTDI3Ljc1ODYgMjAuOTk4M0wyNy43NzY2IDE2LjUwMjVaIiBmaWxsPSIjRkY1QzE2Ii8+CjxwYXRoIGQ9Ik05LjgyNzkzIDMwLjUxNzVMMi4yOTIyNSAzMi43NTIyTDAgMjUuMDUyMkg5LjgyNzkzVjMwLjUxNzVaIiBmaWxsPSIjRTM0ODA3Ii8+CjxwYXRoIGQ9Ik0xNC41OTQ3IDE4LjU1NDlMMTYuMDM0MSAyNy44NDA2TDE0LjAzOTMgMjIuNjc3N0w3LjIzOTc1IDIwLjk5ODRMOS44MjYxMyAxOC41NTQ5SDE0LjU5M0gxNC41OTQ3WiIgZmlsbD0iI0UzNDgwNyIvPgo8cGF0aCBkPSJNMjUuMTcyMSAzMC41MTc1TDMyLjcwNzggMzIuNzUyMkwzNS4wMDAxIDI1LjA1MjJIMjUuMTcyMVYzMC41MTc1WiIgZmlsbD0iI0UzNDgwNyIvPgo8cGF0aCBkPSJNMjAuNDA1MyAxOC41NTQ5TDE4Ljk2NTggMjcuODQwNkwyMC45NjA3IDIyLjY3NzdMMjcuNzYwMiAyMC45OTg0TDI1LjE3MjIgMTguNTU0OUgyMC40MDUzWiIgZmlsbD0iI0UzNDgwNyIvPgo8cGF0aCBkPSJNMCAyNS4wNDg4TDIuMjkyMjUgMTYuNDk5M0g3LjIyMTgzTDcuMjM5OTEgMjAuOTk2N0wxNC4wMzk0IDIyLjY3NkwxNi4wMzQzIDI3LjgzODlMMTUuMDA4OSAyOC45NzZMOS44Mjc5MyAyNS4wNDcySDBWMjUuMDQ4OFoiIGZpbGw9IiNGRjhENUQiLz4KPHBhdGggZD0iTTM1LjAwMDEgMjUuMDQ4OEwzMi43MDc4IDE2LjQ5OTNIMjcuNzc4M0wyNy43NjAyIDIwLjk5NjdMMjAuOTYwNyAyMi42NzZMMTguOTY1OCAyNy44Mzg5TDE5Ljk5MTIgMjguOTc2TDI1LjE3MjIgMjUuMDQ3MkgzNS4wMDAxVjI1LjA0ODhaIiBmaWxsPSIjRkY4RDVEIi8+CjxwYXRoIGQ9Ik0yMC45MzI1IDcuMzE1NDNIMTcuNDk5OUgxNC4wNjczTDEzLjYwMDYgMTIuMTI1MUwxNi4wMzQyIDI3LjgzNEgxOC45NjU2TDIxLjQwMDggMTIuMTI1MUwyMC45MzI1IDcuMzE1NDNaIiBmaWxsPSIjRkY4RDVEIi8+CjxwYXRoIGQ9Ik0yLjI5MjI1IDAuMzEyMjU2TDAgOS4yNzA5NEwyLjI5MjI1IDE2LjQ5OTNINy4yMjE4M0wxMy41OTkxIDEyLjEzMDFMMi4yOTIyNSAwLjMxMjI1NloiIGZpbGw9IiM2NjE4MDAiLz4KPHBhdGggZD0iTTEzLjE3IDIwLjQxOTlIMTAuOTM2OUw5LjcyMDk1IDIxLjYwNjJMMTQuMDQwOSAyMi42NzI3TDEzLjE3IDIwLjQxODJWMjAuNDE5OVoiIGZpbGw9IiM2NjE4MDAiLz4KPHBhdGggZD0iTTMyLjcwNzcgMC4zMTIyNTZMMzQuOTk5OSA5LjI3MDk0TDMyLjcwNzcgMTYuNDk5M0gyNy43NzgxTDIxLjQwMDkgMTIuMTMwMUwzMi43MDc3IDAuMzEyMjU2WiIgZmlsbD0iIzY2MTgwMCIvPgo8cGF0aCBkPSJNMjEuODMzIDIwLjQxOTlIMjQuMDY5NEwyNS4yODUzIDIxLjYwNzlMMjAuOTYwNCAyMi42NzZMMjEuODMzIDIwLjQxODJWMjAuNDE5OVoiIGZpbGw9IiM2NjE4MDAiLz4KPHBhdGggZD0iTTE5LjQ4MTcgMzAuODM2MkwxOS45OTExIDI4Ljk3OTRMMTguOTY1OCAyNy44NDIzSDE2LjAzMjdMMTUuMDA3MyAyOC45Nzk0TDE1LjUxNjcgMzAuODM2MiIgZmlsbD0iIzY2MTgwMCIvPgo8cGF0aCBkPSJNMTkuNDgxNiAzMC44MzU5VjMzLjkwMjFIMTUuNTE2NlYzMC44MzU5SDE5LjQ4MTZaIiBmaWxsPSIjQzBDNENEIi8+CjxwYXRoIGQ9Ik05LjgyOTU5IDMwLjUxNDJMMTUuNTIgMzMuOTAwOFYzMC44MzQ2TDE1LjAxMDYgMjguOTc3OEw5LjgyOTU5IDMwLjUxNDJaIiBmaWxsPSIjRTdFQkY2Ii8+CjxwYXRoIGQ9Ik0yNS4xNzIxIDMwLjUxNDJMMTkuNDgxNyAzMy45MDA4VjMwLjgzNDZMMTkuOTkxMSAyOC45Nzc4TDI1LjE3MjEgMzAuNTE0MloiIGZpbGw9IiNFN0VCRjYiLz4KPC9zdmc+Cg==");

    private static readonly _names: { [key: string]: SupportWallet } = {
        'com.okex.wallet': SupportWallet.OKX,
        'io.metamask': SupportWallet.METAMASK
    };

    private static readonly _values: { [key: string]: string } = {
        'okx': "com.okex.wallet",
        'metamask': "io.metamask"
    };

    static fromName(name: string): SupportWallet {
        return SupportWallet._names[SupportWallet._values[name]];
    }
    static fromRdns(rdns: string): SupportWallet {
        return SupportWallet._names[rdns];
    }
    static names(): string[] {
        return Object.keys(SupportWallet._values);
    }
    static rdnses(): string[] {
        return Object.values(SupportWallet._values);
    }
    getName(): string {
        for (const name in SupportWallet._values) {
            const rdns = SupportWallet._values[name];
            if (SupportWallet._values[name] && this === SupportWallet._names[rdns]) {
                return name;
            }
        }
        throw new Error('Invalid color instance');
    }
    getIcon(): string {
        return this.icon;
    }
    getRdns(): string {
        return this.rdns;
    }
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
