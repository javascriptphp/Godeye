import {useEffect, useState} from "react";
import type {AppProps} from "next/app";
import {type DefaultTheme, ThemeProvider} from "styled-components";
import GlobalStyle from "@/components/globalstyles";
import useStore from "@/utils/store";
import Internationalization from "@/utils/i18n";
import {Modal} from "antd";
import {useRouter} from "next/router";

const theme: DefaultTheme = {
  colors: {
    primary: "#111",
    secondary: "#0070f3",
  },
};

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const {updateExpireTime, loadSession, logoutHandler} = useStore();
  const [isExpireModalOpen, setIsExpireModalOpen] = useState(false);
  const [checkTimer, setCheckTimer] = useState< NodeJS.Timeout | null>();
  const cleanup = () => {
    if (checkTimer) {
      clearInterval(checkTimer);
      setCheckTimer(null);
    }
    // 只删除 expire_at cookie
    // document.cookie = `expire_at=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  };
  useEffect(() => {
    loadSession();
    
    const checkAndUpdateExpireTime = () => {
      const cookies = document.cookie.split(';');
      const expireCookie = cookies.find(cookie => cookie.trim().startsWith('expire_at='));
      console.log(expireCookie)
      if (expireCookie) {
        const expireAtNumber = parseInt(expireCookie.split('=')[1]);
        const expireAt = new Date(expireAtNumber);
        const now = new Date();
        
        if (expireAtNumber !== 0 && now > expireAt) {
          logoutHandler();
          setIsExpireModalOpen(true);
          cleanup();
        } else {
          updateExpireTime(expireAt);
        }
      }
    };

    checkAndUpdateExpireTime();
    
    const timer = setInterval(checkAndUpdateExpireTime, 60 * 1000);
    setCheckTimer(timer)
    return () => clearInterval(timer);
  }, []);

  const handleExpireModalOk = () => {
    setIsExpireModalOpen(false);
    cleanup();
    router.push("/signin").then(r => r);
  };

  const handleExpireModalCancel = () => {
    setIsExpireModalOpen(false);
    cleanup();
    window.location.reload();
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Internationalization/>
        <Component {...pageProps} />
        <Modal
          title="会话过期提醒"
          open={isExpireModalOpen}
          onOk={handleExpireModalOk}
          onCancel={handleExpireModalCancel}
          okText="重新登录"
          cancelText="取消"
        >
          <p>您的登录会话已过期，请重新登录。</p>
        </Modal>
      </ThemeProvider>
    </>
  );
}
