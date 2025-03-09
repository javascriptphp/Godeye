import React, { useState, useEffect, useRef } from "react";
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
import ChartUpgrade from "@/components/ChartUpgrade";

const initialHistoricalData: HistoricalData = {
    timestamps: [],
    price: [],
    metric: [],
    threshold: 0,
};

const HistoricalBuyChart = ({
    metric,
    symbol,
}: {
    metric: string;
    symbol: string;
}) => {
    const [historicalData, setHistoricalData] = useState<HistoricalData>(
        initialHistoricalData
    );
    const [showUpgrade, setShowUpgrade] = useState(false);
    const { t } = useTranslation();
    const Functions = GlobalFunctions(t);
    const { getUserContext } = useStore();
    const userContext = getUserContext();
    const chartRef = useRef<echarts.ECharts | null>(null);
    const chartContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        initData();

        // Check if user is logged in
        if (!userContext) {
            setShowUpgrade(true);
            return;
        }

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
        if (!showUpgrade && historicalData.timestamps.length > 0) {
            buildChart();
        }
    }, [historicalData, showUpgrade]);

    const render = () => {
        return (
            <div
                style={{
                    position: "relative",
                    width: chartWidth,
                    height: chartHeight,
                    maxWidth: "100%",
                }}
            >
                <div
                    id="HistoricalBuyChart"
                    ref={chartContainerRef}
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                    className="chart-container"
                />
                {showUpgrade && (
                    <ChartUpgrade chartType={t("historicalBuyChart")} />
                )}
            </div>
        );
    };

    const initData = () => {
        setHistoricalData(initialHistoricalData);
    };

    const fetchData = async () => {
        try {
            const response: any = await getHistoricalData(symbol, metric);
            if (response && response.values && response.values.length > 0) {
                processData(response.values);
                setShowUpgrade(false);
            } else {
                setShowUpgrade(true);
            }
        } catch (e) {
            console.error(e);
            setShowUpgrade(true);
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
            // 添加响应式配置
            grid: {
                left: "5%",
                right: "5%",
                top: "15%",
                bottom: "15%",
                containLabel: true,
            },
        } as EChartsOption;

        const chartDom = document.getElementById("HistoricalBuyChart");
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

export default HistoricalBuyChart;
