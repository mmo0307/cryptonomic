export interface DataCoins {
    symbol: string;
    price: number;
}

export interface CoinsAttr {
    symbol: string;
    price: number;
    coin: string;
}

export interface CoinPairAttr {
    price: number;
    profitPrice:number;
    percent:number;
}

export interface CoinsResult {
    coin: string;
    BNB?:CoinPairAttr;
    ETH?: CoinPairAttr;
    BTC?: CoinPairAttr;
    usdtPrice: number;
    count: number;
}


