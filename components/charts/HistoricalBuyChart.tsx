import React, { useState, useEffect } from "react";
import * as echarts from "echarts";
import { EChartsOption } from "echarts";
import { chartHeight, chartWidth } from "@/utils/global_constant";
import { useTranslation } from "react-i18next";
import GlobalFunctions from "@/utils/global_functions";
import { buildCustomConfig } from "@/configs/historicalBuy";
import useStore from "@/utils/store";
import { getHistoricalData } from "@/service";
import { BUY } from "@/types";
import { formatTimestampToString } from "@/utils/time";

const initialHistoricalData: HistoricalData = {
    timestamps: [],
    price: [],
    metric: [],
    threshold: 0,
};

const RealtimeBuyChart = ({
    metric,
    symbol,
}: {
    metric: string;
    symbol: string;
}) => {
    const [historicalData, setHistoricalData] = useState<HistoricalData>(
        initialHistoricalData
    );
    const { t } = useTranslation();
    const Functions = GlobalFunctions(t);
    const { getUserContext } = useStore();
    const userContext = getUserContext();

    useEffect(() => {
        initData();
        fetchData();
    }, [metric, symbol]);

    useEffect(() => {
        buildChart();
    }, [historicalData]);

    const render = () => {
        return (
            <div
                id="HistoricalBuyChart"
                style={{ width: chartWidth, height: chartHeight }}
            />
        );
    };

    const initData = () => {
        setHistoricalData(initialHistoricalData);
    };

    const fetchData = async () => {
        try {
            const response: any = await getHistoricalData(symbol, metric);
            if (response) {
                processData(response.values);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const processData = (data: any) => {
        const updatedData: HistoricalData = {
            timestamps: data.map((item: any) =>
                formatTimestampToString(item.timestamp)
            ),
            price: data.map((item: any) => item.price),
            metric: data.map((item: any) => item.metric_value),
            threshold: data[0].threshold,
        };
        setHistoricalData((prev) => {
            return {
                timestamps: [...prev.timestamps, ...updatedData.timestamps],
                price: [...prev.price, ...updatedData.price],
                metric: [...prev.metric, ...updatedData.metric],
                threshold: updatedData.threshold,
            };
        });
    };

    const buildChart = () => {
        const _option = Functions.buildOptionForBuyChart({
            title: t("t2Title"),
            symbol: symbol,
            metric: BUY,
            timestamps: historicalData.timestamps,
            threshold: historicalData.threshold,
            metricData: historicalData.metric,
            priceData: historicalData.price,
            watermark: (userContext && userContext.email) || t("watermarkText"),
            includeMark: true,
        });
        const echartsOption = {
            ..._option,
            ...buildCustomConfig({
                symbol,
                metric: BUY,
                data: historicalData,
                t,
            }),
        } as EChartsOption;

        const chartDom = document.getElementById("HistoricalBuyChart");
        const myChart = echarts.init(chartDom);
        echartsOption && myChart.setOption(echartsOption);
    };

    return render();
};

export default RealtimeBuyChart;
