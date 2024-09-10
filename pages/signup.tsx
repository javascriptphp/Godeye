import React, {useState} from 'react';
import styled from 'styled-components';
import SimpleHeader from "@/components/SimpleHeader";
import EmailVerification from "@/components/login/EmailVerification";
import Register from "@/components/login/Register";
import {footerText} from "@/utils/global_constant";
import RichHeader from "@/components/RichHeader";
import {Col, Row, Steps} from "antd";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const Content = styled.div`
    flex: 1;
    margin-top: 100px;
    //display: flex;
    //justify-content: center;
    //align-items: center;
`;

const FooterContainer = styled.footer`
    text-align: center;
    padding: 10px 0;
    font-size: 12px;
    color: #999;
    font-family: Arial, sans-serif;
`;

const stepStyle: React.CSSProperties = {
	marginTop: '10vh',
	height: '50vh',
}
const RegistrationForm = () => {
	const [isRegistered, setIsRegistered] = useState(false);
	const [curStep, setCurStep] = useState(0);

	const handleRegister = () => {
		setCurStep(1);
		setIsRegistered(true); // 切换到验证页面
	};
	return (
		<Wrapper>
			<RichHeader/>
			<Content>
				<Row>
					<Col span={4} offset={3}>
						<Steps
							style={stepStyle}
							size={"small"}
							direction={"vertical"}
							current={curStep}
							items={[
								{
									title: "输入账户详细信息",
								},
								{
									title: "邮箱验证",
								},
							]}
						/>
					</Col>
					<Col span={8} offset={1}>
						{isRegistered ? <EmailVerification/> : <Register onRegister={handleRegister}/>}
					</Col>
				</Row>
			</Content>
			<FooterContainer>{footerText}</FooterContainer>
		</Wrapper>
	);
};

export default RegistrationForm;
