import React, {useEffect, useState} from 'react';
import {Card, Col, Flex, Radio, Row, Spin} from 'antd';
import {getHistoricalData, getTweetPostData} from "@/service";
import {BTCPrice, DataRange, MetricType, TweetPost} from "@/types";
import {formatTimestampToDate, formatTimestampToString, nYearsBeforeNowTimestamp} from "@/utils/time";
import {BitcoinChart} from "@/components/koli/BitcoinChart";
import {KoliFooter} from "@/components/koli/KoliFooter";
import {KoliHeader} from "@/components/koli/KoliHeader";
import {KoliPieChart} from "@/components/koli/KoliPieChart";
import {useRouter} from "next/router";
import {GetServerSidePropsContext} from "next";

const formatPriceData = (data: any): BTCPrice[] => {
	return data.map((item: any) => {
		return {
			timestamp: item.timestamp,
			price: item.price,
		}
	})
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { query } = context;
	console.log(query);
	// 确保 query 存在，并安全解构 userName 和 displayName
	if (!query || (!('userName' in query) && !('displayName' in query))) {
		return {
			props: {}
		};
	}
	const { userName, displayName } = query;

	// 检查 userName 和 displayName 是否同时存在或同时不存在
	const hasUserName = !!userName;
	const hasDisplayName = !!displayName;

	if (hasUserName !== hasDisplayName) {
		// 如果两者状态不一致，返回 404
		return {
			notFound: true,
		};
	}

	// 如果参数存在，继续渲染页面
	return {
		props: {
			userName,
			displayName,
		},
	};
}

const KOLIPage : React.FC = () => {
	const { query } = useRouter();
	// query 是一个对象，包含了所有的查询参数
	const [userName, setUserName] = useState<string>("");
	const [displayName, setDisplayName] = useState<string>("");
	const [allPriceData, setAllPriceData] = useState<BTCPrice[]>([]);
	const [priceData, setPriceData] = useState<BTCPrice[]>([]);
	const [tweetData, setTweetData] = useState<TweetPost[]>([]);
	const [loading, setLoading] = useState(true);
	const endTimestamp = new Date().getTime(); // 获取当前时间
	const oneYearBeforeNowTimestamp = nYearsBeforeNowTimestamp(1);
	const [startTimestamp, setStartTimestamp] = useState(oneYearBeforeNowTimestamp);
	const [dataRange, setDataRange] = useState<DataRange>(DataRange.ONE_YEAR); // 默认显示全部数据

	const handleRangeChange = async (dataRange: DataRange) => {
		setDataRange(dataRange);
		const range = dataRange.nYearsBefore;
		// 这里可以根据range参数重新请求数据
		setLoading(true); // 开始加载
		if (range === -1) {
			setStartTimestamp(0);
		} else if (range === 1 || range === 2 || range === 5) {
			setStartTimestamp(nYearsBeforeNowTimestamp(range));
		}
	};
	const onUpdateFinished = () => {
		setLoading(false);
	};
	
	useEffect(() => {
		console.log("当前时间戳："+formatTimestampToString(startTimestamp));
		fetchTweetData().then(r => r);
		processBtcPriceData();
	}, [startTimestamp]);
	
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
	const processBtcPriceData = () => {
		if (!allPriceData) return;
		// 过滤数据
		const filteredData = allPriceData.filter((item: any) => {
			return item.timestamp >= startTimestamp && item.timestamp <= endTimestamp;
		});
		setPriceData(filteredData);
	}
	const fetchTweetData = async () => {
		const data: any = await getTweetPostData(userName, startTimestamp, endTimestamp);
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
					keywords: item?.keywords,
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
		if (Object.keys(query).length > 0) {
			setUserName(query["userName"] as string);
			setDisplayName(query["displayName"] as string);
		}else{
			setUserName("DujunX");
			setDisplayName("Du Jun");
		}
	}, [query]);
	useEffect(() => {
		if (!userName || !displayName) return;
		fetchBtcPrice().then(r => {
			fetchTweetData().then(r => {
				setLoading(false);
			});
		});
		
	}, [userName,displayName]);

	return (
		<div style={{padding: '20px 100px'}}>
			<KoliHeader nick={displayName}/>

			<Card>
				<Flex justify="center" style={{ marginBottom: 16 }}>
					<Radio.Group
						value={dataRange}
						onChange={async (e) => await handleRangeChange(e.target.value)}
						buttonStyle="solid"
						disabled={loading}
					>
						<Radio.Button value={DataRange.ONE_YEAR}>{DataRange.ONE_YEAR.showText['zh']}</Radio.Button>
						<Radio.Button value={DataRange.TWO_YEARS}>{DataRange.TWO_YEARS.showText['zh']}</Radio.Button>
						<Radio.Button value={DataRange.FIVE_YEARS}>{DataRange.FIVE_YEARS.showText['zh']}</Radio.Button>
						<Radio.Button value={DataRange.ALL}>{DataRange.ALL.showText['zh']}</Radio.Button>
					</Radio.Group>
				</Flex>
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
					<BitcoinChart prices={priceData} tweets={tweetData} onUpdateFinished={onUpdateFinished}/>
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