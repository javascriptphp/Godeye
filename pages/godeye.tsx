import React, {useState} from 'react';
import styled from 'styled-components';
import RichHeader from '../components/RichHeader';
import RealtimeChart from "@/components/charts/RealtimeChart";
import ThreeMonthChart from "@/components/charts/ThreeMonthChart";
import BARealtimeChart from "@/components/charts/BARealtimeChart";
import Sidebar from "@/components/Sidebar";
import {MetricIntroduction} from "@/components/MetricIntroduction";
import {Flex} from "antd";
import Tabs from "@/components/Tabs";

const MainContentWrapper = styled.div`
    margin-top: 50px;
    margin-left: 200px;
`;
const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

const TabsWrapper = styled.div`
    padding-top: 60px; /* 与Header的高度相同，避免内容被Header遮挡 */
`;

const ToggleButton = styled.button`
    margin-bottom: 20px;
    padding: 8px 16px;
    background-color: #0070f3;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    align-self: flex-start;
`;
const Footer = styled.footer`
    padding: 10px 20px;
    background-color: #f5f5f5;
    text-align: center;
    border-top: 1px solid #ddd;
    font-size: 14px;
`;
const GodeyeIndexPage = () => {
	const [activeTab, setActiveTab] = useState(0);
	const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

	const tabs = [
		{
			label: '核心指标',
			sidebar: <Sidebar/>,
			content: <div><ThreeMonthChart symbol={"BTC"} metric={"buy"}/> <ThreeMonthChart symbol={"BTC"} metric={"buy"}/>
			</div>
		},
		{label: '免费指标', sidebar: <Sidebar/>, content: <BARealtimeChart metric={'buy'} symbol={"BTC"}/>},
		{label: 'Test', sidebar: <Sidebar/>, content: <RealtimeChart metric={'buy'} symbol={"BTC"}/>},
	];

	const toggleSidebar = () => {
		setIsSidebarCollapsed(!isSidebarCollapsed);
	};

	return (
		<PageContainer>
			<RichHeader/>
			<TabsWrapper>
				{/*<Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />*/}
			</TabsWrapper>
			{tabs[activeTab].sidebar}
			<MainContentWrapper>
				<Flex justify={"center"} align={"center"} vertical={true}>
					{tabs[activeTab].content}
					<MetricIntroduction/>
				</Flex>
				<Footer>
					© 2024 Godeye Ltd. All rights reserved.
				</Footer>
			</MainContentWrapper>
		</PageContainer>
	);
};
export default GodeyeIndexPage;
