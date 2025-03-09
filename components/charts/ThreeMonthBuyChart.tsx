import React, { useState, useEffect, useRef } from "react";
import * as echarts from "echarts";
import { EChartsOption } from "echarts";
import { chartHeight, chartWidth } from "@/utils/global_constant";
import { useTranslation } from "react-i18next";
import GlobalFunctions from "@/utils/global_functions";
import { buildCustomConfig } from "@/configs/threeMonthBuy";
import useStore from "@/utils/store";
import { getThreeMonthData } from "@/service";
import { BUY } from "@/types";
import { formatTimestampToString } from "@/utils/time";

const initialThreeMonthData: HistoricalData = {
    timestamps: [],
    price: [],
    metric: [],
    threshold: 0,
};

const ThreeMonthBuyChart = ({
    metric,
    symbol,
}: {
    metric: string;
    symbol: string;
}) => {
    const [historicalData, setHistoricalData] = useState<HistoricalData>(
        initialThreeMonthData
    );
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
                id="ThreeMonthBuyChart"
                ref={chartContainerRef}
                style={{
                    width: chartWidth,
                    height: chartHeight,
                    maxWidth: "100%",
                }}
                className="chart-container"
            />
        );
    };

    const initData = () => {
        setHistoricalData(initialThreeMonthData);
    };

    const fetchData = async () => {
        try {
            const response: any = await getThreeMonthData(symbol, metric);
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
            title: t("t1Title"),
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
            // 添加响应式配置
            grid: {
                left: "5%",
                right: "5%",
                top: "15%",
                bottom: "15%",
                containLabel: true,
            },
        } as EChartsOption;

        const chartDom = document.getElementById("ThreeMonthBuyChart");
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

export default ThreeMonthBuyChart;
