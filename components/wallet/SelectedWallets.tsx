import {useContext} from "react";
import {WalletProviderContext} from "@/components/wallet/WalletProvider";
import {formatAddress} from "@/utils/wallet";
import styled from "styled-components";

const UserAccountStyle = styled.div`
    margin-top: 1em;
    border-radius: 0.5em;
    padding: 16px;
    color: #EFEFEF;
    background-color: transparent;
    user-select: none;
`;
const WalletsContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;

    padding: 0.6em 1.2em;
    margin-bottom: 0.5em;

    font-family: inherit;
    font-size: 1em;
    font-weight: 500;
`;
const SelectedWalletImg = styled.img`
    width: 2em;
    height: 1.5em;
    margin-right: 1em;

`;
export const SelectedWallet = () => {
	const useWalletProvider = () => useContext(WalletProviderContext);
	const {selectedWallet, selectedAccount, disconnectWallet} = useWalletProvider();

	return (
		<>
			<UserAccountStyle><h2>{selectedAccount ? '' : 'No '}Wallet Selected</h2></UserAccountStyle>
			{selectedAccount && selectedWallet // 确保 selectedAccount 和 selectedWallet 都非空
				?
				<>
					<WalletsContainer>
						<SelectedWalletImg src={selectedWallet.info?.icon} alt={selectedWallet.info?.name || "Wallet Icon"}/>
						<div>{selectedWallet.info?.name || "Unknown Wallet"}</div>
						<div>({formatAddress(selectedAccount)})</div>
						<div><strong>uuid:</strong> {selectedWallet.info?.uuid || "N/A"}</div>
						<div><strong>rdns:</strong> {selectedWallet.info?.rdns || "N/A"}</div>
					</WalletsContainer>
					<button onClick={disconnectWallet}>Disconnect Wallet</button>
				</>
				:
				<p>No wallet is selected.</p> // 或者其他的提示信息
			}
		</>
	)
}