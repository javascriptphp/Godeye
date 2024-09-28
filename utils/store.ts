import {create} from "zustand";
import {UserContext} from "@/types";

export type UserContextHandler = (userContext: UserContext|null) => void;
export interface ZustandStore {
	userContext: UserContext|null;
	loginHandler: UserContextHandler;
	logoutHandler: VoidFunction;
	loadSession: VoidFunction;
	updateExpireTime: UserContextHandler;
}

const useStore = create<ZustandStore>((set) => ({
	userContext: null,
	loginHandler: (userContext : UserContext|null) => {
		set({userContext: userContext});
		localStorage.setItem('userContext', JSON.stringify(userContext));
	},
	logoutHandler: () => {
		set({userContext: null})
		localStorage.removeItem('userContext');
	},
	loadSession: () => {
		const userContextStr: string|null = localStorage.getItem('userContext');
		if (userContextStr) {
			const expireTime = new Date((JSON.parse(userContextStr) as UserContext).expireTime);
			if (new Date(expireTime) > new Date()) {
				console.log("加载用户信息")

				set({userContext: JSON.parse(userContextStr)});
				console.log("加载用户信息后，立刻打印context",useStore.getState().userContext);
			}
		}
	},
	updateExpireTime: (userContext: UserContext|null) => {
		const date = new Date();
		if (userContext && userContext.expireTime > date) {
			const updatedContext = {...userContext, expireTime: new Date(date.setHours(date.getMinutes()+1))};
			set({userContext: updatedContext});
			localStorage.setItem('userContext', JSON.stringify(updatedContext));
		}
	}
}));
export default useStore;