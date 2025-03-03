import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

interface SymbolListProps {
    symbols: {
        symbol: string;
        name: string;
        price: string;
        logo?: string;
    }[];
    activeSymbol: string;
    onSymbolChange: (symbol: string) => void;
}

const SymbolList: React.FC<SymbolListProps> = ({
    symbols,
    activeSymbol,
    onSymbolChange,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    // 检查是否需要显示箭头
    const checkScrollPosition = () => {
        if (!containerRef.current) return;

        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    };

    // 初始化和窗口大小变化时检查
    useEffect(() => {
        checkScrollPosition();
        window.addEventListener("resize", checkScrollPosition);
        return () => window.removeEventListener("resize", checkScrollPosition);
    }, []);

    // 滚动处理
    const handleScroll = () => {
        checkScrollPosition();
    };

    // 滚动到左侧
    const scrollLeft = () => {
        if (!containerRef.current) return;
        containerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    };

    // 滚动到右侧
    const scrollRight = () => {
        if (!containerRef.current) return;
        containerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    };

    return (
        <Container>
            {showLeftArrow && (
                <ArrowButton className="left" onClick={scrollLeft}>
                    <LeftOutlined />
                </ArrowButton>
            )}

            <SymbolsContainer ref={containerRef} onScroll={handleScroll}>
                {symbols.map((item) => (
                    <SymbolCard
                        key={item.symbol}
                        active={item.symbol === activeSymbol}
                        onClick={() => onSymbolChange(item.symbol)}
                    >
                        <SymbolLogo>
                            {item.logo ? (
                                <img src={item.logo} alt={item.symbol} />
                            ) : (
                                <LogoPlaceholder className="font-custom">
                                    {item.symbol.charAt(0)}
                                </LogoPlaceholder>
                            )}
                        </SymbolLogo>
                        <SymbolInfo>
                            <SymbolName>{item.name}</SymbolName>
                            {/* <SymbolPrice>${item.price}</SymbolPrice> */}
                        </SymbolInfo>
                        <PriceChart>
                            {/* 背景竖线 */}
                            <ChartBackground>
                                <VerticalLine />
                                <VerticalLine />
                                <VerticalLine />
                                <VerticalLine />
                                <VerticalLine />
                            </ChartBackground>

                            {/* 价格曲线 */}
                            <svg width="100%" height="30" viewBox="0 0 100 30">
                                {/* 渐变定义 */}
                                <defs>
                                    <linearGradient
                                        id={`lineGradient-${item.symbol}`}
                                        x1="0%"
                                        y1="0%"
                                        x2="100%"
                                        y2="0%"
                                    >
                                        <stop
                                            offset="0%"
                                            stopColor={
                                                item.symbol === activeSymbol
                                                    ? "#4ECDC4"
                                                    : "#4ECDC4"
                                            }
                                            stopOpacity="0.7"
                                        />
                                        <stop
                                            offset="100%"
                                            stopColor={
                                                item.symbol === activeSymbol
                                                    ? "#28E89B"
                                                    : "#4ECDC4"
                                            }
                                            stopOpacity="1"
                                        />
                                    </linearGradient>
                                </defs>

                                {/* 曲线路径 */}
                                <path
                                    d="M0,15 C10,10 20,20 30,15 C40,10 50,5 60,10 C70,15 80,20 90,15 L100,10"
                                    fill="none"
                                    stroke={`url(#lineGradient-${item.symbol})`}
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />

                                {/* 终点圆点 */}
                                <circle
                                    cx="100"
                                    cy="10"
                                    r="3"
                                    fill={
                                        item.symbol === activeSymbol
                                            ? "#28E89B"
                                            : "#4ECDC4"
                                    }
                                />
                            </svg>
                        </PriceChart>
                    </SymbolCard>
                ))}
            </SymbolsContainer>

            {showRightArrow && (
                <ArrowButton className="right" onClick={scrollRight}>
                    <RightOutlined />
                </ArrowButton>
            )}
        </Container>
    );
};

// 样式组件
const Container = styled.div`
    position: relative;
    width: 100%;
    margin: 20px 0;
    padding: 10px 0;
`;

const ArrowButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    transition: all 0.3s ease;

    &:hover {
        background: rgba(0, 0, 0, 0.7);
    }

    &.left {
        left: 5px;
    }

    &.right {
        right: 5px;
    }
`;

const SymbolsContainer = styled.div`
    display: flex;
    overflow-x: auto;
    gap: 15px;
    padding: 10px 40px;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera */
    }
`;

interface SymbolCardProps {
    active: boolean;
}

const SymbolCard = styled.div<SymbolCardProps>`
    flex: 0 0 180px;
    height: 120px;
    background: ${(props) =>
        props.active
            ? "linear-gradient(180deg, rgba(40, 44, 52, 0.8) 0%, rgba(17, 0, 32, 0.6) 100%)"
            : "rgba(20, 20, 20, 0.6)"};
    border: 1px solid
        ${(props) =>
            props.active
                ? "rgba(177, 251, 131, 0.5)"
                : "rgba(255, 255, 255, 0.1)"};
    border-radius: 12px;
    padding: 15px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: ${(props) =>
        props.active ? "0 4px 12px rgba(40, 232, 155, 0.2)" : "none"};

    &:hover {
        transform: translateY(-3px);
        border-color: rgba(177, 251, 131, 0.5);
    }
`;

const SymbolLogo = styled.div`
    width: 20px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 10px;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const LogoPlaceholder = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
`;

const SymbolInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const SymbolName = styled.div`
    font-size: 16px;
    font-weight: 600;
    color: white;
`;

const SymbolPrice = styled.div`
    font-size: 14px;
    color: #28e89b;
`;

const PriceChart = styled.div`
    width: 100%;
    height: 30px;
    margin-top: 10px;
    position: relative;
`;

const ChartBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    padding: 0 5px;
`;

const VerticalLine = styled.div`
    width: 1px;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.1);
`;

export default SymbolList;
