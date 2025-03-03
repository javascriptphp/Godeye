import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

interface ChartProps {
    dates: string[];
    deposits: number[];
    withdrawals: number[];
    prices: number[];
}

const DepositWithdrawalChart: React.FC<ChartProps> = ({
    dates,
    deposits,
    withdrawals,
    prices,
}) => {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chartRef.current) {
            const chart = echarts.init(chartRef.current);

            const options = {
                // title: {
                //     text: "Price relation with Deposits & Withdrawals",
                //     left: "center",
                // },
                tooltip: {
                    trigger: "axis",
                    axisPointer: { type: "shadow" },
                },
                legend: {
                    data: ["Deposit", "Withdrawals", "Price"],
                    top: "6%",
                },
                grid: {
                    left: "5%",
                    right: "5%",
                    bottom: "15%",
                    containLabel: true,
                },
                xAxis: [
                    {
                        type: "category",
                        data: dates,
                    },
                ],
                yAxis: [
                    {
                        type: "value",
                        name: "Volume",
                        position: "left",
                    },
                    {
                        type: "value",
                        name: "Price",
                        position: "right",
                        splitLine: { show: false },
                    },
                ],
                dataZoom: [
                    {
                        type: "slider",
                        show: true,
                        xAxisIndex: 0,
                        start: 0,
                        end: 100,
                        height: 20,
                        bottom: "5%",
                    },
                ],
                series: [
                    {
                        name: "Deposit",
                        type: "bar",
                        data: deposits,
                        itemStyle: { color: "#4caf50" },
                    },
                    {
                        name: "Withdrawals",
                        type: "bar",
                        data: withdrawals,
                        itemStyle: { color: "#f44336" },
                    },
                    {
                        name: "Price",
                        type: "line",
                        yAxisIndex: 1,
                        data: prices,
                        itemStyle: { color: "#2196f3" },
                        smooth: true,
                    },
                ],
            };

            chart.setOption(options);

            return () => {
                chart.dispose();
            };
        }
    }, [dates, deposits, withdrawals, prices]);

    return (
        <div
            ref={chartRef}
            style={{ width: "100%", height: "500px" }}
            className="chart-container"
        />
    );
};

export default DepositWithdrawalChart;
