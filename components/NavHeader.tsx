import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import router from "next/router";
import useStore from "@/utils/store";
import { invokeLogout } from "@/service";
import { GlobalOutlined } from "@ant-design/icons";

const NavHeader: React.FC = () => {
    const { t } = useTranslation();
    const { getUserContext, setLanguage, logoutHandler } = useStore();
    const userContext = getUserContext();

    const toggleLanguage = () => {
        const currentLanguage = localStorage.getItem("systemContext")
            ? JSON.parse(localStorage.getItem("systemContext") || "{}").language
            : "en";
        const newLanguage = currentLanguage === "en" ? "zh" : "en";
        setLanguage(newLanguage);
    };

    return (
        <header className="p-4 flex justify-between items-center mx-[300px]">
            <div className="font-custom text-xl font-bold">Godeye</div>

            <nav className="space-x-12">
                <Link href="/" className="font-custom hover:text-gray-300">
                    {t("home")}
                </Link>
                <Link href="/chat" className="font-custom hover:text-gray-300">
                    {t("chatGPT")}
                </Link>
                <Link
                    href="/exchange"
                    className="font-custom hover:text-gray-300"
                >
                    {t("exchangeDepositsAndWithdrawals")}
                </Link>
                <Link href="/pay" className="font-custom hover:text-gray-300">
                    {t("pricing")}
                </Link>
                <Link
                    href="/contact"
                    className="font-custom hover:text-gray-300"
                >
                    {t("contactUs")}
                </Link>
            </nav>

            <div className="space-x-4 flex items-center">
                <button
                    className="text-white hover:text-[#B1FB83] transition-colors"
                    onClick={toggleLanguage}
                    aria-label="Toggle language"
                >
                    <GlobalOutlined style={{ fontSize: "18px" }} />
                </button>

                {userContext ? (
                    <button
                        className="font-custom border-white text-white py-1 px-6 rounded transition-all hover:bg-gradient-to-r hover:from-[#B1FB83] hover:to-[#28E89B] hover:text-black"
                        onClick={() =>
                            invokeLogout(userContext.email, logoutHandler)
                        }
                    >
                        {t("logout")}
                    </button>
                ) : (
                    <>
                        <button
                            className="font-custom border-white text-white py-1 px-6 rounded transition-all hover:bg-gradient-to-r hover:from-[#B1FB83] hover:to-[#28E89B] hover:text-black"
                            onClick={() => router.push("/signin")}
                        >
                            {t("login")}
                        </button>
                        <button
                            className="font-custom border-white text-white py-1 px-6 rounded transition-all hover:bg-gradient-to-r hover:from-[#B1FB83] hover:to-[#28E89B] hover:text-black"
                            onClick={() => router.push("/signup")}
                        >
                            {t("register")}
                        </button>
                    </>
                )}
            </div>
        </header>
    );
};

export default NavHeader;
