import { useContext } from "react";
import { WalletProviderContext } from "@/components/wallet/WalletProvider";
import styled from "styled-components";

const WalletListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
export const WalletList = () => {
    const useWalletProvider = () => useContext(WalletProviderContext);
    const { wallets, connectWallet } = useWalletProvider();

    return (
        <>
            <h2>Wallets Detected:</h2>
            <WalletListWrapper>
                {Object.keys(wallets).length > 0 ? (
                    Object.values(wallets).map(
                        (provider: EIP6963ProviderDetail) => (
                            <button
                                key={provider.info.uuid}
                                onClick={() =>
                                    connectWallet(provider.info.rdns)
                                }
                            >
                                <img
                                    src={provider.info.icon}
                                    alt={provider.info.name}
                                />
                                <div>{provider.info.name}</div>
                            </button>
                        )
                    )
                ) : (
                    <div>there are no Announced Providers</div>
                )}
            </WalletListWrapper>
        </>
    );
};
