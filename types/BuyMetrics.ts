export type ThreeMonthResponse = {
	message?: string;
	data: ThreeMonthData;
};
export type ThreeMonthData = {
	buy: BaseMetric[];
	buy_threshold: number;
	sell: BaseMetric[];
	sell_threshold: number;
};
export type BaseMetric = {
	metric_value: number;
	price: number;
	timestamp: Date;
}