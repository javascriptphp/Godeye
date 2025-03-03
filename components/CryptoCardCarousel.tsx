import React, { useState, useEffect } from "react";
import { Button } from "antd";
import styled from "styled-components";
import CryptoCard from "@/components/CryptoCard";
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
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
    const [isMobile, setIsMobile] = useState(false);
    const { t } = useTranslation();

    // 检测是否为移动设备
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => {
            window.removeEventListener("resize", checkMobile);
        };
    }, []);

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
                        className="nav-button-left"
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
                        className="nav-button-right"
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

            {/* 移动端滑动指示文本 */}
            {isMobile && (
                <SwipeIndicator>
                    <span>← {t("scrollToSeeMore")} →</span>
                </SwipeIndicator>
            )}
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
    position: relative;
`;

// 左侧按钮容器
const LeftButtonContainer = styled.div`
    flex: 0 0 auto;
    padding: 0 5px 0 0;
    z-index: 20;

    @media (min-width: 640px) {
        padding: 0 10px;
    }

    @media (min-width: 768px) {
        padding: 0 15px;
    }
`;

// 右侧按钮容器
const RightButtonContainer = styled.div`
    flex: 0 0 auto;
    padding: 0 0 0 5px;
    z-index: 20;

    @media (min-width: 640px) {
        padding: 0 10px;
    }

    @media (min-width: 768px) {
        padding: 0 15px;
    }
`;

// 轮播内容容器
const CarouselContainer = styled.div`
    position: relative;
    flex: 1;
    overflow: hidden;
    max-width: calc(100% - 80px);

    @media (min-width: 640px) {
        max-width: calc(100% - 100px);
    }

    @media (min-width: 768px) {
        max-width: calc(100% - 120px);
    }
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
    margin-top: 15px;
    width: 100%;
    height: 20px;
    align-items: center;
    gap: 8px;

    @media (min-width: 640px) {
        margin-top: 20px;
        height: 30px;
        gap: 10px;
    }
`;

interface LineIndicatorProps {
    active: boolean;
}

const LineIndicator = styled.div<LineIndicatorProps>`
    height: 4px;
    flex: 1;
    border-radius: 2px;
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

    @media (min-width: 640px) {
        height: 6px;
        border-radius: 3px;
    }
`;

// 自定义导航按钮
const NavButton = styled(Button)`
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
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

    @media (min-width: 640px) {
        width: 45px;
        height: 45px;
        font-size: 18px;
    }

    @media (min-width: 768px) {
        width: 50px;
        height: 50px;
        font-size: 20px;
    }
`;

// 移动端滑动指示
const SwipeIndicator = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.5);
    animation: pulse 2s infinite;

    @keyframes pulse {
        0% {
            opacity: 0.5;
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: 0.5;
        }
    }
`;
