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
    BNB:{
        price: number;
        bnbPrice:number;
    };
    USDT: number;
    ETH: {
        price: number;
        ethPrice:number;
    };
    BTC: {
        price: number;
        btcPrice:number;
    };
    count: number;
}


