import { create } from "zustand";
import { DEFAULT_LANGUAGE, SystemContext, UserContext } from "@/types";

export type UserContextHandler = (userContext: UserContext | null) => void;
export type ExpireTimeHandler = (expireAt: Date) => void;
export interface ZustandStore {
    userContext: UserContext | null;
    systemContext: SystemContext | null;
    getUserContext: () => UserContext | null;
    getSystemContext: () => SystemContext | null;
    setLanguage: (language: string) => void;
    setSessionChecked: (checked: boolean) => void;
    loginHandler: UserContextHandler;
    logoutHandler: VoidFunction;
    loadSession: VoidFunction;
    updateExpireTime: ExpireTimeHandler;
}

const useStore = create<ZustandStore>((set, getState) => ({
    userContext: null,
    systemContext: {
        language: DEFAULT_LANGUAGE,
        isSessionChecked: false,
    },
    getUserContext: () => {
        return getState().userContext;
    },
    getSystemContext: () => {
        return getState().systemContext;
    },
    setLanguage: (language: string) => {
        set({
            systemContext: { ...getState().systemContext, language: language },
        });
        localStorage.setItem(
            "systemContext",
            JSON.stringify(getState().systemContext)
        );
    },
    setSessionChecked: (isChecked: boolean) => {
        set({
            systemContext: {
                ...getState().systemContext,
                isSessionChecked: isChecked,
            },
        });
        localStorage.setItem(
            "systemContext",
            JSON.stringify(getState().systemContext)
        );
    },
    loginHandler: (userContext: UserContext | null) => {
        set({ userContext: userContext });
        localStorage.setItem("userContext", JSON.stringify(userContext));
    },
    logoutHandler: () => {
        set({ userContext: null });
        set({ systemContext: null });
        localStorage.removeItem("systemContext");
        localStorage.removeItem("userContext");
    },
    loadSession: () => {
        const userContextStr: string | null =
            localStorage.getItem("userContext");
        const systemContextStr: string | null =
            localStorage.getItem("systemContext");
        if (systemContextStr) {
            set({ systemContext: JSON.parse(systemContextStr) });
        }
        if (userContextStr) {
            const expireTime = new Date(
                (JSON.parse(userContextStr) as UserContext).expireTime
            );
            if (new Date(expireTime) > new Date()) {
                set({ userContext: JSON.parse(userContextStr) });
            }
        }
    },
    updateExpireTime: (expireAt: Date) => {
        const userContext = getState().userContext;
        if (userContext) {
            const updatedContext = { ...userContext, expireTime: expireAt };
            set({ userContext: updatedContext });
            localStorage.setItem("userContext", JSON.stringify(updatedContext));
        }
    },
}));
export default useStore;
