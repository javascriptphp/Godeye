import React, { useState, useEffect } from "react";
import * as echarts from "echarts";
import { EChartsOption } from "echarts";
import { chartHeight, chartWidth } from "@/utils/global_constant";
import { useTranslation } from "react-i18next";
import GlobalFunctions from "@/utils/global_functions";
import { buildCustomConfig } from "@/configs/realtimeBuy";
import useStore from "@/utils/store";
import useWebSocket from "react-use-websocket";
import { getRealtimeDataUrl } from "@/service";
import { BUY } from "@/types";
import { formatTimestampToString } from "@/utils/time";

const initialRealtimeData: RealtimeData = {
    timestamps: [],
    metric: [],
    threshold: 0,
    threshold2: undefined,
    open: [],
    close: [],
    high: [],
    low: [],
};

const RealtimeBuyChart = ({
    metric,
    symbol,
}: {
    metric: string;
    symbol: string;
}) => {
    const [realtimeData, setRealtimeData] =
        useState<RealtimeData>(initialRealtimeData);
    const { t } = useTranslation();
    const Functions = GlobalFunctions(t);
    const { getUserContext } = useStore();
    const userContext = getUserContext();
    const [url, setUrl] = useState<string>("");
    const { lastMessage } = useWebSocket(url, {
        onOpen: () => console.log("Connected to WebSocket"),
        reconnectInterval: 5000,
        reconnectAttempts: 5,
        shouldReconnect: () => !!url,
    });

    useEffect(() => {
        initData();
        fetchData();
    }, [metric, symbol]);

    useEffect(() => {
        if (lastMessage) {
            const response = JSON.parse(lastMessage.data);
            processData(response);
        }
    }, [lastMessage]);

    useEffect(() => {
        buildChart();
    }, [realtimeData]);

    const render = () => {
        return (
            <div
                id="RealtimeBuyChart"
                style={{ width: chartWidth, height: chartHeight }}
            />
        );
    };

    const initData = () => {
        setRealtimeData(initialRealtimeData);
    };

    const fetchData = async () => {
        try {
            const websocketUrl = await getRealtimeDataUrl(metric, symbol, "v2");
            if (websocketUrl) {
                setUrl(websocketUrl);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const processData = (lastMessage: any) => {
        const data = lastMessage.data;
        const updatedData: RealtimeData = {
            timestamps: data.map((item: any) =>
                formatTimestampToString(item.timestamp)
            ),
            metric: data.map((item: any) => item.metric_value),
            threshold: data[0].threshold,
            threshold2: data[0].threshold2,
            open: data.map((item: any) => item.open),
            close: data.map((item: any) => item.close),
            high: data.map((item: any) => item.high),
            low: data.map((item: any) => item.low),
        };
        setRealtimeData((prev) => {
            return {
                timestamps: [...prev.timestamps, ...updatedData.timestamps],
                metric: [...prev.metric, ...updatedData.metric],
                threshold: updatedData.threshold,
                threshold2: updatedData.threshold2,
                open: [...prev.open, ...updatedData.open],
                close: [...prev.close, ...updatedData.close],
                high: [...prev.high, ...updatedData.high],
                low: [...prev.low, ...updatedData.low],
            };
        });
    };

    const buildChart = () => {
        const _option = Functions.buildOptionForBuyChart({
            title: t("t3Title_hourly"),
            symbol: symbol,
            metric: BUY,
            timestamps: realtimeData.timestamps,
            threshold: realtimeData.threshold,
            metricData: realtimeData.metric,
            priceData: realtimeData.open,
            watermark: (userContext && userContext.email) || t("watermarkText"),
            includeMark: false,
        });
        const echartsOption = {
            ..._option,
            ...buildCustomConfig({
                symbol,
                data: realtimeData,
                t,
            }),
        } as EChartsOption;

        const chartDom = document.getElementById("RealtimeBuyChart");
        const myChart = echarts.init(chartDom);
        echartsOption && myChart.setOption(echartsOption);
    };

    return render();
};

export default RealtimeBuyChart;
