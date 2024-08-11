import React from 'react';
import styled from 'styled-components';

const TabsContainer = styled.div`
    display: flex;
    border-bottom: 1px solid #ddd;
    margin-bottom: 20px;
`;

const TabButton = styled.button`
    padding: 10px 20px;
    border: none;
    background-color: ${(props) => (props.active ? '#0070f3' : 'transparent')};
    color: ${(props) => (props.active ? 'white' : '#333')};
    cursor: pointer;
    font-size: 16px;
    margin-right: 5px;

    &:hover {
        background-color: ${(props) => (props.active ? '#005bb5' : '#f0f0f0')};
    }
`;

// @ts-ignore
const Tabs = ({ tabs, activeTab, setActiveTab }) => {
	// @ts-ignore
	return (
		<TabsContainer>
			{tabs.map((tab, index) => (
				<TabButton
					key={index}
					active={activeTab === index}
					onClick={() => setActiveTab(index)}
				>
					{tab.label}
				</TabButton>
			))}
		</TabsContainer>
	);
};

export default Tabs;
