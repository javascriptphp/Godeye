import React, {ReactNode} from 'react';
import styled from 'styled-components';
import {footerText} from "@/utils/global_constant";
import RichHeader from "@/components/RichHeader";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const Content = styled.div`
    flex: 1;
    margin-top: 80px;
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

const PageFrame = ({children}:{children : ReactNode | ReactNode[]}) => {
	return (
		<Wrapper>
			<RichHeader/>
			<Content>
				{children}
			</Content>
			<FooterContainer>{footerText}</FooterContainer>
		</Wrapper>
	);
};

export default PageFrame;
