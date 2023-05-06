import React from 'react';

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
  usd: number | string;
}

interface MarketData {
  price_change_24h: number;
  current_price: PriceData;
  market_cap_rank: number;
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
  price_change_percentage_1h_in_currency: PriceData;
  price_change_percentage_24h_in_currency: PriceData;
  price_change_percentage_7d_in_currency: PriceData;
  price_change_percentage_14d_in_currency: PriceData;
  price_change_percentage_30d_in_currency: PriceData;
  price_change_percentage_60d_in_currency: PriceData;
  price_change_percentage_200d_in_currency: PriceData;
  price_change_percentage_1y_in_currency: PriceData;
  market_cap_change_percentage_24h_in_currency: PriceData;
  market_cap_change_24h_in_currency: PriceData;
  price_change_24h_in_currency: PriceData;
  circulating_supply: number;
  ath: PriceData;
  ath_change_percentage: PriceData;
  ath_date: PriceData;
  atl: PriceData;
  atl_change_percentage: PriceData;
  atl_date: PriceData;
  max_supply: number;
}

interface DataCoin {
  name: string;
  categories: string[];
  genesis_date: string;
  market_cap_rank: string;
  image: Image;
  description: Description;
  symbol: string;
  community_data: CommunityData;
  market_data: MarketData;
}

type RadioInputChangeEvent = React.ChangeEvent<HTMLInputElement> & {
  target: {
    value: string;
  };
};

interface ApexChartData {
  name: string;
  data: number[];
}

interface ChartOptions {
  chart: {
    height: number;
    type:
      | 'area'
      | 'line'
      | 'bar'
      | 'pie'
      | 'donut'
      | 'radialBar'
      | 'scatter'
      | 'bubble'
      | 'heatmap'
      | 'treemap'
      | 'boxPlot'
      | 'candlestick'
      | 'radar'
      | 'polarArea'
      | 'rangeBar'
      | 'rangeArea';
  };
  dataLabels: {
    enabled: boolean;
  };
  stroke: {
    curve: 'smooth';
  };
  xaxis: {
    type: 'datetime';
    categories: string[];
  };
  tooltip: {
    x: {
      format: string;
    };
  };
}

interface ChartObject {
  series: ApexChartData[];
  options: ChartOptions;
}

interface ChartData {
  prices: number[][];
  market_caps: number[][];
  total_volumes: number[][];
}

export type { ChartData, ChartObject, DataCoin, RadioInputChangeEvent };
