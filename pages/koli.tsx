import React, {useEffect, useState} from 'react';
import {Card, Col, Row} from 'antd';
import {TweetCard} from "@/components/koli/TweetCard";
import {getHistoricalData, getTweetPostData} from "@/service";
import {BTCPrice, MetricType, TweetPost} from "@/types";
import {formatTimestampToDate, formatTimestampToString} from "@/utils/time";
import {BitcoinChart} from "@/components/koli/BitcoinChart";
import {KoliFooter} from "@/components/koli/KoliFooter";
import {KoliHeader} from "@/components/koli/KoliHeader";
import {KoliPieChart} from "@/components/koli/KoliPieChart";

const user = "test";
export default function KOLIPage() {
	const [priceData, setPriceData] = useState<BTCPrice[]>([]);
	const [tweetData, setTweetData] = useState<TweetPost[]>([]);

	const fetchBtcPrice = async () => {
		const response: any = await getHistoricalData("BTC", MetricType.BUY);
		if (response && response.values && response.values.length > 0) {
			const formattedPriceData = response.values.map((item: any) => {
				return {
					timestamp: item.timestamp,
					price: item.price,
				}
			});
			setPriceData(formattedPriceData);
		}
	};
	const fetchTweetData = async () => {
		const data: any = await getTweetPostData(user);
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
		fetchBtcPrice().then(r => r);
		fetchTweetData().then(r => r);
	}, []);

	return (
		<div style={{padding: '20px 100px'}}>
			<KoliHeader/>
			
			<Card>
				<BitcoinChart prices={priceData} tweets={tweetData}/>
			</Card>

			<Row gutter={24} style={{marginTop: 24}}>
				<Col span={12}>
					<Card>
						<KoliPieChart data={tweetData.map((item: TweetPost) => item.sentiment)} type={'情感'}/>
					</Card>
				</Col>
				<Col span={12}>
					<Card>
						<KoliPieChart data={tweetData.flatMap((item: TweetPost) => item.keywords)} type={'关键词'}/>
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