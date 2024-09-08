export type ThreeMonthResponse = {
	message?: string;
	data: ThreeMonthBuyData | ThreeMonthSellData;
};
export type ThreeMonthBuyData = {
	buy: BaseMetric[];
	buy_threshold: number;
};
export type ThreeMonthSellData = {
	sell: BaseMetric[];
	sell_threshold: number;
};
export type BaseMetric = {
	metric_value: number;
	price: number;
	timestamp: Date;
}
export type RealtimeDataResponse = {
	message?: string;
	websocket_url?: string;
}
export type RealtimeData = {
	timestamp: Date;
	symbol: string;
	price: number;
	metric: string;
	metric_value: number;
	threshold: number;
}
export type BARealtimeData = {
	e: string,
	E: Date,
	s: string,
	k: {
		t: Date,
		T: Date,
		s: string,
		i: string,
		o: string,
	}
}