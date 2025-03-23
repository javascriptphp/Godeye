/**
 * 币种信息映射表
 * 定义所有支持的币种及其信息
 */
export const coinInfoMap: Record<string, { name: string }> = {
    BTC: { name: "Bitcoin" },
    ETH: { name: "Ethereum" },
    SOL: { name: "Solana" },
    OP: { name: "Optimism" },
    DOGE: { name: "Dogecoin" },
    BONK: { name: "Bonk" },
    PEPE: { name: "Pepe" },
    WIF: { name: "Wif" },
    FLOKI: { name: "Floki" },
    SUI: { name: "Sui" },
    SEI: { name: "Sei" },
    FTM: { name: "Fantom" },
    ARKM: { name: "Arkime" },
    ORDI: { name: "Ordinals" },
    PENDLE: { name: "Pendle" },
    STX: { name: "Stacks" },
    ONDO: { name: "Ondo" },
    OM: { name: "Om" },
    ENA: { name: "Ena" },
    ZRX: { name: "Zrx" },
    TAO: { name: "Tao" },
    CKB: { name: "Ckb" },
};

/**
 * 有效币种列表，从coinInfoMap中派生
 */
export const validCoins = Object.keys(coinInfoMap);

// 有效图表类型
export const validChartTypes = ["t1", "t2", "t3"];

/**
 * 检查币种是否有效
 * @param coin 币种代码
 * @returns 币种是否有效
 */
export const isValidCoin = (coin: string): boolean => {
    return Boolean(
        coin && typeof coin === "string" && coin.toUpperCase() in coinInfoMap
    );
};

/**
 * 检查图表类型是否有效
 * @param type 图表类型
 * @returns 图表类型是否有效
 */
export const isValidChartType = (type: string): boolean => {
    return validChartTypes.includes(type.toLowerCase());
};

/**
 * 获取币种信息
 * @param coin 币种代码
 * @returns 币种名称和其他信息
 */
export const getCoinInfo = (coin: string) => {
    return coinInfoMap[coin.toUpperCase()] || { name: coin };
};

/**
 * 获取所有币种数据，包含完整信息
 * @returns 币种数据数组，每个币种包含symbol和name
 */
export const getAllCoinsData = () => {
    return validCoins.map((coin) => ({
        symbol: coin,
        name: coinInfoMap[coin].name,
    }));
};
