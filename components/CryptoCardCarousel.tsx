import React, { useState } from "react";
import { Button } from "antd";
import styled from "styled-components";
import CryptoCard from "@/components/CryptoCard";
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";

// 组件定义
const CryptoCardCarousel = ({
    charts,
    symbol,
    metric,
    onRefresh,
    onFullscreen,
    onSync,
    onDownload,
    onBuy,
    onSwitchMetric,
}: any) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const goToNext = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === charts.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goToPrevious = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === 0 ? charts.length - 1 : prevIndex - 1
        );
    };

    const goToSlide = (index: any) => {
        setActiveIndex(index);
    };

    return (
        <div>
            <OuterContainer>
                <LeftButtonContainer>
                    <NavButton
                        type="text"
                        shape="circle"
                        icon={<DoubleLeftOutlined />}
                        onClick={goToPrevious}
                    />
                </LeftButtonContainer>

                <CarouselContainer>
                    <CarouselWrapper
                        style={{
                            transform: `translateX(-${activeIndex * 100}%)`,
                        }}
                    >
                        {charts.map((item: any, index: any) => (
                            <SlideContainer key={index}>
                                <CryptoCard
                                    symbol={symbol}
                                    metric={metric}
                                    description={item.description}
                                    onRefresh={onRefresh}
                                    onFullscreen={onFullscreen}
                                    onSync={onSync}
                                    onDownload={onDownload}
                                    onBuy={onBuy}
                                    onSwitchMetric={onSwitchMetric}
                                >
                                    {item.chart}
                                </CryptoCard>
                            </SlideContainer>
                        ))}
                    </CarouselWrapper>
                </CarouselContainer>

                <RightButtonContainer>
                    <NavButton
                        type="text"
                        shape="circle"
                        icon={<DoubleRightOutlined />}
                        onClick={goToNext}
                    />
                </RightButtonContainer>
            </OuterContainer>

            <Indicator>
                {charts.map((_: any, index: any) => (
                    <LineIndicator
                        key={index}
                        active={index === activeIndex}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </Indicator>
        </div>
    );
};

export default CryptoCardCarousel;

// 样式组件定义
// 整体容器，使用flex布局
const OuterContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

// 左侧按钮容器
const LeftButtonContainer = styled.div`
    flex: 0 0 auto;
    padding: 0 15px;
    z-index: 20;
`;

// 右侧按钮容器
const RightButtonContainer = styled.div`
    flex: 0 0 auto;
    padding: 0 15px;
    z-index: 20;
`;

// 轮播内容容器
const CarouselContainer = styled.div`
    position: relative;
    flex: 1;
    overflow: hidden;
    max-width: calc(100% - 120px);
`;

const CarouselWrapper = styled.div`
    display: flex;
    transition: transform 0.5s ease;
`;

const SlideContainer = styled.div`
    flex: 0 0 100%;
    width: 100%;
`;

const Indicator = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    width: 100%;
    height: 30px;
    align-items: center;
    gap: 10px;
`;

interface LineIndicatorProps {
    active: boolean;
}

const LineIndicator = styled.div<LineIndicatorProps>`
    height: 6px;
    flex: 1;
    border-radius: 3px;
    background-color: ${(props) =>
        props.active
            ? "var(--theme-color, #10b981)"
            : "rgba(255, 255, 255, 0.15)"};
    cursor: pointer;
    transition: all 0.3s ease;
    max-width: 30%;
    box-shadow: ${(props) =>
        props.active ? "0 0 10px rgba(16, 185, 129, 0.3)" : "none"};

    &:hover {
        background-color: ${(props) =>
            props.active
                ? "var(--theme-color, #10b981)"
                : "rgba(255, 255, 255, 0.3)"};
    }
`;

// 自定义导航按钮
const NavButton = styled(Button)`
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: rgba(255, 255, 255, 0.6);
    background: transparent;
    border: none;
    border-radius: 50%;
    transition: all 0.3s ease;

    &:hover {
        color: rgba(255, 255, 255, 0.9);
        background: rgba(255, 255, 255, 0.1);
        transform: scale(1.05);
    }

    &:focus {
        color: rgba(255, 255, 255, 0.9);
        background: rgba(255, 255, 255, 0.05);
    }
`;
