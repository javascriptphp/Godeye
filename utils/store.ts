import {create} from "zustand";
import {UserContext} from "@/types";

export type LoginHandler = (userContext: UserContext) => void;
export interface ZustandStore {
	userContext: UserContext|null;
	loginHandler: LoginHandler;
	logoutHandler: VoidFunction;
	loadSession: VoidFunction;
}

const useStore = create<ZustandStore>((set) => ({
	userContext: null,
	loginHandler: (userContext : UserContext) => {
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
			set({userContext: JSON.parse(userContextStr)});
		}
	}
}));
export default useStore;