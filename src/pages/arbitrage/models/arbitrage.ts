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

export interface ResultCoins extends DataCoin {
  percent: number;
  profitPrice: string;
  strategy: {
    buyCoin: number | string;
    sellPairCoin: number | string;
    sellPairUsdt: number | string;
  };
}

export interface CoinRes {
  USDT: ResultCoins[];
  BTC: ResultCoins[];
  ETH: ResultCoins[];
  BNB: ResultCoins[];
}
