import styled from 'styled-components';
import Link from "next/link";

const HeaderContainer = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
    z-index: 1000;
`;

const Logo = styled.div`
    font-size: 24px;
    font-weight: bold;
`;



const SimpleHeader = () => {
	return (
		<HeaderContainer>
			<Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
				<Logo>Godeye</Logo>
			</Link>
		</HeaderContainer>
	);
};

export default SimpleHeader;
