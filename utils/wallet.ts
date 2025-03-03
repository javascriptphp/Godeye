export const formatBalance = (rawBalance: string) => {
	return (parseInt(rawBalance) / 1000000000000000000).toFixed(2)
}

export const formatChainAsNum = (chainIdHex: string) => {
	return parseInt(chainIdHex)
}

export const formatAddress = (addr: string) => {
	const upperAfterLastTwo = addr.slice(0,2) + addr.slice(2)
	return `${upperAfterLastTwo.substring(0, 5)}...${upperAfterLastTwo.substring(39)}`
}