import {Typography} from "antd";
import {introductionWidth} from "@/utils/global_constant";
import {BUY} from "@/types";

const {Title, Paragraph, Text, Link} = Typography;

export const MetricIntroduction = ({metric}:{metric: string}) => {
	const title = metric === BUY ? "买入指标教程" : "卖出指标教程";
	const buy_tutorial = "当买入指标值小于绿色警戒线时可以开始逐步抄底。" +
		"有一种特殊情况需要注意：卖出指标优先级高于买入指标" +
		"即：如果买入指标小于绿色警戒线，但是卖出指标这时高于红色警戒线了，那么建议的操作是等卖出指标低于红色警戒线再进行抄底。";
	const sell_tutorial = "当卖出指标值第一次高于卖出警戒线时，说明下跌趋势即将到来。" +
		"BTC回调幅度至少是15%以上。山寨币回调幅度40%，50%，甚至80%都有可能。" +
		"原因是卖出指标值第一次高于卖出警戒线时，意味着市场中的杠杆非常高，除了312，519级别的腰斩式暴跌可以一天把杠杆完全清掉，其他每天5%以内的下跌不足以一天清除杠杆，所以下跌会持续一段时间。\n"
	const tutorial = metric === BUY ? buy_tutorial : sell_tutorial;
	return (
		<Typography style={{ width: introductionWidth, margin: 0 }}>
			<Title level={3} style={{ marginTop:0 }}>{title}</Title>

			<Paragraph>
				{tutorial}
			</Paragraph>
		</Typography>
	)
};