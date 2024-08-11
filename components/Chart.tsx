import styled from 'styled-components';
import { Line } from 'react-chartjs-2';

const ChartContainer = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const Chart = () => {
	const data = {
		labels: ['1?', '2?', '3?', '4?', '5?', '6?', '7?', '8?'],
		datasets: [
			{
				label: 'Ahv999',
				data: [0.8, 0.85, 0.87, 0.88, 0.89, 0.87, 0.86, 0.84],
				borderColor: 'orange',
				fill: false,
				lineTension: 0.1,
			},
			{
				label: 'BTC Price',
				data: [0.7, 0.72, 0.73, 0.75, 0.74, 0.72, 0.71, 0.70],
				borderColor: 'gray',
				fill: false,
				lineTension: 0.1,
			},
		],
	};

	return (
		<ChartContainer>
			<Line data={data} />
		</ChartContainer>
	);
};

export default Chart;
