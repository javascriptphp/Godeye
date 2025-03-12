import { useContext } from "react";
import { WalletProviderContext } from "@/components/wallet/WalletProvider";
import styled from "styled-components";

const WalletErrorWrapper = styled.div`
    margin-top: 1em;
    border-radius: 0.5em;
    padding: 16px;
    color: #efefef;
    background-color: transparent;
    user-select: none;
`;
export const WalletError = () => {
    const useWalletProvider = () => useContext(WalletProviderContext);
    const { errorMessage, clearError } = useWalletProvider();
    const isError = !!errorMessage;

    return (
        <WalletErrorWrapper style={isError ? { backgroundColor: "brown" } : {}}>
            {isError && (
                <div onClick={clearError}>
                    <strong>Error:</strong> {errorMessage}
                </div>
            )}
        </WalletErrorWrapper>
    );
};
