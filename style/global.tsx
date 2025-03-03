// GlobalStyles.js
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #01050A; /* 设置整个项目的背景色 */
    color: #98FA86; /* 设置默认文字颜色为白色，以便在深色背景上可读 */
    font-family: 'Arial', sans-serif;
  }

  :root {
    --theme-color: #9EF886; /* 定义主题色 */
  }

  a {
    color: var(--theme-color); /* 设置超链接颜色为主题色 */
    text-decoration: none;
  }

  /* 可以根据需要继续添加更多全局样式 */
`;

export default GlobalStyle;
