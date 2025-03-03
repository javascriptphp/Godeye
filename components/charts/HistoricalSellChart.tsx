import React, { useState, useEffect, useRef } from "react";
import * as echarts from "echarts";
import { EChartsOption } from "echarts";
import { chartHeight, chartWidth } from "@/utils/global_constant";
import { useTranslation } from "react-i18next";
import GlobalFunctions from "@/utils/global_functions";
import { buildCustomConfig } from "@/configs/historicalSell";
import useStore from "@/utils/store";
import { getHistoricalData } from "@/service";
import {
    HistoricalSellData,
    HistoricalSellValues,
    isErrorTypeEnum,
    SELL,
} from "@/types";
import { formatTimestampToString } from "@/utils/time";

interface HistoricalSellItem {
    timestamps: string[];
    metric: number[];
    threshold: number[];
    price: any[];
}

const initialHistoricalData: HistoricalSellItem = {
    timestamps: [],
    metric: [],
    threshold: [],
    price: [],
};

const HistoricalSellChart = ({
    metric,
    symbol,
}: {
    metric: string;
    symbol: string;
}) => {
    const [historicalData, setHistoricalData] = useState(initialHistoricalData);
    const { t } = useTranslation();
    const Functions = GlobalFunctions(t);
    const { getUserContext } = useStore();
    const userContext = getUserContext();
    const chartRef = useRef<echarts.ECharts | null>(null);
    const chartContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        initData();
        fetchData();

        // 添加窗口大小变化监听
        const handleResize = () => {
            if (chartRef.current) {
                chartRef.current.resize();
            }
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            // 清理图表实例
            if (chartRef.current) {
                chartRef.current.dispose();
                chartRef.current = null;
            }
        };
    }, [metric, symbol, userContext]);

    useEffect(() => {
        buildChart();
    }, [historicalData]);

    const render = () => {
        return (
            <div
                id="HistoricalSellChart"
                style={{ width: chartWidth, height: chartHeight }}
            />
        );
    };

    const initData = () => {
        setHistoricalData(initialHistoricalData);
    };

    const fetchData = async () => {
        try {
            const response = await getHistoricalData(symbol, metric);

            if (isErrorTypeEnum(response)) {
                console.error("Error fetching historical sell data");
                return;
            }

            const sellData = response as HistoricalSellData;
            if (sellData.values) {
                processData(sellData.values);
            }
        } catch (e) {
            console.error("Error in fetchData:", e);
        }
    };

    const processData = (data: HistoricalSellValues[]) => {
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

        setHistoricalData(updatedData);
    };

    const buildChart = () => {
        const _option = Functions.buildOptionForSellChart({
            title: t("t2Title"),
            symbol: symbol,
            metric: SELL,
            timestamps: historicalData.timestamps,
            threshold: historicalData.threshold,
            metricData: historicalData.metric,
            priceData: historicalData.price,
            watermark: (userContext && userContext.email) || t("watermarkText"),
            includeMark: true,
            kLine: t("text_dailyK"),
        });

        const echartsOption = {
            ..._option,
            ...buildCustomConfig({
                userContext,
            }),
            // 添加响应式配置
            grid: {
                left: "5%",
                right: "5%",
                top: "15%",
                bottom: "15%",
                containLabel: true,
            },
        } as EChartsOption;

        const chartDom = document.getElementById("HistoricalSellChart");
        if (chartDom) {
            // 如果已经有图表实例，先销毁
            if (chartRef.current) {
                chartRef.current.dispose();
            }
            // 创建新的图表实例
            chartRef.current = echarts.init(chartDom);
            // 设置图表选项
            echartsOption && chartRef.current.setOption(echartsOption);
        }
    };

    return render();
};

export default HistoricalSellChart;
