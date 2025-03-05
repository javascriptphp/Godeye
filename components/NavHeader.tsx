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
        <div className="w-full flex justify-center">
            <header className="w-[100%] sm:w-[85%] md:w-[80%] lg:w-[85%] xl:w-[80%] 2xl:w-[75%] p-4 flex justify-between items-center">
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
                <nav className="hidden md:flex space-x-4 lg:space-x-8 xl:space-x-12 2xl:space-x-16">
                    <Link
                        href="/"
                        className="font-custom hover:text-gray-300 text-sm lg:text-base whitespace-nowrap"
                    >
                        {t("home")}
                    </Link>
                    <Link
                        href="/chat"
                        className="font-custom hover:text-gray-300 text-sm lg:text-base whitespace-nowrap"
                    >
                        {t("chatGPT")}
                    </Link>
                    <Link
                        href="/exchange"
                        className="font-custom hover:text-gray-300 text-sm lg:text-base whitespace-nowrap"
                    >
                        {t("exchangeDepositsAndWithdrawals")}
                    </Link>
                    <Link
                        href="/pay"
                        className="font-custom hover:text-gray-300 text-sm lg:text-base whitespace-nowrap"
                    >
                        {t("pricing")}
                    </Link>
                    <Link
                        href="/contact"
                        className="font-custom hover:text-gray-300 text-sm lg:text-base whitespace-nowrap"
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
                <div className="hidden md:flex space-x-3 lg:space-x-5 xl:space-x-6 items-center">
                    <button
                        className="text-white hover:text-[#B1FB83] transition-colors"
                        onClick={toggleLanguage}
                        aria-label="Toggle language"
                    >
                        <GlobalOutlined
                            style={{ fontSize: "16px", marginTop: "2px" }}
                        />
                    </button>

                    {userContext ? (
                        <button
                            className="font-custom text-white py-1 px-4 lg:px-6 rounded text-sm lg:text-base transition-all hover:bg-gradient-to-r hover:from-[#B1FB83] hover:to-[#28E89B] hover:text-black whitespace-nowrap"
                            onClick={() =>
                                invokeLogout(userContext.email, logoutHandler)
                            }
                        >
                            {t("logout")}
                        </button>
                    ) : (
                        <>
                            <button
                                className="font-custom text-white py-1 px-3 lg:px-6 rounded text-sm lg:text-base transition-all hover:bg-gradient-to-r hover:from-[#B1FB83] hover:to-[#28E89B] hover:text-black whitespace-nowrap"
                                onClick={() => router.push("/signin")}
                            >
                                {t("login")}
                            </button>
                            <button
                                className="font-custom text-white py-1 px-3 lg:px-6 rounded text-sm lg:text-base transition-all hover:bg-gradient-to-r hover:from-[#B1FB83] hover:to-[#28E89B] hover:text-black whitespace-nowrap"
                                onClick={() => router.push("/signup")}
                            >
                                {t("register")}
                            </button>
                        </>
                    )}
                </div>
            </header>
        </div>
    );
};

export default NavHeader;
