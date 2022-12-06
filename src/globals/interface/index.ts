export interface DataCoins {
    symbol: string;
    price: string;
}

export interface CoinsAttr {
    symbol: string;
    price: number;
    coin: string;
}

export interface CoinsResult {
    coin: string;
    BNB:number;
    USDT: number;
    ETH: number;
    BTC: number;
}

export type Coins = Omit<CoinsAttr, 'count'>;
