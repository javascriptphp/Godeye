import styled from "styled-components";
import { useRouter } from "next/router";
import { Button, Dropdown, Flex, MenuProps, Space } from "antd";
import Link from "next/link";
import React from "react";
import LoginedAvatar from "@/components/login/LoginedAvatar";
import useStore from "@/utils/store";
import { useTranslation } from "react-i18next";
import { GlobalOutlined } from "@ant-design/icons";

const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
    padding: 10px 40px 10px 40px;
`;

const Wrapper = styled.div`
    position: fixed;
    left: 0;
    justify-content: space-between;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
    z-index: 1000;
    width: 100%;
    min-width: 1000px;
`;
const Logo = styled.div`
    font-size: 24px;
    font-weight: bold;
`;
const Nav = styled.span`
    &:hover {
        cursor: pointer;
    }
`;

const NavLinks = styled.div`
    display: flex;
    align-items: center;

    a {
        margin: 0 20px;
        text-decoration: none;
        color: #333;
    }
`;
const alterStyle: React.CSSProperties = {
    textAlign: "center",
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 12,
    color: "#000",
    border: "none",
};
const RichHeader = () => {
    const router = useRouter();
    const { getUserContext, setLanguage } = useStore();
    const { t } = useTranslation();
    const userContext = getUserContext();

    const handleLanguageChange = (lang: string) => {
        setLanguage(lang);
    };

    const languageMenu: MenuProps = {
        items: [
            {
                key: "zh",
                label: "简体中文",
                onClick: () => handleLanguageChange("zh"),
            },
            {
                key: "en",
                label: "English",
                onClick: () => handleLanguageChange("en"),
            },
        ],
    };

    const handleSignup = async () => {
        await router.push("/signup");
    };
    const handleSignin = async () => {
        await router.push("/signin");
    };
    const routeUrl = (url: string) => {
        router.push(url).then((r) => r);
    };
    return (
        <Wrapper>
            <HeaderContainer>
                <Link href={"/"}>
                    <Space
                        direction={"horizontal"}
                        align={"center"}
                        size={"middle"}
                    >
                        <Logo>Godeye</Logo>
                        <span
                            style={{
                                fontSize: 12,
                                color: "red",
                            }}
                        >
                            {t("shortDescription")}
                        </span>
                    </Space>
                </Link>
                <NavLinks>
                    <Space
                        direction={"horizontal"}
                        align={"baseline"}
                        size={"large"}
                    >
                        <Nav onClick={() => routeUrl("/chat")}>
                            {t("chatGPT")}
                        </Nav>
                        <Nav onClick={() => routeUrl("/exchange")}>
                            {t("exchangeDepositsAndWithdrawals")}
                        </Nav>
                        {/* <Nav onClick={() => routeUrl("/market")}>
                            {t("memeMarketValueList")}
                        </Nav> */}
                        <Nav onClick={() => routeUrl("/pay")}>
                            {t("pricing")}
                        </Nav>
                        <Nav onClick={() => routeUrl("/contact")}>
                            {t("contactUs")}
                        </Nav>
                    </Space>
                </NavLinks>
                <Flex gap={"middle"} justify="center" align="center">
                    <Dropdown menu={languageMenu} placement="bottomRight">
                        <GlobalOutlined
                            style={{ fontSize: "18px", cursor: "pointer" }}
                        />
                    </Dropdown>
                    {userContext ? (
                        <LoginedAvatar />
                    ) : (
                        <>
                            <Button onClick={handleSignin}>{t("login")}</Button>
                            <Button type="primary" onClick={handleSignup}>
                                {t("register")}
                            </Button>
                        </>
                    )}
                </Flex>
            </HeaderContainer>
        </Wrapper>
    );
};

export default RichHeader;
