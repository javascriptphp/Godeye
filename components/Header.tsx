import styled from 'styled-components';

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

const NavLinks = styled.div`
    display: flex;
    align-items: center;

    a {
        margin-left: 20px;
        text-decoration: none;
        color: #333;
    }
`;

const AuthButtons = styled.div`
  display: flex;
  align-items: center;

  button {
    margin-left: 20px;
    padding: 5px 15px;
    font-size: 16px;
    border: 1px solid #333;
    background-color: transparent;
    cursor: pointer;
    border-radius: 3px;

    &:hover {
      background-color: #f0f0f0;
    }
  }

  .register {
    background-color: #0070f3;
    color: white;
    border: none;

    &:hover {
      background-color: #005bb5;
    }
  }
`;

const Header = () => {
	return (
		<HeaderContainer>
			<Logo>Godeye</Logo>
			<NavLinks>
				<a href="#">核心指标</a>
				<a href="#">免费指标</a>
				<a href="#">价格</a>
				<a href="#">联系我们</a>
				<a href="#">推特</a>
			</NavLinks>
			<AuthButtons>
				<button className="login">登录</button>
				<button className="register">注册</button>
			</AuthButtons>
		</HeaderContainer>
	);
};

export default Header;
