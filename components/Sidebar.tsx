import React, { useState } from 'react';
import { Layout, Menu, Radio } from 'antd';
import { sidebarWidth } from "@/utils/global_constant";

const { Sider } = Layout;
const { SubMenu } = Menu;

const siderStyle: React.CSSProperties = {
	overflow: 'hidden',  // 禁止整个 Sider 滚动
	height: '100vh',
	position: 'fixed',
	insetInlineStart: 0,
	top: 0,  // 从顶部开始布局
	bottom: 0,
	marginTop: '80px',
};
const scrollStyle: React.CSSProperties = {
	scrollbarWidth: 'thin',
	scrollbarColor: 'unset',
	overflowY: 'auto', 
	height: 'calc(100vh - 72px)'
}

const Sidebar = () => {
	// 定义按钮组状态来控制显示的菜单
	const [selectedGroup, setSelectedGroup] = useState('group1');

	// 不同按钮组对应的数据
	const dataGroup1 = [
		{
			symbol: 'BTC',
			metrics: ['买入指标', '卖出指标']
		},
		{
			symbol: 'ETH',
			metrics: ['买入指标', '卖出指标']
		},
		{
			symbol: 'SOL',
			metrics: ['买入指标', '卖出指标']
		},
		{
			symbol: 'ABC',
			metrics: ['买入指标', '卖出指标']
		},
		{
			symbol: 'BTC',
			metrics: ['买入指标', '卖出指标']
		},
		{
			symbol: 'ETH',
			metrics: ['买入指标', '卖出指标']
		},
		{
			symbol: 'SOL',
			metrics: ['买入指标', '卖出指标']
		},
		{
			symbol: 'ABC',
			metrics: ['买入指标', '卖出指标']
		},
		{
			symbol: 'BTC',
			metrics: ['买入指标', '卖出指标']
		},
		{
			symbol: 'ETH',
			metrics: ['买入指标', '卖出指标']
		},
		{
			symbol: 'SOL',
			metrics: ['买入指标', '卖出指标']
		},
		{
			symbol: 'ABC',
			metrics: ['买入指标', '卖出指标']
		},
		{
			symbol: 'BTC',
			metrics: ['买入指标', '卖出指标']
		},
		{
			symbol: 'ETH',
			metrics: ['买入指标', '卖出指标']
		},
		{
			symbol: 'SOL',
			metrics: ['买入指标', '卖出指标']
		},
		{
			symbol: 'ABC',
			metrics: ['买入指标', '卖出指标']
		},
		{
			symbol: 'BTC',
			metrics: ['买入指标', '卖出指标']
		},
		{
			symbol: 'ETH',
			metrics: ['买入指标', '卖出指标']
		},
		{
			symbol: 'SOL',
			metrics: ['买入指标', '卖出指标']
		},
		{
			symbol: 'ABC',
			metrics: ['买入指标', '卖出指标']
		},
	];

	const dataGroup2 = [
		{
			symbol: 'LTC',
			metrics: ['买入建议', '卖出建议']
		},
		{
			symbol: 'XRP',
			metrics: ['买入建议', '卖出建议']
		},
		{
			symbol: 'DOGE',
			metrics: ['买入建议', '卖出建议']
		},
		{
			symbol: 'BNB',
			metrics: ['买入建议', '卖出建议']
		},
	];

	// 根据 selectedGroup 的值选择要渲染的菜单数据
	const data = selectedGroup === 'group1' ? dataGroup1 : dataGroup2;

	return (
		<Sider
			width={sidebarWidth}
			style={siderStyle}
		>
			{/* 顶部按钮组 */}
			<div
				style={{
					padding: 10,
					position: 'sticky',  // 保持按钮组在顶部
					top: 0,
					backgroundColor: '#fff',  // 背景颜色，避免被覆盖
					zIndex: 10,
				}}
			>
				<Radio.Group
					value={selectedGroup}
					onChange={(e) => setSelectedGroup(e.target.value)}
					buttonStyle="solid"
				>
					<Radio.Button value="group1">核心指标</Radio.Button>
					<Radio.Button value="group2">免费指标</Radio.Button>
				</Radio.Group>
			</div>

			{/* 可滚动的菜单区域 */}
			<div style={scrollStyle}>
				<Menu
					mode="inline"
					defaultSelectedKeys={['metrics_0_0']}
					defaultOpenKeys={['symbol_0']}
					style={{ height: '100%', borderRight: 0 }}
				>
					{data.map((symbolValue, symbolIndex) => (
						<SubMenu key={'symbol_' + symbolIndex} title={symbolValue.symbol}>
							{symbolValue.metrics.map((metricValue, metricIndex) => (
								<Menu.Item key={'metrics_' + symbolIndex + '_' + metricIndex}>
									{metricValue}
								</Menu.Item>
							))}
						</SubMenu>
					))}
				</Menu>
			</div>
		</Sider>
	);
};

export default Sidebar;
