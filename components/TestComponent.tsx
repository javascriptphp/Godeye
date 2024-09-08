import React, { useState, useEffect } from 'react';

// 1. 定义 props 的类型
type ComponentProps = {
	data: string;
};

// 2. 使用 React.FC 并且显式声明 props 类型
const ComponentA: React.FC<ComponentProps> = React.memo(({ data }) => {
	useEffect(() => {
		console.log('Component A mounted');
		return () => {
			console.log('Component A unmounted');
		};
	}, []);

	return <div>Component A Data: {data}</div>;
});

const ComponentB: React.FC<ComponentProps> = React.memo(({ data }) => {
	useEffect(() => {
		console.log('Component B mounted');
		return () => {
			console.log('Component B unmounted');
		};
	}, []);

	return <div>Component B Data: {data}</div>;
});

const App: React.FC = () => {
	const [currentComponent, setCurrentComponent] = useState<'A' | 'B'>('A');
	const [data, setData] = useState<string>('Initial Data');

	const toggleComponent = () => {
		setCurrentComponent(currentComponent === 'A' ? 'B' : 'A');
	};

	return (
		<div>
			<button onClick={toggleComponent}>Toggle Component</button>
			{/* 根据 currentComponent 显示对应组件 */}
			{currentComponent === 'A' ? <ComponentA data={data} /> : <ComponentB data={data} />}
		</div>
	);
};

export default App;
