import React, {createRef, useEffect, useRef, useState} from 'react';
import {createChart} from "lightweight-charts";
import * as echarts from 'echarts';

const Chart1 = () => {
	const containerRef = useRef(null);
	useEffect(() => {
		const myChart = echarts.init(containerRef.current);
		let data = [];
		let now = new Date(1997, 9, 3);
		let oneDay = 24 * 3600 * 1000;
		let value = Math.random() * 1000;
		for (var i = 0; i < 1000; i++) {
			data.push(randomData());
		}
		function randomData() {
			now = new Date(+now + oneDay);
			value = value + Math.random() * 21 - 10;
			return {
				name: now.toString(),
				value: [
					[now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
					Math.round(value)
				]
			};
		}
		const option = {
			title: {
				text: 'Dynamic Data & Time Axis'
			},
			tooltip: {
				trigger: 'axis',
				formatter: function (params) {
					params = params[0];
					var date = new Date(params.name);
					return (
						date.getDate() +
						'/' +
						(date.getMonth() + 1) +
						'/' +
						date.getFullYear() +
						' : ' +
						params.value[1]
					);
				},
				axisPointer: {
					animation: false
				}
			},
			xAxis: {
				type: 'time',
				splitLine: {
					show: false
				}
			},
			yAxis: {
				type: 'value',
				boundaryGap: [0, '100%'],
				splitLine: {
					show: true
				}
			},
			legend: {
				data: ['Fake Data']
			},
			series: [
				{
					name: 'Fake Data',
					type: 'line',
					showSymbol: false,
					data: data,
					markArea: {
						itemStyle: {
							color: 'rgba(255, 173, 177, 0.4)'
						},
						data: [
							[
								{
									xAxis: '1999/5/5'
								},
								{
									xAxis: '1999/12/10'
								}
							],
							[
								{
									xAxis: '2000/5/5'
								},
								{
									xAxis: '2000/7/10'
								}
							]
						]
					}
				}
			]
		};
		myChart.setOption(option);
		const timer = setInterval(function () {
			for (var i = 0; i < 5; i++) {
				data.shift();
				data.push(randomData());
			}
			myChart.setOption({
				series: [
					{
						data: data
					}
				]
			});
			// console.log(myChart.getOption().series.data)
		}, 1000);
		return () => {
			
			clearInterval(timer);
			myChart.dispose();
		};
	}, []);
	
	return (
		<div>
			<div ref={containerRef} style={{ width: '800px', height: '600px' }}></div>
		</div>
	);

};

export default Chart1;
