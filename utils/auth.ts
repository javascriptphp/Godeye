export const getCookie = (key: string): string | null => {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((row) => row.startsWith(`${key}=`));
    return cookie ? cookie.split("=")[1] : null;
};

export const isLoginValid = (): boolean => {
    const expireAt = getCookie("expire_at");

    if (!expireAt) {
        console.warn("expire_at cookie not found");
        return false;
    }

    const expireDate = new Date(Number(expireAt));
    const currentDate = new Date();

    return currentDate < expireDate;
};
