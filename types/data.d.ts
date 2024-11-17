interface RealtimeData {
    timestamps: string[];
    metric: number[];
    threshold: number;
    threshold2?: number;
    open: number[];
    close: number[];
    high: number[];
    low: number[];
}

interface HistoricalData {
    timestamps: string[];
    price: number[];
    metric: number[];
    threshold: number;
}
