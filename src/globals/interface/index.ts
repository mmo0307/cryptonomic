export interface DataCoins {
    symbol: string;
    price: number;
}

export interface CoinsAttr {
    symbol: string;
    price: number;
    coin: string;
}

export interface CoinsResult {
    coin: string;
    BNB?:{
        price: number;
        bnbPrice:number;
    };
    ETH?: {
        price: number;
        ethPrice:number;
    };
    BTC?: {
        price: number;
        btcPrice:number;
    };
    usdtPrice: number;
    count: number;
}


