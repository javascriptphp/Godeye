import React, {useState} from 'react';
import styled from 'styled-components';
import SimpleHeader from "@/components/SimpleHeader";
import EmailVerification from "@/components/EmailVerification";
import Register from "@/components/Register";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const Content = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const FooterContainer = styled.footer`
    text-align: center;
    padding: 10px 0;
    font-size: 12px;
    color: #999;
    font-family: Arial, sans-serif;
`;

const FooterLink = styled.a`
    color: #999;
    text-decoration: none;
`;

const Footer = () => {
	return (
		<FooterContainer>
			&copy; 2023 <FooterLink href="#">Looknode</FooterLink>. All Rights Reserved
		</FooterContainer>
	);
};

const RegistrationForm = () => {

	const [isRegistered, setIsRegistered] = useState(false);

	const handleRegister = () => {
		setIsRegistered(true); // 切换到验证页面
	};
	return (
		<Wrapper>
			<SimpleHeader/>
			<Content>
				{isRegistered ? <EmailVerification/> : <Register onRegister={handleRegister}/>}
			</Content>
			<Footer/>
		</Wrapper>
	);
};


export default RegistrationForm;
