import React, { useState, useEffect } from "react";
import * as echarts from "echarts";
import { EChartsOption } from "echarts";
import { chartHeight, chartWidth } from "@/utils/global_constant";
import { useTranslation } from "react-i18next";
import GlobalFunctions from "@/utils/global_functions";
import useStore from "@/utils/store";
import { getThreeMonthData } from "@/service";
import {
    ThreeMonthSellData,
    ThreeMonthSellValues,
    isErrorTypeEnum,
    SELL,
} from "@/types";
import { formatTimestampToString } from "@/utils/time";

interface ThreeMonthSellItem {
    timestamps: string[];
    metric: number[];
    threshold: number[];
    price: any[];
}

const initialThreeMonthData: ThreeMonthSellItem = {
    timestamps: [],
    metric: [],
    threshold: [],
    price: [],
};

const ThreeMonthSellChart = ({
    metric,
    symbol,
}: {
    metric: string;
    symbol: string;
}) => {
    const [threeMonthData, setThreeMonthData] = useState(initialThreeMonthData);
    const { t } = useTranslation();
    const Functions = GlobalFunctions(t);
    const { getUserContext } = useStore();
    const userContext = getUserContext();

    useEffect(() => {
        initData();
        fetchData();
    }, [metric, symbol, userContext]);

    useEffect(() => {
        buildChart();
    }, [threeMonthData]);

    const render = () => {
        return (
            <div
                id="ThreeMonthSellChart"
                style={{ width: chartWidth, height: chartHeight }}
            />
        );
    };

    const initData = () => {
        setThreeMonthData(initialThreeMonthData);
    };

    const fetchData = async () => {
        try {
            const response = await getThreeMonthData(symbol, metric);

            if (isErrorTypeEnum(response)) {
                console.error("Error fetching three-month sell data");
                return;
            }

            const sellData = response as ThreeMonthSellData;
            if (sellData.values) {
                processData(sellData.values);
            }
        } catch (e) {
            console.error("Error in fetchData:", e);
        }
    };

    const processData = (data: ThreeMonthSellValues[]) => {
        const updatedData = {
            timestamps: data.map((item) =>
                formatTimestampToString(item.timestamp)
            ),
            metric: data.map((item) => item.metric_value),
            threshold: data.map((item) => item.threshold),
            price: data.map((item) => [
                item.open,
                item.close,
                item.low,
                item.high,
            ]),
        };

        setThreeMonthData(updatedData);
    };

    const buildChart = () => {
        const _option = Functions.buildOptionForSellChart({
            title: t("t1Title"),
            symbol: symbol,
            metric: SELL,
            timestamps: threeMonthData.timestamps,
            threshold: threeMonthData.threshold,
            metricData: threeMonthData.metric,
            priceData: threeMonthData.price,
            watermark: (userContext && userContext.email) || t("watermarkText"),
            includeMark: true,
            kLine: t("text_dailyK"),
        });

        const echartsOption = {
            ..._option,
        } as EChartsOption;

        const chartDom = document.getElementById("ThreeMonthSellChart");
        const myChart = echarts.init(chartDom);
        echartsOption && myChart.setOption(echartsOption);
    };

    return render();
};

export default ThreeMonthSellChart;
