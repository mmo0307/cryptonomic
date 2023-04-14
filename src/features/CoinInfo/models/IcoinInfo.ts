interface CommunityData {
  twitter_followers: number;
}

interface Description {
  en: string;
}

interface Image {
  large: string;
  small: string;
  thumb: string;
}

interface PriceData {
  usd: number;
}

type Price = {
  [key: number]: number;
};

interface MarketData {
  current_price: PriceData;
  price_change_percentage_24h: number;
  price_change_percentage_7d: number;
  price_change_percentage_14d: number;
  price_change_percentage_30d: number;
  price_change_percentage_60d: number;
  price_change_percentage_200d: number;
  price_change_percentage_1y: number;
  high_24h: PriceData;
  low_24h: PriceData;
  market_cap: PriceData;
  total_volume: PriceData;
  total_supply: number;
  circulating_supply: number;
  sparkline_7d: {
    price: Price[];
  };
  ath: {
    usd: number;
  };
}

interface Tickers {
  last: number;
  converted_volume: PriceData;
  last_traded_at: string;
}

export interface Data {
  name: string;
  categories: string[];
  genesis_date: string;
  last_updated: string;
  market_cap_rank: string;
  image: Image;
  description: Description;
  symbol: string;
  block_time_in_minutes: string;
  community_data: CommunityData;
  market_data: MarketData;
  tickers: Tickers[];
}
