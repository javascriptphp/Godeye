import {UserOutlined} from "@ant-design/icons";
import {Avatar, Button, Dropdown, MenuProps} from "antd";
import React from "react";
import {useRouter} from "next/router";
import {invokeLogout} from "@/service";
import useStore from "@/utils/store";

const enum MenuItemKeys {
	INFO = 'info', LOGOUT = 'logout',
}

const items: MenuProps['items'] = [
	{
		label: (
			<Button type="link">个人信息</Button>
		),
		key: MenuItemKeys.INFO,
	},
	{
		type: 'divider',
	},
	{
		label: (
			<Button type="link">退出登录</Button>
		),
		key: MenuItemKeys.LOGOUT,
	},
];

const LoginedAvatar: React.FC = () => {
	const router = useRouter();
	const {userContext, logoutHandler} = useStore();
	const onClick: MenuProps['onClick'] = ({key}) => {
		switch (key) {
			case MenuItemKeys.INFO:
				break;
			case MenuItemKeys.LOGOUT:
				if (userContext && userContext.logined && userContext.email) {
					invokeLogout(userContext.email, logoutHandler).then(r => {
						window.location.reload();
					});
				}
				break;
		}
	};
	return (
		<Dropdown menu={{items, onClick}} trigger={['click']} placement="bottom">
			<a onClick={(e) => e.preventDefault()}>
				<Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
			</a>
		</Dropdown>
	);
};
export default LoginedAvatar;