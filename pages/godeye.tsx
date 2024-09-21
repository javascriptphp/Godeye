import React, {useState} from 'react';
import styled from 'styled-components';
import RichHeader from '../components/RichHeader';
import RealtimeChart from "@/components/charts/RealtimeChart";
import ThreeMonthChart from "@/components/charts/ThreeMonthChart";
import Sidebar from "@/components/Sidebar";
import {MetricIntroduction} from "@/components/MetricIntroduction";
import {Flex, Space} from "antd";
import HistoricalChart from "@/components/charts/HistoricalChart";
import {footerText} from "@/utils/global_constant";
import {SymbolAndMetric} from "@/types";

const MainContentWrapper = styled.div`
    margin-top: 150px;
    margin-left: 200px;
`;
const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    min-width: 1000px;
    padding: 0 20px;
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
const Footer = styled.div`
    padding: 10px 20px;
    background-color: #f5f5f5;
    text-align: center;
    border-top: 1px solid #ddd;
    font-size: 14px;
    z-index: 99;
    height: 150px;
`;

const GodeyeIndexPage = () => {

	const [symbol, setSymbol] = useState('BTC');
	const [metric, setMetric] = useState('buy');
	const symbolSwitchedHandler = ({symbol, metric}: SymbolAndMetric) => {
		setSymbol(symbol);
		setMetric(metric);
	}
	return (
		<>

			
			<PageContainer>
				<RichHeader/>
				<Sidebar symbolToggledHandler={symbolSwitchedHandler}/>
				<MainContentWrapper>
					{/*<Flex justify={"center"} align={"center"} vertical={true}>*/}
						<Space align={"center"} size={100} direction={"vertical"} style={{marginLeft: 100}}>
							<ThreeMonthChart symbol={symbol} metric={metric}/>
							<HistoricalChart symbol={symbol} metric={metric}/>
							<RealtimeChart symbol={symbol} metric={metric}/>
							<MetricIntroduction metric={metric}/>
						</Space>
					{/*</Flex>*/}
				</MainContentWrapper>
				<Footer>
					{footerText}
				</Footer>
			</PageContainer>
		</>
	);
};
export default GodeyeIndexPage;
