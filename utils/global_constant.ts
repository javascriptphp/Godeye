import * as echarts from "echarts";
import { EChartsOption } from "echarts";
import React from "react";

export const sidebarWidth = "200px";
export const chartWidth = "100%";
export const chartHeight = "500px"; // 默认高度，会被媒体查询覆盖
export const introductionWidth = "100%";
export const footerText = `\u00A9 2024 Godeye Ltd. All rights reserved.`;

export const downColor = "#ec0000";
export const downBorderColor = "#8A0000";
export const upColor = "#00da3c";
export const upBorderColor = "#008F28";
export const buyAreaColor = "rgba(76, 175, 80, 0.3)"; // Brighter green with transparency
export const sellAreaColor = "rgba(244, 67, 54, 0.3)"; // Brighter red with transparency
export const indicatorColor = "#2196f3";
export const priceColor = "#f44336";
export const legendTextColor = "#f5f5f5"; // 图例文字颜色
export const gridLineColor = "rgba(255, 255, 255, 0.1)"; // 图表背景网格线颜色

export const createChart = function ({
    chartRef,
    containerRef,
    echartsOption,
}: {
    chartRef: React.MutableRefObject<echarts.ECharts | null>;
    containerRef: React.RefObject<HTMLDivElement>;
    echartsOption: EChartsOption | undefined;
}) {
    // Initialize chart if it hasn't been initialized yet
    if (!chartRef.current && containerRef.current) {
        chartRef.current = echarts.init(containerRef.current);
    }

    if (chartRef.current && echartsOption) {
        chartRef.current.setOption(echartsOption);
    }

    return () => {
        // window.removeEventListener('resize', handleResize);
        chartRef.current?.dispose(); // Dispose of the chart instance on component unmount
        chartRef.current = null;
    };
};
export const buildWatermarks = function (watermark: string) {
    const graphics = [];
    const text = watermark; // 你想要的水印文本
    const gap = 150; // 间隔

    // 计算行和列 - 使用百分比计算
    const containerWidth =
        document.getElementById("HistoricalBuyChart")?.clientWidth ||
        document.getElementById("RealtimeBuyChart")?.clientWidth ||
        document.getElementById("ThreeMonthBuyChart")?.clientWidth ||
        document.getElementById("HistoricalSellChart")?.clientWidth ||
        document.getElementById("RealtimeSellChart")?.clientWidth ||
        document.getElementById("ThreeMonthSellChart")?.clientWidth ||
        1100;
    const containerHeight =
        document.getElementById("HistoricalBuyChart")?.clientHeight ||
        document.getElementById("RealtimeBuyChart")?.clientHeight ||
        document.getElementById("ThreeMonthBuyChart")?.clientHeight ||
        document.getElementById("HistoricalSellChart")?.clientHeight ||
        document.getElementById("RealtimeSellChart")?.clientHeight ||
        document.getElementById("ThreeMonthSellChart")?.clientHeight ||
        500;

    const cols = Math.ceil(containerWidth / gap);
    const rows = Math.ceil(containerHeight / gap);

    // 循环生成多个水印文字
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            graphics.push({
                type: "text",
                left: j * gap + 30,
                top: i * gap + 30,
                style: {
                    text: text,
                    fontSize: 14,
                    fill: "rgba(0, 0, 0, 0.1)", // 设置文字颜色和透明度
                },
                rotation: Math.PI / 4, // 逆时针旋转 45 度
            });
        }
    }
    // // 添加网址
    // graphics.push({
    //     type: "text",
    //     // left: parseInt(chartWidth) *0.62,
    //     // top: parseInt(chartHeight) *0.01,
    //     left: "43%",
    //     top: 0,
    //     style: {
    //         text: "www.godeye.top",
    //         fontSize: 20,
    //         fill: "rgba(255, 0, 0, 0.9)",
    //     },
    // });
    // 添加公司名称水印 - 使用百分比定位
    graphics.push({
        type: "text",
        left: "50%", // 居中
        top: "50%", // 居中
        style: {
            text: "G o d e y e",
            fontSize: 56,
            fill: "rgba(0, 0, 0, 0.1)", // 设置文字颜色和透明度
            align: "center",
            verticalAlign: "middle",
        },
        rotation: 0,
    });

    return graphics;
};
