import styled from 'styled-components';
import {useRouter} from "next/router";
import {Alert, Button, Flex, Space} from "antd";
import Link from "next/link";
import React from "react";
import LoginedAvatar from "@/components/login/LoginedAvatar";
import useStore from "@/utils/store";
import { Dropdown, Menu } from 'antd';
import { useTranslation } from 'react-i18next';
import { GlobalOutlined } from '@ant-design/icons';

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
	const {userContext} = useStore();
	const { t, i18n } = useTranslation();

	const handleLanguageChange = (lang: string) => {
		i18n.changeLanguage(lang);
	};

	const languageMenu = (
		<Menu>
			<Menu.Item key="zh" onClick={() => handleLanguageChange('zh')}>
				中文
			</Menu.Item>
			<Menu.Item key="en" onClick={() => handleLanguageChange('en')}>
				English
			</Menu.Item>
		</Menu>
	);

	const handleSignup = async () => {
		await router.push('/signup')
	}
	const handleSignin = async () => {
		await router.push('/signin')
	}
	return (
		<Wrapper>
			<Alert
				style={alterStyle}
				message="网站免责声明：本网站内提供的产品及信息仅供位于非中国大陆地区的客户访问。"
				type="warning"
				closable
				// onClose={}
			/>
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
							}}>普通人能接触到的最精准预警指标，多家对冲基金已购买本产品</span>
						</div>
					</Space>
				</Link>
				<NavLinks>
					<a href="/pay">价格</a>
					<a href="/contact">联系我们</a>
				</NavLinks>
				<Flex gap={"middle"} justify="center" align="center">
					<Dropdown overlay={languageMenu} placement="bottomRight">
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
