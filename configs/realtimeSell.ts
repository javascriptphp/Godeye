import { legendTextColor, gridLineColor } from "@/utils/global_constant";

export const buildCustomConfig = ({ symbol }: { symbol: string }) => {
    return {
        dataZoom: [
            {
                show: true,
                realtime: true,
                start: 90,
                end: 100,
            },
            {
                type: "inside",
                realtime: true,
                start: 95,
                end: 100,
            },
        ],
        yAxis: [
            {
                name: "指标",
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
                axisLabel: {
                    color: legendTextColor,
                    formatter: (value: any) => value.toFixed(3),
                },
            },
            {
                name: `${symbol}价格`,
                nameLocation: "end",
                nameTextStyle: {
                    fontSize: 14,
                    color: legendTextColor,
                },
                type: "value",
                splitLine: {
                    show: false,
                },
                min: (value: any) => value.min * 0.999,
                max: (value: any) => value.max * 1.001,
                axisLabel: {
                    color: legendTextColor,
                    formatter: (value: any) => value.toFixed(3),
                },
            },
        ],
    };
};
