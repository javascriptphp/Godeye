import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
// import { type DefaultTheme, ThemeProvider } from "styled-components";
import GlobalStyle from "@/style/global";
import useStore from "@/utils/store";
import Internationalization from "@/utils/i18n";
import { ConfigProvider, theme } from "antd";
import { Modal } from "antd";
import { useRouter } from "next/router";
import { isLoginValid } from "@/utils/auth";
import "@/style/tailwind.css";
// import "@/style/tailwind_output.css";

// const theme: DefaultTheme = {
//     colors: {
//         primary: "#111",
//         secondary: "#0070f3",
//     },
// };

export default function App({ Component, pageProps }: AppProps) {
    // const router = useRouter();
    const { logoutHandler, loadSession } = useStore();
    // const [isExpireModalOpen, setIsExpireModalOpen] = useState(false);

    useEffect(() => {
        loadSession();
    }, []);

    useEffect(() => {
        const checkLogin = () => {
            if (!isLoginValid()) {
                logoutHandler();
                // setIsExpireModalOpen(true);
            }
        };
        checkLogin();
        const interval = setInterval(checkLogin, 60 * 1000); // check every minute
        return () => clearInterval(interval);
    }, []);

    // const handleExpireModalOk = () => {
    //     setIsExpireModalOpen(false);
    //     router.push("/signin").then((r) => r);
    // };

    // const handleExpireModalCancel = () => {
    //     setIsExpireModalOpen(false);
    // };

    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#9EF886",
                        borderRadius: 2,
                        colorBgContainer: "#01050A",
                    },
                    algorithm: theme.darkAlgorithm,
                }}
            >
                <GlobalStyle />
                <Internationalization />
                <Component {...pageProps} />
                {/* <Modal
                    title="会话过期提醒"
                    open={isExpireModalOpen}
                    onOk={handleExpireModalOk}
                    onCancel={handleExpireModalCancel}
                    okText="重新登录"
                    cancelText="取消"
                >
                    <p>您的登录会话已过期，请重新登录。</p>
                </Modal> */}
            </ConfigProvider>
        </>
    );
}
