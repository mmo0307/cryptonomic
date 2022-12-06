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
    symbol: string;
    priceBtc: number;
   // priceEth: number;
    //priceBnb: number;
    percent: number;
}

export type Coins = Omit<CoinsAttr, 'count'>;
