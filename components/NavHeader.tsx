import React, { useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import router from "next/router";
import useStore from "@/utils/store";
import { invokeLogout } from "@/service";
import { GlobalOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";

const NavHeader: React.FC = () => {
    const { t } = useTranslation();
    const { getUserContext, setLanguage, logoutHandler } = useStore();
    const userContext = getUserContext();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleLanguage = () => {
        const currentLanguage = localStorage.getItem("systemContext")
            ? JSON.parse(localStorage.getItem("systemContext") || "{}").language
            : "en";
        const newLanguage = currentLanguage === "en" ? "zh" : "en";
        setLanguage(newLanguage);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <header className="p-4 flex justify-between items-center mx-auto px-4 md:px-8 lg:px-12 xl:px-[300px]">
            <div className="font-custom text-xl font-bold">Godeye</div>

            {/* Mobile menu button */}
            <button
                className="md:hidden text-white z-50"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
            >
                {mobileMenuOpen ? (
                    <CloseOutlined style={{ fontSize: "24px" }} />
                ) : (
                    <MenuOutlined style={{ fontSize: "24px" }} />
                )}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-4 lg:space-x-8 xl:space-x-12">
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

            {/* Mobile Navigation */}
            <div
                className={`fixed inset-0 bg-background-color bg-opacity-95 z-40 flex flex-col items-center justify-center transition-all duration-300 ${
                    mobileMenuOpen
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                } md:hidden`}
            >
                <nav className="flex flex-col items-center space-y-6">
                    <Link
                        href="/"
                        className="font-custom text-xl hover:text-gray-300"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        {t("home")}
                    </Link>
                    <Link
                        href="/chat"
                        className="font-custom text-xl hover:text-gray-300"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        {t("chatGPT")}
                    </Link>
                    <Link
                        href="/exchange"
                        className="font-custom text-xl hover:text-gray-300"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        {t("exchangeDepositsAndWithdrawals")}
                    </Link>
                    <Link
                        href="/pay"
                        className="font-custom text-xl hover:text-gray-300"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        {t("pricing")}
                    </Link>
                    <Link
                        href="/contact"
                        className="font-custom text-xl hover:text-gray-300"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        {t("contactUs")}
                    </Link>

                    <div className="mt-8 flex flex-col space-y-4 items-center">
                        <button
                            className="text-white hover:text-[#B1FB83] transition-colors"
                            onClick={toggleLanguage}
                            aria-label="Toggle language"
                        >
                            <GlobalOutlined style={{ fontSize: "24px" }} />
                        </button>

                        {userContext ? (
                            <button
                                className="font-custom text-white py-2 px-8 rounded transition-all hover:bg-gradient-to-r hover:from-[#B1FB83] hover:to-[#28E89B] hover:text-black"
                                onClick={() => {
                                    invokeLogout(
                                        userContext.email,
                                        logoutHandler
                                    );
                                    setMobileMenuOpen(false);
                                }}
                            >
                                {t("logout")}
                            </button>
                        ) : (
                            <>
                                <button
                                    className="font-custom text-white py-2 px-8 rounded transition-all hover:bg-gradient-to-r hover:from-[#B1FB83] hover:to-[#28E89B] hover:text-black"
                                    onClick={() => {
                                        router.push("/signin");
                                        setMobileMenuOpen(false);
                                    }}
                                >
                                    {t("login")}
                                </button>
                                <button
                                    className="font-custom text-white py-2 px-8 rounded transition-all hover:bg-gradient-to-r hover:from-[#B1FB83] hover:to-[#28E89B] hover:text-black"
                                    onClick={() => {
                                        router.push("/signup");
                                        setMobileMenuOpen(false);
                                    }}
                                >
                                    {t("register")}
                                </button>
                            </>
                        )}
                    </div>
                </nav>
            </div>

            {/* Desktop user controls */}
            <div className="hidden md:flex space-x-4 items-center">
                <button
                    className="text-white hover:text-[#B1FB83] transition-colors"
                    onClick={toggleLanguage}
                    aria-label="Toggle language"
                >
                    <GlobalOutlined style={{ fontSize: "18px" }} />
                </button>

                {userContext ? (
                    <button
                        className="font-custom text-white py-1 px-6 rounded transition-all hover:bg-gradient-to-r hover:from-[#B1FB83] hover:to-[#28E89B] hover:text-black"
                        onClick={() =>
                            invokeLogout(userContext.email, logoutHandler)
                        }
                    >
                        {t("logout")}
                    </button>
                ) : (
                    <>
                        <button
                            className="font-custom text-white py-1 px-6 rounded transition-all hover:bg-gradient-to-r hover:from-[#B1FB83] hover:to-[#28E89B] hover:text-black"
                            onClick={() => router.push("/signin")}
                        >
                            {t("login")}
                        </button>
                        <button
                            className="font-custom text-white py-1 px-6 rounded transition-all hover:bg-gradient-to-r hover:from-[#B1FB83] hover:to-[#28E89B] hover:text-black"
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
