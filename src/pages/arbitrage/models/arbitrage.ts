interface DataCoins {
  symbol: string;
  price: number;
}

interface CoinsAttr {
  symbol: string;
  price: number;
  coin: string;
}

interface DataCoin {
  coin: string;
  price: number;
}

interface ResultCoins extends DataCoin {
  percent: number;
  profitPrice: string;
  strategy: {
    buyCoin: number | string;
    sellPairCoin: number | string;
    sellPairUsdt: number | string;
  };
}

interface CoinRes {
  USDT: ResultCoins[];
  BTC: ResultCoins[];
  ETH: ResultCoins[];
  BNB: ResultCoins[];
  [key: string]: ResultCoins[];
}

export type { CoinRes, CoinsAttr, DataCoin, DataCoins, ResultCoins };
