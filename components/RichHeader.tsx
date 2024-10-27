import styled from 'styled-components';
import {useRouter} from "next/router";
import {Alert, Button, Flex, MenuProps, Space} from "antd";
import Link from "next/link";
import React from "react";
import LoginedAvatar from "@/components/login/LoginedAvatar";
import useStore from "@/utils/store";
import { Dropdown, Menu } from 'antd';
import {initReactI18next, useTranslation} from 'react-i18next';
import { GlobalOutlined } from '@ant-design/icons';
import i18n from "i18next";

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
`

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
	// position: "fixed",
	border: "none"
}
const RichHeader = () => {
	const router = useRouter();
	const {userContext,setLanguage} = useStore();
	const { t } = useTranslation();

	const handleLanguageChange = (lang: string) => {
		// i18n.changeLanguage(lang);
		setLanguage(lang);
		// i18n.loadLanguages(lang);
		
	};

	const languageMenu: MenuProps = {
		items: [
			{
				key: 'zh',
				label: '简体中文',
				onClick: () => handleLanguageChange('zh')
			},
			{
				key: 'en',
				label: 'English',
				onClick: () => handleLanguageChange('en')
			}
		]
	};


	const handleSignup = async () => {
		await router.push('/signup')
	}
	const handleSignin = async () => {
		await router.push('/signin')
	}
	const routeUrl = (url: string) => {
		router.push(url).then(r => r)
	}
	return (
		<Wrapper>
			{/*删除顶部声明*/}
			{/*<Alert*/}
			{/*	style={alterStyle}*/}
			{/*	message={t('topAnnouncement')}*/}
			{/*	type="warning"*/}
			{/*	closable*/}
			{/*	// onClose={}*/}
			{/*/>*/}
			<HeaderContainer>
				<Link href={"/"}>
					<Space direction={"horizontal"} align={"baseline"} size={"middle"}>
						<Logo>Godeye</Logo>
						<div style={{width: 350, alignItems: 'center'}}>
							<span style={{
								fontSize: 12,
								color: "red"
								// background: 'linear-gradient(to right, red, blue)',
								// color: 'transparent',
								// WebkitBackgroundClip: 'text'
							}}>{t('shortDescription')}</span>
						</div>
					</Space>
				</Link>
				<NavLinks>
					<Space direction={"horizontal"} align={"baseline"} size={"middle"}>
						<Nav onClick={() => routeUrl("/pay")}>{t("pricing")}</Nav>
						<Nav onClick={() => routeUrl("/contact")}>{t("contactUs")}</Nav>
					</Space>
				</NavLinks>
				<Flex gap={"middle"} justify="center" align="center">
					<Dropdown menu={languageMenu} placement="bottomRight">
						<GlobalOutlined style={{ fontSize: '18px', cursor: 'pointer' }} />
					</Dropdown>
					{
						(userContext && userContext.logined) ? 
							<LoginedAvatar/>
							:
							<>
								<Button onClick={handleSignin}>{t('login')}</Button>
								<Button type="primary" onClick={handleSignup}>{t('register')}</Button>
							</>
					}
				</Flex>
			</HeaderContainer>
		</Wrapper>
	);
};

export default RichHeader;
