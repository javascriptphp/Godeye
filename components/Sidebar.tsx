import React, {useState} from 'react';
import {Layout, Menu, Radio, RadioChangeEvent} from 'antd';
import {sidebarWidth} from "@/utils/global_constant";
import {MetricTypeEnum, SymbolAndMetric} from "@/types";

const { Sider } = Layout;
const { SubMenu } = Menu;

const siderStyle: React.CSSProperties = {
	overflow: 'hidden',  // 禁止整个 Sider 滚动
	height: '100vh',
	position: 'fixed',
	top: 0,  // 从顶部开始布局
	bottom: 0,
	marginTop: '100px',
};
const scrollStyle: React.CSSProperties = {
	scrollbarWidth: 'thin',
	scrollbarColor: 'unset',
	overflowY: 'auto', 
	height: 'calc(100vh - 72px)'
}

const Sidebar = ({symbolToggledHandler} : {symbolToggledHandler: (type: SymbolAndMetric) => void}) => {
	// 定义按钮组状态来控制显示的菜单
	const [selectedGroup, setSelectedGroup] = useState<MetricTypeEnum>(MetricTypeEnum.free);

	// 不同按钮组对应的数据
	const freeMetrics = [
		{
			symbol: 'BTC',
			metrics: [
				{
					key: 'buy',
					metric: '买入指标'
				},
				{
					key: 'sell',
					metric: '卖出指标'
				}
				]
		},
		{
			symbol: 'ETH',
			metrics: [
				{
					key: 'buy',
					metric: '买入指标'
				},
				// {
				// 	key: 'sell',
				// 	metric: '卖出指标'
				// }
				]
		},
		{
			symbol: 'SOL',
			metrics: [
				{
					key: 'buy',
					metric: '买入指标'
				},
				// {
				// 	key: 'sell',
				// 	metric: '卖出指标'
				// }
				]
		},
		{
			symbol: 'OP',
			metrics: [
				{
					key: 'buy',
					metric: '买入指标'
				},
				// {
				// 	key: 'sell',
				// 	metric: '卖出指标'
				// }
				]
		},
		{
			symbol: 'PEPE',
			metrics: [
				{
					key: 'buy',
					metric: '买入指标'
				},
				// {
				// 	key: 'sell',
				// 	metric: '卖出指标'
				// }
				]
		},
		{
			symbol: 'WIF',
			metrics: [
				{
					key: 'buy',
					metric: '买入指标'
				},
				// {
				// 	key: 'sell',
				// 	metric: '卖出指标'
				// }
				]
		},
		{
			symbol: 'FLOKI',
			metrics: [
				{
					key: 'buy',
					metric: '买入指标'
				},
				// {
				// 	key: 'sell',
				// 	metric: '卖出指标'
				// }
				]
		},
		{
			symbol: 'SUI',
			metrics: [
				{
					key: 'buy',
					metric: '买入指标'
				},
				// {
				// 	key: 'sell',
				// 	metric: '卖出指标'
				// }
				]
		},
		{
			symbol: 'SEI',
			metrics: [
				{
					key: 'buy',
					metric: '买入指标'
				},
				// {
				// 	key: 'sell',
				// 	metric: '卖出指标'
				// }
				]
		},
		{
			symbol: 'FTM',
			metrics: [
				{
					key: 'buy',
					metric: '买入指标'
				},
				// {
				// 	key: 'sell',
				// 	metric: '卖出指标'
				// }
				]
		},
		{
			symbol: 'AR',
			metrics: [
				{
					key: 'buy',
					metric: '买入指标'
				},
				// {
				// 	key: 'sell',
				// 	metric: '卖出指标'
				// }
				]
		},
		{
			symbol: 'ARKM',
			metrics: [
				{
					key: 'buy',
					metric: '买入指标'
				},
				// {
				// 	key: 'sell',
				// 	metric: '卖出指标'
				// }
				]
		},
		{
			symbol: 'WLD',
			metrics: [
				{
					key: 'buy',
					metric: '买入指标'
				},
				// {
				// 	key: 'sell',
				// 	metric: '卖出指标'
				// }
				]
		},
	];
	const payMetrics = [
		{
			symbol: 'BTC',
			metrics: [
				{
					key: 'buy',
					metric: '买入指标'
				},
				{
					key: 'sell',
					metric: '卖出指标'
				}
			]
		},
		{
			symbol: 'ETH',
			metrics: [
				{
					key: 'buy',
					metric: '买入指标'
				},
				{
					key: 'sell',
					metric: '卖出指标'
				}
			]
		},
		{
			symbol: 'SOL',
			metrics: [
				{
					key: 'buy',
					metric: '买入指标'
				},
				{
					key: 'sell',
					metric: '卖出指标'
				}
			]
		},
		{
			symbol: 'OP',
			metrics: [
				{
					key: 'buy',
					metric: '买入指标'
				},
				{
					key: 'sell',
					metric: '卖出指标'
				}
			]
		},
	];

	const [currentSymbol, setCurrentSymbol] = useState<string>(freeMetrics[0].symbol);
	const [currentMetric, setCurrentMetric] = useState<string>(freeMetrics[0].metrics[0].metric);
	// 根据 selectedGroup 的值选择要渲染的菜单数据
	const data = selectedGroup === MetricTypeEnum.free ? freeMetrics : payMetrics;

	const metricTypeToggled = (e: RadioChangeEvent) => {
		setSelectedGroup(e.target.value);
	}
	const symbolToggled = (symbol: string, metric: string) => {
		if (symbol !== currentSymbol || metric !== currentMetric) {
			symbolToggledHandler({symbol, metric});
			setCurrentSymbol(symbol);
			setCurrentMetric(metric);
		}
	};
	return (
		<Sider
			width={sidebarWidth}
			style={siderStyle}
		>
			{/* 顶部按钮组 */}
				<Radio.Group
					value={selectedGroup}
					onChange={(e) => metricTypeToggled(e)}
					buttonStyle="solid"
					style={{
						padding: 10,
						position: 'sticky',  // 保持按钮组在顶部
						top: 0,
						backgroundColor: '#fff',  // 背景颜色，避免被覆盖
						zIndex: 10,
						display: "none",
					}}
				>
					<Radio.Button value={MetricTypeEnum.pay}>核心指标</Radio.Button>
					<Radio.Button value={MetricTypeEnum.free}>免费指标</Radio.Button>
				</Radio.Group>

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
								<Menu.Item key={'metrics_' + symbolIndex + '_' + metricIndex} onClick={() => symbolToggled(symbolValue.symbol, metricValue.key)}>
									{metricValue.metric}
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
