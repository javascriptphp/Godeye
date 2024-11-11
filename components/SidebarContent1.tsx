import React from "react";
import { Collapse, CollapseProps, List } from "antd";

const SidebarContent1 = () => {
    const data = ["买入指标", "卖出指标"];
    const item = (
        <List
            size="small"
            dataSource={data}
            renderItem={(item) => <List.Item>{item}</List.Item>}
        />
    );
    const items: CollapseProps["items"] = [
        {
            key: "1",
            label: "BTC",
            children: item,
        },
        {
            key: "2",
            label: "ETH",
            children: item,
        },
        {
            key: "3",
            label: "SOL",
            children: item,
        },
        {
            key: "1",
            label: "BTC",
            children: item,
        },
        {
            key: "2",
            label: "ETH",
            children: item,
        },
        {
            key: "3",
            label: "SOL",
            children: item,
        },
        {
            key: "1",
            label: "BTC",
            children: item,
        },
        {
            key: "2",
            label: "ETH",
            children: item,
        },
        {
            key: "3",
            label: "SOL",
            children: item,
        },
        {
            key: "1",
            label: "BTC",
            children: item,
        },
        {
            key: "2",
            label: "ETH",
            children: item,
        },
        {
            key: "3",
            label: "SOL",
            children: item,
        },
    ];

    return (
        <div>
            <Collapse
                items={items}
                defaultActiveKey={["1"]}
                bordered={false}
            ></Collapse>
        </div>
    );
};

export default SidebarContent1;
