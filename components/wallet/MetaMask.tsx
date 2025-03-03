import React from "react";
import {SelectedWallet} from "@/components/wallet/SelectedWallets";
import {WalletError} from "@/components/wallet/WalletError";
import {WalletProvider} from "@/components/wallet/WalletProvider";
import {WalletList} from "@/components/wallet/WalletList";

export const MetaMask = () => {
	return (
		<WalletProvider>
			<WalletList/>
			<hr/>
			<SelectedWallet/>
			<WalletError/>
		</WalletProvider>
	)

}