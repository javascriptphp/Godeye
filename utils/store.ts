import {create} from "zustand";
import {DEFAULT_LANGUAGE, SystemContext, UserContext} from "@/types";

export type UserContextHandler = (userContext: UserContext|null) => void;
export type ExpireTimeHandler = (expireAt: Date) => void;
export interface ZustandStore {
	userContext: UserContext|null;
	systemContext: SystemContext|null;
	setLanguage: (language: string) => void;
	loginHandler: UserContextHandler;
	logoutHandler: VoidFunction;
	loadSession: VoidFunction;
	updateExpireTime: ExpireTimeHandler;
}

const useStore = create<ZustandStore>((set,getState) => ({
	userContext: null,
	systemContext: {
		language: DEFAULT_LANGUAGE
	},
	setLanguage: (language: string) => {
		set({systemContext: {...getState().systemContext, language: language}});
		localStorage.setItem('systemContext', JSON.stringify(getState().systemContext));
	},
	loginHandler: (userContext : UserContext|null) => {
		set({userContext: userContext});
		localStorage.setItem('userContext', JSON.stringify(userContext));
	},
	logoutHandler: () => {
		set({userContext: null})
		set({systemContext: null})
		localStorage.removeItem('systemContext');
		localStorage.removeItem('userContext');
	},
	loadSession: () => {
		const userContextStr: string|null = localStorage.getItem('userContext');
		const systemContextStr: string|null = localStorage.getItem('systemContext');
		if (systemContextStr) {
			set({systemContext: JSON.parse(systemContextStr)});
		}
		if (userContextStr) {
			const expireTime = new Date((JSON.parse(userContextStr) as UserContext).expireTime);
			if (new Date(expireTime) > new Date()) {
				console.log("加载用户信息")

				set({userContext: JSON.parse(userContextStr)});
				console.log("加载用户信息后，立刻打印context",useStore.getState().userContext);
			}
		}
	},
	updateExpireTime: (expireAt: Date) => {
		const userContext = getState().userContext;
		if (userContext) {
			const updatedContext = {...userContext, expireTime: expireAt};
			set({userContext: updatedContext});
			localStorage.setItem('userContext', JSON.stringify(updatedContext));
		}
	}
}));
export default useStore;