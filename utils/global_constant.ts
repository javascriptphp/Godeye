import * as echarts from "echarts";
import { EChartsOption } from "echarts";
import React from "react";

export const sidebarWidth = "200px";
export const chartWidth = "1100px";
export const chartHeight = "700px";
export const introductionWidth = (2 * parseInt(chartWidth)) / 3;
export const footerText = `\u00A9 2024 Godeye Ltd. All rights reserved.`;
export const downColor = "#ec0000";
export const downBorderColor = "#8A0000";
export const upColor = "#00da3c";
export const upBorderColor = "#008F28";
export const buyAreaColor = "#d2f9df";
export const sellAreaColor = "#f9d2df";

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

    // 计算行和列
    const cols = Math.ceil(parseInt(chartWidth) / gap);
    const rows = Math.ceil(parseInt(chartHeight) / gap);

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
    // 添加网址
    graphics.push({
        type: "text",
        // left: parseInt(chartWidth) *0.62,
        // top: parseInt(chartHeight) *0.01,
        left: "43%",
        top: 0,
        style: {
            text: "www.godeye.top",
            fontSize: 20,
            fill: "rgba(255, 0, 0, 0.9)",
        },
    });
    // 添加公司名称水印
    graphics.push({
        type: "text",
        left: parseInt(chartWidth) * 0.37,
        top: parseInt(chartHeight) * 0.42,
        style: {
            text: "G o d e y e",
            fontSize: 56,
            fill: "rgba(0, 0, 0, 0.1)", // 设置文字颜色和透明度
        },
        rotation: 0, // 逆时针旋转 45 度
    });

    return graphics;
};
