import {Typography} from "antd";
import {introductionWidth} from "@/utils/global_constant";
import {BUY} from "@/types";

const {Title, Paragraph, Text, Link} = Typography;

export const MetricIntroduction = ({metric}:{metric: string}) => {
	const title = metric === BUY ? "买入指标教程" : "卖出指标教程";
	const buy_tutorial = "当买入指标值小于绿色警戒线时可以开始逐步抄底。" +
		"有一种特殊情况需要注意：卖出指标优先级高于买入指标" +
		"即：如果买入指标小于绿色警戒线，但是卖出指标这时高于红色警戒线了，那么建议的操作是等卖出指标低于红色警戒线再进行抄底。";
	const sell_tutorial = "当卖出指标高于警戒值时，意味着市场上做多(加杠杆)的人达到极限，市场将会通过震荡或暴跌清理做多(加杠杆)的人，此时建议用户降低自己的杠杆，防止爆仓。"
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