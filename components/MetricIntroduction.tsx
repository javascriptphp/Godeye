import {Typography} from "antd";
import {introductionWidth} from "@/utils/global_constant";

const {Title, Paragraph, Text, Link} = Typography;

export const MetricIntroduction = () => {
	return (
		<Typography style={{ width: introductionWidth }}>
			<Title>Introduction</Title>

			<Paragraph>
				In the process of internal desktop applications development, many different design specs and
				implementations would be involved, which might cause designers and developers difficulties and
				duplication and reduce the efficiency of development.
			</Paragraph>
		</Typography>
	)
};