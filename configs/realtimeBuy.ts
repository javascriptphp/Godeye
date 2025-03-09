import type { TFunction } from "i18next";
import { legendTextColor, gridLineColor } from "@/utils/global_constant";

export const buildCustomConfig = function ({
    symbol,
    data,
    t,
}: {
    symbol: string;
    data: RealtimeData;
    t: TFunction;
}) {
    const highThreshold = data.threshold2;
    const lowThreshold = data.threshold;
    const markPoints = data.metric
        .map((value, index) => {
            if (
                highThreshold &&
                value > highThreshold &&
                (index === 0 || data.metric[index - 1] < highThreshold)
            ) {
                return {
                    coord: [index, data.high[index]],
                    value: "SELL",
                    name: "sell",
                    itemStyle: { color: "red" },
                };
            } else if (
                value < lowThreshold &&
                (index === 0 || data.metric[index - 1] > lowThreshold)
            ) {
                return {
                    coord: [index, data.low[index]],
                    value: "BUY",
                    name: "buy",
                    itemStyle: { color: "green" },
                };
            }
            return null;
        })
        .filter((point) => point !== null);

    return {
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "cross",
            },
        },
        grid: {
            left: 70,
            right: 50,
            top: 90,
        },
        // grid: [
        //     {
        //         left: 70,
        //         right: 50,
        //         height: "35%",
        //     },
        //     {
        //         left: 70,
        //         right: 50,
        //         top: "55%",
        //         height: "35%",
        //     },
        // ],
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
                axisLabel: {
                    color: legendTextColor,
                },
            },
            // {
            //     gridIndex: 1,
            //     type: "category",
            //     splitLine: { show: false },
            //     data: data.timestamps,
            // },
        ],
        yAxis: [
            {
                gridIndex: 0,
                name: `${symbol} ${t("text_price")}`,
                nameLocation: "end",
                nameTextStyle: {
                    fontSize: 14,
                    color: legendTextColor,
                },
                type: "value",
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: gridLineColor,
                    },
                },
                min: (value: any) => value.min * 0.999,
                max: (value: any) => value.max * 1.0001,
                axisLabel: {
                    formatter: (value: any) => value.toFixed(3),
                    color: legendTextColor,
                },
            },
            // {
            //     gridIndex: 1,
            //     name: t("chart_metric"),
            //     nameLocation: "end",
            //     nameTextStyle: {
            //         fontSize: 14,
            //     },
            //     type: "value",
            //     min: (value: any) => value.min * 0.999,
            //     max: (value: any) => value.max * 1.001,
            //     axisLabel: {
            //         formatter: (value: any) => value.toFixed(3),
            //     },
            // },
        ],
        legend: {
            data: [`${symbol} ${t("text_1hourK")}`],
            left: "center",
            top: 20,
            textStyle: {
                color: legendTextColor,
            },
        },
        series: [
            {
                name: `${symbol} ${t("text_1hourK")}`,
                type: "candlestick",
                data: transformToRawData(data),
                markPoint: {
                    data: markPoints,
                },
            },
            // {
            //     name: `${t("text_indicator")}`,
            //     type: "line",
            //     showSymbol: false,
            //     xAxisIndex: 1,
            //     yAxisIndex: 1,
            //     data: data.metric,
            //     emphasis: {
            //         focus: "series",
            //     },
            //     itemStyle: {
            //         color: "#e98734",
            //     },
            //     markPoint: {
            //         data: markPoints,
            //     },
            //     markLine: {
            //         symbol: ["none", "none"], // No arrow symbols
            //         data: [
            //             data.threshold2
            //                 ? {
            //                       name: "High Threshold",
            //                       yAxis: data.threshold2,
            //                       lineStyle: {
            //                           color: "red",
            //                           width: 1.5,
            //                       },
            //                   }
            //                 : undefined,
            //             {
            //                 name: "Low Threshold",
            //                 yAxis: data.threshold,
            //                 lineStyle: {
            //                     color: "green",
            //                     width: 1.5,
            //                 },
            //             },
            //         ].filter(Boolean),
            //     },
            // },
            // {
            //     // 创建一个隐藏的 series 以模拟 markArea 的图例
            //     name: t("text_buy_area"),
            //     type: "line",
            //     xAxisIndex: 0,
            //     yAxisIndex: 0,
            //     data: [],
            //     itemStyle: { color: buyAreaColor, opacity: 0.9 },
            // },
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
