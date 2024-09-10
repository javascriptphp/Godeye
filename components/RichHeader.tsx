import styled from 'styled-components';
import {useRouter} from "next/router";
import {Button, Flex} from "antd";
import Link from "next/link";

const HeaderContainer = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-width: 1000px;
    height: 60px;
    display: flex;
    justify-content: space-between;
    padding: 10px 100px 10px 40px;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
    z-index: 1000;
`;

const Logo = styled.div`
    font-size: 24px;
    font-weight: bold;
`;

const NavLinks = styled.div`
    display: flex;
    align-items: center;

    a {
        margin-left: 20px;
        text-decoration: none;
        color: #333;
    }
`;

const RichHeader = () => {
	const router = useRouter();
	const handleSignup = async () => {
		await router.push('/signup')
	}
	const handleSignin = async () => {
		await router.push('/signin')
	}
	return (
		<HeaderContainer>
			<Link href={"/"}>
				<Logo>Godeye</Logo>
			</Link>
			<NavLinks>
				<a href="#">价格</a>
				<a href="#">联系我们</a>
				<a href="#">推特</a>
			</NavLinks>
			<Flex gap={"middle"} justify="center" align="center">
				<Button onClick={handleSignin}>登 录</Button>
				<Button type="primary" onClick={handleSignup}>注 册</Button>
			</Flex>
		</HeaderContainer>
	);
};

export default RichHeader;
