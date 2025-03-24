import React, {useEffect, useState} from 'react';
import {Card, Col, Row, Spin} from 'antd';
import {TweetCard} from "@/components/koli/TweetCard";
import {getHistoricalData, getTweetPostData} from "@/service";
import {BTCPrice, MetricType, TweetPost} from "@/types";
import {formatTimestampToDate, formatTimestampToString, nYearsBeforeNowTimestamp} from "@/utils/time";
import {BitcoinChart} from "@/components/koli/BitcoinChart";
import {KoliFooter} from "@/components/koli/KoliFooter";
import {KoliHeader} from "@/components/koli/KoliHeader";
import {KoliPieChart} from "@/components/koli/KoliPieChart";
import {useRouter} from "next/router";

const formatPriceData = (data: any): BTCPrice[] => {
	return data.map((item: any) => {
		return {
			timestamp: item.timestamp,
			price: item.price,
		}
	})
}
const KOLIPage : React.FC = () => {
	const router = useRouter();
	const { query } = router;
	// query 是一个对象，包含了所有的查询参数
	const { userName } = query;
	const user = userName as string || "DujunX";
	const [allPriceData, setAllPriceData] = useState<BTCPrice[]>([]);
	const [priceData, setPriceData] = useState<BTCPrice[]>([]);
	const [tweetData, setTweetData] = useState<TweetPost[]>([]);
	const [loading, setLoading] = useState(true);
	const endTimestamp = new Date().getTime(); // 获取当前时间
	const oneYearBeforeNowTimestamp = nYearsBeforeNowTimestamp(1);
	const [startTimestamp, setStartTimestamp] = useState(oneYearBeforeNowTimestamp);
	const twoYearBeforeNowTimestamp = nYearsBeforeNowTimestamp(2);
	const fiveYearBeforeNowTimestamp = nYearsBeforeNowTimestamp(5);
	const onSelectedDataRange = async (range: number) => {
		setLoading(true); // 开始加载
		if (range === -1) {
			setStartTimestamp(0);
		} else if (range === 1 || range === 2 || range === 5) {
			setStartTimestamp(nYearsBeforeNowTimestamp(range));
		}
		console.log(range)
		console.log(startTimestamp)
		await fetchTweetData();
		await fetchBtcPrice();
		console.log(priceData)
		console.log(tweetData)
		setLoading(false); // 结束加载
	};
	const fetchBtcPrice = async () => {
		const response: any = await getHistoricalData("BTC", MetricType.BUY);
		if (response && response.values && response.values.length > 0) {
			setAllPriceData(formatPriceData(response.values));
			// 过滤数据
			const filteredData = response.values.filter((item: any) => {
				return item.timestamp >= startTimestamp && item.timestamp <= endTimestamp;
			});
			setPriceData(formatPriceData(filteredData));
		}
	};
	// const processBtcPriceData = () => {
	// 	if (!allPriceData) return;
	// 	// 过滤数据
	// 	const filteredData = allPriceData.filter((item: any) => {
	// 		return item.timestamp >= startTimestamp && item.timestamp <= endTimestamp;
	// 	});
	// 	setPriceData(filteredData);
	// }
	const fetchTweetData = async () => {
		const data: any = await getTweetPostData(user, startTimestamp, endTimestamp);
		if (data && data.length > 0) {
			const formattedTweetData = data.map((item: any) => {
				return {
					id: item?.id,
					text: item?.text,
					sentiment: item?.sentiment,
					bookmarkCount: item?.bookmarkCount,
					likeCount: item?.likeCount,
					retweetCount: item?.retweetCount,
					replyCount: item?.replyCount,
					viewCount: item?.viewCount,
					createdAt: item?.createdAt,
					keywords: Array.of(item?.keywords),
					url: item?.url,
					twitterUrl: item?.twitterUrl,
					createTimeStamp: Date.parse(item?.createdAt),
					createDate: formatTimestampToDate(Date.parse(item?.createdAt)),
					createDateTime: formatTimestampToString(Date.parse(item?.createdAt)),
				} as TweetPost;
			});
			setTweetData(formattedTweetData);
		}
	};
	useEffect(() => {
		fetchBtcPrice().then(r => {
			fetchTweetData().then(r => {
				setLoading(false);
			});
		});
		
	}, []);

	return (
		<div style={{padding: '20px 100px'}}>
			<KoliHeader/>

			<Card>
				<div style={{position: 'relative'}}>
					{loading && (
						<div style={{
							position: 'absolute',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							background: 'radial-gradient(circle, rgba(20, 20, 20, 0.8), rgba(0, 0, 0, 0))', // 径向渐变
							backdropFilter: 'blur(8px)', // 高斯模糊效果
							WebkitBackdropFilter: 'blur(8px)', // 兼容 Safari
							zIndex: 1000,
						}}>
							<Spin size="large"/>
						</div>
					)}
					<BitcoinChart prices={priceData} tweets={tweetData} onSelectedRange={onSelectedDataRange}/>
				</div>
			</Card>

			<Row gutter={24} style={{marginTop: 24}}>
				<Col span={12}>
					<Card>
						<div style={{position: 'relative'}}>
							{loading && (
								<div style={{
									position: 'absolute',
									top: 0,
									left: 0,
									right: 0,
									bottom: 0,
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									background: 'radial-gradient(circle, rgba(20, 20, 20, 0.8), rgba(0, 0, 0, 0))', // 径向渐变
									backdropFilter: 'blur(8px)', // 高斯模糊效果
									WebkitBackdropFilter: 'blur(8px)', // 兼容 Safari
									zIndex: 1000,
								}}>
									<Spin size="large"/>
								</div>
							)}
							<KoliPieChart data={tweetData.map((item: TweetPost) => item.sentiment)} type={'情感'}/>
						</div>
					</Card>
				</Col>
				<Col span={12}>
					<Card>
						<div style={{position: 'relative'}}>
							{loading && (
								<div style={{
									position: 'absolute',
									top: 0,
									left: 0,
									right: 0,
									bottom: 0,
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									background: 'radial-gradient(circle, rgba(20, 20, 20, 0.8), rgba(0, 0, 0, 0))', // 径向渐变
									backdropFilter: 'blur(8px)', // 高斯模糊效果
									WebkitBackdropFilter: 'blur(8px)', // 兼容 Safari
									zIndex: 1000,
								}}>
									<Spin size="large"/>
								</div>
							)}
							<KoliPieChart data={tweetData.flatMap((item: TweetPost) => item.keywords)} type={'关键词'}/>
						</div>
					</Card>
				</Col>
			</Row>

			{/*<Card style={{marginTop: 24}}>*/}
			{/*	<TweetCard/>*/}
			{/*</Card>*/}

			<KoliFooter/>
		</div>
	)
}
export default KOLIPage;