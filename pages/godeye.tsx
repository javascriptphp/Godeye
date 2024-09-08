import React, { useState } from 'react';
import styled from 'styled-components';
import RichHeader from '../components/RichHeader';
import Tabs from '../components/Tabs';
import SidebarContent1 from '../components/SidebarContent1';
import SidebarContent2 from '../components/SidebarContent2';
import Chart1 from '../components/Chart1';
import Chart2 from '../components/Chart2';
import {ChartComponent} from "@/components/ChartComponent";
import RealtimeChart from "@/components/charts/RealtimeChart";
import ThreeMonthHistoricalChart from "@/components/charts/ThreeMonthHistoricalChart";
import BARealtimeChart from "@/components/charts/BARealtimeChart";
const MainContentWrapper = styled.div`
    display: flex;
    flex: 1;
    width: 100%; /* 确保整个布局占满页面宽度 */
`;

const SidebarContainer = styled.div`
    width: ${(props) => (props.collapsed ? '0' : '100px')}; /* 固定 Sidebar 宽度 */
    padding: ${(props) => (props.collapsed ? '0' : '15px')};
    background-color: #f5f5f5;
    border-right: ${(props) => (props.collapsed ? 'none' : '1px solid #ddd')};
    transition: width 0.3s ease, padding 0.3s ease, border-right 0.3s ease;
    overflow: hidden;
    flex-shrink: 0; /* 禁止 Sidebar 缩放 */
`;

const MainContent = styled.div`
    flex: 1; /* 使主内容区域填充剩余空间 */
    padding: 20px;
    transition: margin-left 0.3s ease;
    min-height: 500px;
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
		{ label: 'BTC', sidebar: <SidebarContent1 />, content: <ThreeMonthHistoricalChart symbol={"BTC"} /> },
		{ label: 'ETH', sidebar: null, content: <RealtimeChart metric={'buy'} symbol={"BTC"} /> },
		{ label: 'SOL', sidebar: null, content: <ChartComponent /> }, // 新增的Tab，没有Sidebar
		{ label: '币安', sidebar: null, content: <BARealtimeChart metric={'buy'} symbol={"BTC"} /> }, // 新增的Tab，没有Sidebar
	];

	const toggleSidebar = () => {
		setIsSidebarCollapsed(!isSidebarCollapsed);
	};
	
	return (
		<PageContainer>
			<RichHeader />
			<TabsWrapper>
				<Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
			</TabsWrapper>
			<MainContentWrapper>
				{tabs[activeTab].sidebar && (
					<SidebarContainer collapsed={isSidebarCollapsed}>
						{tabs[activeTab].sidebar}
					</SidebarContainer>
				)}
				<MainContent>
					{tabs[activeTab].sidebar && (
						<ToggleButton onClick={toggleSidebar}>
							{isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
						</ToggleButton>
					)}
					{tabs[activeTab].content}
				</MainContent>
			</MainContentWrapper>
			<Footer>
				© 2024 Godeye Ltd. All rights reserved.
			</Footer>
		</PageContainer>
	);
};
export default GodeyeIndexPage;
