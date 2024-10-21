import type { AppProps } from "next/app";
import { ThemeProvider, type DefaultTheme } from "styled-components";
import GlobalStyle from "@/components/globalstyles";
import {useEffect} from "react";
import useStore from "@/utils/store";
import '../utils/i18n';

const theme: DefaultTheme = {
  colors: {
    primary: "#111",
    secondary: "#0070f3",
  },
};

export default function App({ Component, pageProps }: AppProps) {

  const {updateExpireTime} = useStore();
  useEffect(() =>{
    useStore.getState().loadSession();
    const userContext = useStore.getState().userContext;
    console.log("在app中的userContext", userContext);
    setInterval(() => {
      updateExpireTime(userContext)
      console.log("登录过期时间+1分钟")
    }, 60*1000);
  }, [])
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
