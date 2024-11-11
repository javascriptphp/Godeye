import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
    width: 300px;
    margin: 50px auto;
    font-family: Arial, sans-serif;
`;

const Title = styled.h2`
    margin-bottom: 10px;
`;

const Description = styled.p`
    margin-bottom: 20px;
    color: #666;
    font-size: 14px;
`;

const Form = styled.form``;

const Label = styled.label`
    display: block;
    margin-bottom: 10px;
    font-size: 14px;
`;

const Input = styled.input`
    width: 100%;
    padding: 8px;
    margin: 8px 0;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const CheckboxContainer = styled.div`
    margin-top: 10px;
`;

const CheckboxLabel = styled.label`
    font-size: 14px;
`;

const Checkbox = styled.input`
    margin-right: 8px;
`;

const TermsLink = styled.a`
    color: #1677ff;
    text-decoration: none;
`;

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;
const Button = styled.button`
    background-color: #2388ff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    margin-top: 20px;
    width: 100%;
    font-size: 14px;
    border-radius: 4px;
    transition: background-color 0.3s;

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

const LoginLink = styled.p`
    margin-top: 20px;
    font-size: 14px;

    a {
        color: #1677ff;
        text-decoration: none;
    }
`;

const Footer = styled.footer`
    padding: 10px 20px;
    background-color: #f5f5f5;
    text-align: center;
    border-top: 1px solid #ddd;
    font-size: 14px;
`;

const Register = ({ onRegister }: { onRegister: VoidFunction }) => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [agreeTerms, setAgreeTerms] = useState(false);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };
    const handleUsernameBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        const username = e.target.value;
    };
    const handlePasswordBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        const username = e.target.value;
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleAgreeTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAgreeTerms(e.target.checked);
    };

    const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        // 处理表单提交逻辑
        console.log("Email:", email);
        console.log("Password:", password);
        console.log("Agree to Terms:", agreeTerms);
        onRegister();
    };
    return (
        <Container>
            <Title>输入帐户详细信息</Title>
            <Description>
                输入您帐户的详细信息和强密码以保护您的帐户
            </Description>
            <Form onSubmit={handleSubmit}>
                <Label>
                    <span style={{ color: "red" }}>* </span>用户名
                    <Input
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                        required={true}
                        onBlur={handleUsernameBlur}
                    />
                </Label>
                <Label>
                    <span style={{ color: "red" }}>* </span>邮箱
                    <Input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        required={true}
                    />
                </Label>
                <Label>
                    <span style={{ color: "red" }}>* </span>密码
                    <Input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required={true}
                        onBlur={handlePasswordBlur}
                    />
                </Label>
                <CheckboxContainer>
                    <CheckboxLabel>
                        <Checkbox
                            type="checkbox"
                            checked={agreeTerms}
                            onChange={handleAgreeTermsChange}
                        />
                        我已阅读并同意 Godeye 的{" "}
                        <TermsLink href="./terms.html">用户服务条款</TermsLink>
                    </CheckboxLabel>
                </CheckboxContainer>
                <Button
                    type="submit"
                    disabled={!username || !email || !password || !agreeTerms}
                >
                    下一步
                </Button>
            </Form>
            <LoginLink>
                已经注册了？ <a href="/signin">登录</a>
            </LoginLink>
        </Container>
    );
};

export default Register;
