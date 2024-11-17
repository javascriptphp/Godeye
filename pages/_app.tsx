import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { type DefaultTheme, ThemeProvider } from "styled-components";
import GlobalStyle from "@/components/globalstyles";
import useStore from "@/utils/store";
import Internationalization from "@/utils/i18n";
import { Modal } from "antd";
import { useRouter } from "next/router";
import { isLoginValid } from "@/utils/auth";

const theme: DefaultTheme = {
    colors: {
        primary: "#111",
        secondary: "#0070f3",
    },
};

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const { logoutHandler, loadSession } = useStore();
    const [isExpireModalOpen, setIsExpireModalOpen] = useState(false);

    useEffect(() => {
        loadSession();
    }, []);

    useEffect(() => {
        const checkLogin = () => {
            if (!isLoginValid()) {
                logoutHandler();
                setIsExpireModalOpen(true);
            }
        };
        checkLogin();
        const interval = setInterval(checkLogin, 60 * 1000); // check every minute
        return () => clearInterval(interval);
    }, []);

    const handleExpireModalOk = () => {
        setIsExpireModalOpen(false);
        router.push("/signin").then((r) => r);
    };

    const handleExpireModalCancel = () => {
        setIsExpireModalOpen(false);
        window.location.reload();
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <Internationalization />
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
