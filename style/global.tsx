// GlobalStyles.js
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }

  body {
    background-color: #01050A; /* 设置整个项目的背景色 */
    color: #98FA86; /* 设置默认文字颜色为白色，以便在深色背景上可读 */
    font-family: 'Arial', sans-serif;
    overflow-x: hidden;
    width: 100%;
    min-height: 100vh;
  }

  :root {
    --theme-color: #9EF886; /* 定义主题色 */
    --text-color: #FFFFFF;
    --background-color: #01050A;
    --card-background: rgba(17, 25, 40, 0.75);
    
    /* 响应式断点 */
    --mobile: 480px;
    --tablet: 768px;
    --desktop: 1024px;
    --large-desktop: 1440px;
  }

  a {
    color: var(--theme-color); /* 设置超链接颜色为主题色 */
    text-decoration: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  /* 基础响应式容器 */
  .container {
    width: 100%;
    padding-right: 1rem;
    padding-left: 1rem;
    margin-right: auto;
    margin-left: auto;
    
    @media (min-width: 576px) {
      max-width: 540px;
    }
    
    @media (min-width: 768px) {
      max-width: 720px;
    }
    
    @media (min-width: 992px) {
      max-width: 960px;
    }
    
    @media (min-width: 1200px) {
      max-width: 1140px;
    }
  }

  /* 移动端优化 */
  input, select, textarea, button {
    font-size: 16px; /* 防止iOS缩放 */
  }

  /* 滚动条美化 */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(158, 248, 134, 0.5);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(158, 248, 134, 0.7);
  }

  /* 可以根据需要继续添加更多全局样式 */
`;

export default GlobalStyle;
