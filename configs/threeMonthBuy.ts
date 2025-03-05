import type { TFunction } from "i18next";
import {
    buyAreaColor,
    indicatorColor,
    priceColor,
} from "@/utils/global_constant";
import { calculateAreaRanges, calculateLineTimestamp } from "@/configs/common";

export const buildCustomConfig = function ({
    symbol,
    metric,
    data,
    t,
}: {
    symbol: string;
    metric: string;
    data: HistoricalData;
    t: TFunction;
}) {
    const lowThreshold = data.threshold;
    const markPoints = data.metric
        .map((value, index) => {
            if (
                value < lowThreshold &&
                (index === 0 || data.metric[index - 1] > lowThreshold)
            ) {
                return {
                    coord: [index, data.price[index]],
                    value: "BUY",
                    name: "buy",
                    itemStyle: { color: "green" },
                };
            }
            return null;
        })
        .filter((point) => point !== null);
    const lineRanges = calculateLineTimestamp({
        metric,
        timestamps: data.timestamps,
        metricData: data.metric,
        threshold: data.threshold,
        t,
    });
    const areaRanges = calculateAreaRanges({
        timestamps: data.timestamps,
        metricData: data.metric,
        threshold: data.threshold,
    });
    return {
        series: [
            {
                name: `${t("text_indicator")}`,
                type: "line",
                showSymbol: false,
                yAxisIndex: 0,
                data: data.metric,
                emphasis: {
                    focus: "series",
                },
                itemStyle: {
                    color: indicatorColor,
                },
                markLine: {
                    symbol: "none",
                    data: lineRanges,
                    animation: false,
                },
                markArea: {
                    silent: true,
                    itemStyle: {
                        color: buyAreaColor,
                        opacity: 0.9,
                    },
                    data: areaRanges,
                },
            },
            {
                name: `${symbol} ${t("text_price")}`,
                type: "line",
                yAxisIndex: 1,
                showSymbol: false,
                emphasis: {
                    focus: "series",
                },
                itemStyle: {
                    color: priceColor,
                },
                data: data.price,
                markPoint: {
                    data: markPoints,
                },
            },
            {
                // 创建一个隐藏的 series 以模拟 markArea 的图例
                name: t("text_buy_area"),
                type: "line",
                data: [],
                itemStyle: { color: buyAreaColor, opacity: 0.9 },
            },
        ],
    };
};
