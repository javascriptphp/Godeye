import { BUY, CoordType } from "@/types";
import { buyAreaColor } from "@/utils/global_constant";
import { TFunction } from "i18next";

export const calculateAreaRanges = function (data: {
    timestamps: string[];
    metricData: number[];
    threshold: number;
}): CoordType[] {
    const { timestamps, metricData, threshold } = data;
    const ranges = _findTimestampRanges(metricData, timestamps, threshold);
    return ranges.map((range: string[]) => {
        return [
            {
                xAxis: range[0],
            },
            {
                xAxis: range[1],
            },
        ];
    });
};

export const calculateLineTimestamp = function (data: {
    metric: string;
    timestamps: string[];
    metricData: number[];
    threshold: number;
    t: TFunction;
}): any {
    const { metric, timestamps, metricData, threshold, t } = data;
    const ranges = _findTimestampRanges(metricData, timestamps, threshold);
    const lineTimestamp = _findTimestamp(ranges);
    const _lines = lineTimestamp.map((s: string) => {
        return {
            xAxis: s,
            label: {
                show: false,
            },
            lineStyle: {
                width: 5,
                type: "solid",
                color: buyAreaColor, // 阈值线的颜色
                opacity: 0.9,
            },
        };
    }) as any;
    _lines.push({
        yAxis: threshold, // 这里设置阈值线的 y 轴位置
        label: {
            position: "start",
            formatter: t("text_indicator_threshold") + " {c}", // 显示的文本
        },
        lineStyle: {
            width: 2,
            color: metric === BUY ? "#44ee11" : "#ec3939", // 阈值线的颜色
            type: "dashed", // 阈值线的样式，'dashed' 表示虚线
        },
    });
    return _lines;
};

const _findTimestampRanges = (
    array: number[],
    timestamps: string[],
    threshold: number
) => {
    if (array.length !== timestamps.length) {
        throw new Error("Array and timestamps must have the same length");
    }
    const n = array.length;
    const intervals = [];
    let start = null;

    for (let i = 1; i < n - 1; i++) {
        if (array[i] < threshold) {
            if (start === null) {
                // 检查左端条件：左端点的前一个元素大于 threshold
                if (array[i - 1] > threshold) {
                    start = i;
                }
            }
        } else {
            if (start !== null) {
                // 检查右端条件：右端点的后一个元素大于 threshold
                if (array[i] > threshold) {
                    // 确保区间至少包含两个元素
                    // if (i - 1 > start) {
                    intervals.push([start, i - 1]);
                    // }
                }
                start = null;
            }
        }
    }

    // 检查最后一个元素结束区间
    if (start !== null && array[n - 1] > threshold) {
        // 确保区间至少包含两个元素
        intervals.push([start, n - 1]);
    }

    // 提取 timestamps 中对应的区间
    return intervals.map(([start, end]) => [
        timestamps[start],
        timestamps[end],
    ]);
};

const _findTimestamp = (array: string[][]) => {
    const timestamps = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i][0] === array[i][1]) {
            timestamps.push(array[i][0]);
        }
    }
    return timestamps;
};
