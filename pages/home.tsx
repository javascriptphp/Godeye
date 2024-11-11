import styled from "styled-components";
import { Button } from "antd";
import { GithubOutlined } from "@ant-design/icons";

const HeroSection = styled.section`
    min-height: 100vh;
    background: linear-gradient(180deg, #0d1117 0%, #161b22 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 2rem;
`;

const Title = styled.h1`
    font-size: 4rem;
    color: #ffffff;
    max-width: 900px;
    margin-bottom: 1.5rem;
`;

const Subtitle = styled.p`
    font-size: 1.25rem;
    color: #8b949e;
    max-width: 800px;
    margin-bottom: 2rem;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 1rem;
`;

export default function Home() {
    return (
        <HeroSection>
            <GithubOutlined
                style={{
                    fontSize: "48px",
                    color: "#fff",
                    marginBottom: "2rem",
                }}
            />

            <Title>在一个协作平台上构建和发布软件</Title>

            <Subtitle>
                加入全球最广泛采用的 AI
                驱动的开发者平台，数百万开发者、企业和最大的开源社区在这里构建推动人类进步的软件。
            </Subtitle>

            <ButtonGroup>
                <Button type="primary" size="large">
                    注册
                </Button>
                <Button size="large">试用 GitHub Copilot</Button>
            </ButtonGroup>
        </HeroSection>
    );
}
