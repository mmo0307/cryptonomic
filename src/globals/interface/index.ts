export interface DataCoins {
    symbol: string;
    price: number;
}

export interface CoinsAttr {
    symbol: string;
    price: number;
    coin: string;
}

export interface DataCoin {
    coin: string;
    price: number;
}

export interface ResultCoins extends DataCoin{
    percent: number;
    profitPrice: string;
    strategy: {
        buyCoin: number,
        sellPairCoin: number,
        sellPairUsdt: number
    }
}

export interface CoinRes {
    USDT: ResultCoins[],
    BTC: ResultCoins[],
    ETH: ResultCoins[],
    BNB: ResultCoins[]
}


