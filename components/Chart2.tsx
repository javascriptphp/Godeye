import { createChart, ColorType } from "lightweight-charts";
import React, { useEffect, useRef } from "react";

const Chart2 = () => {
    const initialData = [
        { time: "2018-12-22", value: 32.51 },
        { time: "2018-12-23", value: 31.11 },
        { time: "2018-12-24", value: 27.02 },
        { time: "2018-12-25", value: 27.32 },
        { time: "2018-12-26", value: 25.17 },
        { time: "2018-12-27", value: 28.89 },
        { time: "2018-12-28", value: 25.46 },
        { time: "2018-12-29", value: 23.92 },
        { time: "2018-12-30", value: 22.68 },
        { time: "2018-12-31", value: 22.67 },
    ];

    const backgroundColor = "white";
    const lineColor = "#2962FF";
    const textColor = "black";
    const areaTopColor = "#2962FF";
    const areaBottomColor = "rgba(41, 98, 255, 0.28)";

    const chartContainerRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: backgroundColor },
                textColor,
            },
            width: chartContainerRef.current.clientWidth,
            height: 300,
        });
        chartRef.current = chart;

        chart.timeScale().fitContent();

        const newSeries = chart.addAreaSeries({
            lineColor,
            topColor: areaTopColor,
            bottomColor: areaBottomColor,
        });
        newSeries.setData(initialData);

        const handleResize = () => {
            const containerWidth = chartContainerRef.current.clientWidth;
            chart.applyOptions({ width: containerWidth });
            chart.resize(containerWidth, 300, true); // 强制重绘图表
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            chart.remove();
        };
    }, [backgroundColor, textColor, lineColor, areaTopColor, areaBottomColor]);

    return (
        <div
            ref={chartContainerRef}
            style={{ position: "relative", width: "100%", height: "300px" }}
        />
    );
};

export default Chart2;
