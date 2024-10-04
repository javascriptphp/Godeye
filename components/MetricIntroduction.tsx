import {Typography} from "antd";
import {introductionWidth} from "@/utils/global_constant";
import {BUY} from "@/types";

const {Title, Paragraph, Text, Link} = Typography;

export const MetricIntroduction = ({metric}: { metric: string }) => {
	const title = metric === BUY ? "买入指标教程" : "卖出指标教程";
	const buy_tutorial = "当买入指标值小于绿色警戒线时可以开始逐步抄底。" +
		"有一种特殊情况需要注意：卖出指标优先级高于买入指标" +
		"即：如果买入指标小于绿色警戒线，但是卖出指标这时高于红色警戒线了，那么建议的操作是等卖出指标低于红色警戒线再进行抄底。";
	const sell_tutorial = "\n" +
		"当卖出指标高于警戒值时，意味着市场上做多(加杠杆)的人达到极限，市场将会通过震荡或暴跌清理做多(加杠杆)的人，此时建议用户降低自己的杠杆，防止爆仓。\n" +
		"\n" +
		"以下是我们多次实践总结的卖出指标教程:\n" +
		"\n" +
		"一般情况下，当卖出指标高于警戒值时，有可能立即下跌，也有可能再上涨一些然后下跌，但终归是会下跌的，下跌幅度一般为20%左右。(除非是专业的交易员并对本指标很熟悉，否则不要进行杠杆和合约交易)\n" +
		"另外卖出指标也可以用于买入，当卖出指标值低于30时可以逐渐买入，当指标值低于25时非常值得买入。"
	// const tutorial = metric === BUY ? buy_tutorial : sell_tutorial;
	const tutorials = {
		"buy": [
			{
				title: "买入指标教程",
				paragraphs: [
					"当买入指标值小于绿色警戒线时可以开始逐步抄底。有一种特殊情况需要注意：卖出指标优先级高于买入指标",
					"即：如果买入指标小于绿色警戒线，但是卖出指标这时高于红色警戒线了，那么建议的操作是等卖出指标低于红色警戒线再进行抄底。"
				]
			}
		],
		"sell": [
			{
				title: "卖出指标原理",
				paragraphs: [
					"当卖出指标高于警戒值时，意味着市场上做多(加杠杆)的人达到极限，市场将会通过震荡或暴跌清理做多(加杠杆)的人，此时建议用户降低自己的杠杆，防止爆仓。以下是我们多次实践总结的卖出指标教程:",
				]
			},

			{
				title: "卖出指标教程",
				paragraphs: [
					"一般情况下，当卖出指标高于警戒值时，有可能立即下跌，也有可能再上涨一些然后下跌，但终归是会下跌的，下跌幅度一般为20%左右。(除非是专业的交易员并对本指标很熟悉，否则不要进行杠杆和合约交易)",
					"另外卖出指标也可以用于买入，当卖出指标值低于30时可以逐渐买入，当指标值低于25时非常值得买入。"
				]
			}
		]
	} as {
		[key: string]: 
			{
				title: string,
				paragraphs: string[]
			}[]
		
	}
	return (
		<Typography style={{width: introductionWidth, margin: 0}}>
			{
				tutorials[metric].map((tutorial) => {
					return (
						<>
							<Title level={3} style={{marginTop: 0}}>{tutorial.title}</Title>
							{tutorial.paragraphs.map((paragraph, index) => (<Paragraph>{paragraph}</Paragraph>))}
						</>
					)
				})

			}

		</Typography>
	)
};