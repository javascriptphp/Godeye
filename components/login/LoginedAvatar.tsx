import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, MenuProps } from "antd";
import React from "react";
import { useRouter } from "next/router";
import { invokeLogout } from "@/service";
import useStore from "@/utils/store";
import { useTranslation } from "react-i18next";

const enum MenuItemKeys {
    INFO = "info",
    LOGOUT = "logout",
}

const LoginedAvatar: React.FC = () => {
    const router = useRouter();
    const { getUserContext, logoutHandler } = useStore();
    const userContext = getUserContext();
    const { t } = useTranslation();
    const items: MenuProps["items"] = [
        {
            label: <Button type="link">{t("logout")}</Button>,
            key: MenuItemKeys.LOGOUT,
        },
    ];
    const onClick: MenuProps["onClick"] = ({ key }) => {
        switch (key) {
            case MenuItemKeys.INFO:
                break;
            case MenuItemKeys.LOGOUT:
                if (userContext && userContext.email) {
                    invokeLogout(userContext.email, logoutHandler);
                }
                break;
        }
    };
    return (
        <Dropdown
            menu={{ items, onClick }}
            trigger={["click"]}
            placement="bottom"
        >
            <a onClick={(e) => e.preventDefault()}>
                <Avatar
                    style={{ backgroundColor: "#87d068" }}
                    icon={<UserOutlined />}
                />
            </a>
        </Dropdown>
    );
};
export default LoginedAvatar;
