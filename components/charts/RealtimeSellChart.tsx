import React, { useState, useEffect } from "react";
import * as echarts from "echarts";
import { EChartsOption } from "echarts";
import { chartHeight, chartWidth } from "@/utils/global_constant";
import { useTranslation } from "react-i18next";
import GlobalFunctions from "@/utils/global_functions";
import { buildCustomConfig } from "@/configs/realtimeSell";
import useStore from "@/utils/store";
import useWebSocket from "react-use-websocket";
import { getRealtimeDataUrl } from "@/service";
import { RealtimeResponse, RealtimeSellData, SELL } from "@/types";
import { formatTimestampToString } from "@/utils/time";

interface RealtimeSellItem {
    timestamps: string[];
    metric: number[];
    threshold: number[];
    price: any[];
}

const initialRealtimeData: RealtimeSellItem = {
    timestamps: [],
    metric: [],
    threshold: [],
    price: [],
};

const RealtimeSellChart = ({
    metric,
    symbol,
}: {
    metric: string;
    symbol: string;
}) => {
    const [realtimeData, setRealtimeData] =
        useState<RealtimeSellItem>(initialRealtimeData);
    const { t } = useTranslation();
    const Functions = GlobalFunctions(t);
    const { getUserContext } = useStore();
    const userContext = getUserContext();
    const [url, setUrl] = useState<string>("");
    const { lastMessage } = useWebSocket(url, {
        onOpen: () => console.log("Connected to WebSocket for Sell Chart"),
        reconnectInterval: 5000,
        reconnectAttempts: 5,
        shouldReconnect: () => !!url,
    });

    useEffect(() => {
        initData();
        fetchData();
    }, [metric, symbol, userContext]);

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
                id="RealtimeSellChart"
                style={{ width: chartWidth, height: chartHeight }}
            />
        );
    };

    const initData = () => {
        setRealtimeData(initialRealtimeData);
    };

    const fetchData = async () => {
        try {
            const websocketUrl = await getRealtimeDataUrl(metric, symbol);
            if (websocketUrl) {
                setUrl(websocketUrl);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const processData = (lastMessage: RealtimeResponse) => {
        if (lastMessage.code !== 200 || !lastMessage.data) return;
        console.log(lastMessage);

        const data = lastMessage.data as RealtimeSellData[];
        const updatedData: RealtimeSellItem = {
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
        setRealtimeData((prev) => ({
            timestamps: [...prev.timestamps, ...updatedData.timestamps],
            metric: [...prev.metric, ...updatedData.metric],
            threshold: [...prev.threshold, ...updatedData.threshold],
            price: [...prev.price, ...updatedData.price],
        }));
    };

    const buildChart = () => {
        const _option = Functions.buildOptionForSellChart({
            title: t("t3Title"),
            symbol: symbol,
            metric: SELL,
            timestamps: realtimeData.timestamps,
            threshold: realtimeData.threshold,
            metricData: realtimeData.metric,
            priceData: realtimeData.price,
            watermark: (userContext && userContext.email) || t("watermarkText"),
            includeMark: false,
            kLine: t("text_5minK"),
        });

        const echartsOption = {
            ..._option,
            ...buildCustomConfig({
                symbol,
            }),
        } as EChartsOption;

        const chartDom = document.getElementById("RealtimeSellChart");
        const myChart = echarts.init(chartDom);
        echartsOption && myChart.setOption(echartsOption);
    };

    return render();
};

export default RealtimeSellChart;
