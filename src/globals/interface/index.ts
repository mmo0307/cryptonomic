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

type DataCoin = {
    coin: string;
    price: number;
    percent?: number;
    profitPrice?: string;
    strategy?: {
        buyCoin: number,
        sellPairCoin: number,
        sellPairUsdt: number
    }
}

export interface CoinRes {
    USDT: DataCoin[],
    BTC: DataCoin[],
    ETH: DataCoin[],
    BNB:DataCoin[],
    [key: string]: DataCoin[];
}


