import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { CloseOutlined } from "@ant-design/icons";

// Types
interface Partnership {
    id: string;
    leftLogo?: string;
    leftText?: string;
    rightLogo?: string;
    rightText?: string;
    isPlaceholder?: boolean;
}

interface PartnershipsSectionProps {
    title?: string;
    partnerships?: Partnership[];
}

// Partnerships section styling
const PartnershipsContainer = styled.div`
    padding: 40px 20px;
    color: #fff;
    text-align: center;
    width: 100%;
`;

const PartnershipsTitle = styled.h2`
    font-size: 2.5rem;
    margin-bottom: 60px;
    font-weight: 200;
    letter-spacing: 1px;
`;

const PartnershipsGrid = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 80px;
    max-width: 1200px;
    margin: 0 auto;
`;

const PartnershipItem = styled.div<{ isPlaceholder?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    padding: 10px 20px;
    transition: transform 0.3s ease;
    opacity: ${(props) => (props.isPlaceholder ? 0.6 : 1)};

    &:hover {
        transform: scale(1.05);
    }
`;

const CrossSymbol = styled.div`
    font-size: 1.5rem;
    color: #fff;
    margin: 0 5px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const GodeyeLogo = styled.div`
    font-size: 1.5rem;
    font-weight: 600;
    font-family: "YouSheBiaoTiHei", sans-serif;
    background: linear-gradient(90deg, #3caea3 0%, #20639b 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
`;

const PlaceholderBox = styled.div`
    width: 80px;
    height: 40px;
    background: #333;
    border-radius: 4px;
`;

const LogoContainer = styled.div`
    position: relative;
    width: 50px;
    height: 50px;
`;

const PartnershipsSection: React.FC<PartnershipsSectionProps> = ({
    title = "Partnerships",
    partnerships = [],
}) => {
    // Default partnerships if none provided
    const defaultPartnerships: Partnership[] = [
        {
            id: "godeye-virtual",
            leftText: "Godeye Powered by",
            rightLogo: "/images/virtual.webp",
            rightText: "Virtuals Protocol",
        },
    ];

    const displayPartnerships =
        partnerships.length > 0 ? partnerships : defaultPartnerships;

    return (
        <PartnershipsContainer>
            {/* <PartnershipsTitle>{title}</PartnershipsTitle> */}
            <PartnershipsGrid>
                {displayPartnerships.map((partnership) => (
                    <PartnershipItem
                        key={partnership.id}
                        isPlaceholder={partnership.isPlaceholder}
                    >
                        {partnership.isPlaceholder ? (
                            <>
                                <PlaceholderBox />
                                <CrossSymbol>
                                    <CloseOutlined
                                        style={{ fontSize: "18px" }}
                                    />
                                </CrossSymbol>
                                <PlaceholderBox />
                            </>
                        ) : (
                            <>
                                {partnership.leftLogo ? (
                                    <LogoContainer>
                                        <Image
                                            src={partnership.leftLogo}
                                            alt="Partner Logo"
                                            fill
                                            style={{ objectFit: "contain" }}
                                        />
                                    </LogoContainer>
                                ) : partnership.leftText ? (
                                    <GodeyeLogo>
                                        {partnership.leftText}
                                    </GodeyeLogo>
                                ) : null}

                                {/* <CrossSymbol>
                                    <CloseOutlined
                                        style={{ fontSize: "18px" }}
                                    />
                                </CrossSymbol> */}

                                {partnership.rightLogo ? (
                                    <LogoContainer>
                                        <Image
                                            src={partnership.rightLogo}
                                            alt="Partner Logo"
                                            fill
                                            style={{ objectFit: "contain" }}
                                        />
                                    </LogoContainer>
                                ) : null}
                                {partnership.rightText ? (
                                    <GodeyeLogo>
                                        {partnership.rightText}
                                    </GodeyeLogo>
                                ) : null}
                            </>
                        )}
                    </PartnershipItem>
                ))}
            </PartnershipsGrid>
        </PartnershipsContainer>
    );
};

export default PartnershipsSection;
