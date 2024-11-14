import type { TFunction } from "i18next";
import { buyAreaColor } from "@/utils/global_constant";

export const buildCustomConfig = function ({
    symbol,
    data,
    t,
}: {
    symbol: string;
    data: RealtimeData;
    t: TFunction;
}) {
    return {
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "cross",
            },
        },
        grid: [
            {
                left: 60,
                right: 50,
                height: "35%",
            },
            {
                left: 60,
                right: 50,
                top: "55%",
                height: "35%",
            },
        ],
        dataZoom: [
            {
                show: true,
                realtime: true,
                start: 0,
                end: 100,
                xAxisIndex: [0, 1],
            },
            {
                type: "inside",
                realtime: true,
                start: 0,
                end: 100,
                xAxisIndex: [0, 1],
            },
        ],
        axisPointer: {
            link: [
                {
                    xAxisIndex: "all",
                },
            ],
        },
        xAxis: [
            {
                gridIndex: 0,
                type: "category",
                splitLine: { show: false },
                data: data.timestamps,
            },
            {
                gridIndex: 1,
                type: "category",
                splitLine: { show: false },
                data: data.timestamps,
            },
        ],
        yAxis: [
            {
                gridIndex: 0,
                name: `${symbol}` + t("pricing"),
                nameLocation: "end",
                nameTextStyle: {
                    fontSize: 14,
                },
                type: "value",
                min: (value: any) => value.min * 0.999,
                max: (value: any) => value.max * 1.0001,
                axisLabel: {
                    formatter: (value: any) => value.toFixed(3),
                },
            },
            {
                gridIndex: 1,
                name: t("chart_metric"),
                nameLocation: "end",
                nameTextStyle: {
                    fontSize: 14,
                },
                type: "value",
                min: (value: any) => value.min * 0.999,
                max: (value: any) => value.max * 1.001,
                axisLabel: {
                    formatter: (value: any) => value.toFixed(3),
                },
            },
        ],
        series: [
            {
                name: `${symbol} ${t("text_price")}`,
                type: "candlestick",
                data: transformToRawData(data),
            },
            {
                name: `${t("text_indicator")}`,
                type: "line",
                showSymbol: false,
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: data.metric,
                emphasis: {
                    focus: "series",
                },
                itemStyle: {
                    color: "#e98734",
                },
            },
            {
                // 创建一个隐藏的 series 以模拟 markArea 的图例
                name: t("text_buy_area"),
                type: "line",
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: [],
                itemStyle: { color: buyAreaColor, opacity: 0.9 },
            },
        ],
    };
};

const transformToRawData = (
    realtimeData: RealtimeData
): [number, number, number, number][] => {
    return realtimeData.open.map((open, i) => [
        open,
        realtimeData.close[i],
        realtimeData.low[i],
        realtimeData.high[i],
    ]);
};
