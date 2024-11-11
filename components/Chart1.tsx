import React, { createRef, useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import * as echarts from "echarts";

const Chart1 = () => {
    const containerRef = useRef(null);
    useEffect(() => {
        var myChart = echarts.init(containerRef.current);
        var option;

        option = {
            xAxis: {
                data: ["2017-10-24", "2017-10-25", "2017-10-26", "2017-10-27"],
            },
            yAxis: {},
            series: [
                {
                    type: "candlestick",
                    data: [
                        [20, 34, 10, 38],
                        [40, 35, 30, 50],
                        [31, 38, 33, 44],
                        [38, 15, 5, 42],
                    ],
                },
            ],
        };
        myChart.setOption(option);

        return () => {
            myChart.dispose();
        };
    }, []);

    return (
        <div>
            <h3>Chart 1</h3>
            <div
                ref={containerRef}
                style={{ width: "600px", height: "400px" }}
            ></div>
        </div>
    );
};

export default Chart1;
