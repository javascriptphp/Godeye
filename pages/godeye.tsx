import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Tabs from '../components/Tabs';
import SidebarContent1 from '../components/SidebarContent1';
import SidebarContent2 from '../components/SidebarContent2';
import Chart1 from '../components/Chart1';
import Chart2 from '../components/Chart2';
import {ChartComponent} from "@/components/ChartComponent";

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

const TabsWrapper = styled.div`
    padding-top: 60px; /* 与Header的高度相同，避免内容被Header遮挡 */
`;

const MainContentWrapper = styled.div`
    display: flex;
    flex: 1;
`;

const SidebarContainer = styled.div`
    width: ${(props) => (props.collapsed ? '0' : '250px')}; /* 收缩时宽度为0 */
    padding: ${(props) => (props.collapsed ? '0' : '20px')}; /* 收缩时去除padding */
    background-color: #f5f5f5;
    border-right: ${(props) => (props.collapsed ? 'none' : '1px solid #ddd')}; /* 收缩时去除边框 */
    transition: width 0.3s ease, padding 0.3s ease, border-right 0.3s ease;
    overflow: hidden; /* 隐藏内容 */
`;


const MainContent = styled.div`
    flex: 1;
    padding: 20px;
    transition: margin-left 0.3s ease;
		min-height: 500px;
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
		{ label: 'BTC', sidebar: <SidebarContent1 />, content: <Chart1 /> },
		{ label: 'ETH', sidebar: null, content: <Chart2 /> },
		{ label: 'SOL', sidebar: null, content: <ChartComponent /> }, // 新增的Tab，没有Sidebar
	];

	const toggleSidebar = () => {
		setIsSidebarCollapsed(!isSidebarCollapsed);
	};
	
	return (
		<PageContainer>
			<Header />
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
