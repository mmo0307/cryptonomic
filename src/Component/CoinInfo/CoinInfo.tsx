import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Plot from 'react-plotly.js';

import star from '../../assets/images/star.png';
import active_star from '../../assets/images/star_active.png';
import info_button from '../../assets/images/info-button.svg';

import { Skeleton } from '../Skeleton/Skeleton';
import { Error } from '../Error/Error';
import {
  Container,
  InfoBlock,
  MediaBlock,
  DescriptionCoin,
  Categories,
  Title,
  CoinTitleBlock,
  CoinTitle,
  CoinName,
  Rank,
  Name,
  Symbol,
  CoinButton,
  CoinButtonAttr,
  Star,
  ReadMore,
  Block,
  CoinPriceVolume,
  CoinPriceVolumeInfo,
  BlockPrice,
  PercentParagraph,
  PriceParagraph,
  InputPriceRange,
  PriceRangeBlock,
  PriceLowHigh,
  PriceTitle,
  ContainerChart
} from '../CoinInfo/coinInfo.style';

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
  high_24h: PriceData;
  low_24h: PriceData;
  market_cap: PriceData;
  total_volume: PriceData;
  total_supply: number;
  circulating_supply: number;
  sparkline_7d: {
    price: Price[];
  };
}

interface Tickers {
  last: number;
  converted_volume: PriceData;
  last_traded_at: string;
}

interface Data {
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

const CoinInfo: React.FC = () => {
  const [data_coin, setData] = useState<Data>({
    name: '',
    categories: [''],
    genesis_date: '',
    last_updated: '',
    market_cap_rank: '',
    symbol: '',
    block_time_in_minutes: '',
    image: {
      large: '',
      small: '',
      thumb: ''
    },
    community_data: {
      twitter_followers: 0
    },
    description: {
      en: ''
    },
    market_data: {
      current_price: {
        usd: 0
      },
      price_change_percentage_24h: 0,
      high_24h: {
        usd: 0
      },
      low_24h: {
        usd: 0
      },
      market_cap: {
        usd: 0
      },
      total_volume: {
        usd: 0
      },
      total_supply: 0,
      circulating_supply: 0,
      sparkline_7d: {
        price: []
      }
    },
    tickers: []
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  let { id } = useParams<string>();

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${id}?tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true`
      )
      .then(res => {
        setData(res.data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return <View data={data_coin} loading={loading} error={error} />;
};

const View: React.FC<{ loading: boolean; error: boolean; data: Data }> = ({
  loading,
  error,
  data
}) => {
  const Loading = loading ? <Skeleton /> : null;
  const errorMessage = error ? <Error /> : null;
  const {
    name,
    categories,
    market_cap_rank,
    image,
    description,
    symbol,
    market_data
  } = data;

  const [active, setActive] = useState<boolean>(false);

  const avgValue: number =
    ((market_data.current_price.usd - market_data.low_24h.usd) /
      (market_data.low_24h.usd - market_data.high_24h.usd)) *
    100;
  const percent: string = market_data.price_change_percentage_24h.toFixed(2);
  const flag: boolean = +percent > 0;

  let x_lines: any[] = [];
  let y_lines: any[] = [];

  for (let key in market_data.sparkline_7d.price) {
    x_lines.push(key);
    y_lines.push(market_data.sparkline_7d.price[key]);
  }

  return (
    <>
      {errorMessage}
      {Loading || (
        <>
          <Container>
            <InfoBlock>
              <CoinTitleBlock>
                <img
                  style={{ marginRight: '0.5rem' }}
                  src={image ? image.large : ''}
                  alt='Coin'
                  width={100}
                />
                <CoinTitle>
                  <CoinName>
                    <Name>{name}</Name>
                    <Symbol>{symbol}</Symbol>
                  </CoinName>
                  <Rank>Rank #{market_cap_rank}</Rank>
                </CoinTitle>
                <CoinButtonAttr>
                  <Star onClick={() => setActive(!active)}>
                    <img
                      src={active ? active_star : star}
                      alt='Star'
                      width={30}
                    />
                  </Star>
                  <CoinButton>+ Add Transition</CoinButton>
                </CoinButtonAttr>
              </CoinTitleBlock>

              <p>{symbol.toUpperCase()} PRICE</p>
              <BlockPrice>
                <PriceParagraph>
                  ${market_data.current_price.usd}
                </PriceParagraph>
                <PercentParagraph flag={flag}>
                  {market_data.price_change_percentage_24h.toFixed(2)}%
                </PercentParagraph>
              </BlockPrice>

              <PriceRangeBlock>
                <div>
                  <PriceTitle>
                    <p>Price Range</p>
                  </PriceTitle>
                  <div></div>
                </div>

                <InputPriceRange
                  type='range'
                  onChange={() => console.log(Math.abs(avgValue))}
                  value={Math.abs(avgValue)}
                  min={market_data.low_24h.usd}
                  max={market_data.high_24h.usd}
                />

                <PriceLowHigh>
                  <p>
                    Low {'$'}
                    {market_data.low_24h.usd}
                  </p>
                  <p>
                    High {'$'}
                    {market_data.high_24h.usd}
                  </p>
                </PriceLowHigh>
              </PriceRangeBlock>

              <Block>
                <div>
                  <CoinPriceVolumeInfo>
                    Market Cap <img height={13} src={info_button} alt='' />
                  </CoinPriceVolumeInfo>
                  <CoinPriceVolume>
                    ${(market_data.market_cap.usd / 1000000000).toFixed(2)} B
                  </CoinPriceVolume>
                </div>

                <div>
                  <CoinPriceVolumeInfo>
                    Total Supply <img height={13} src={info_button} alt='' />
                  </CoinPriceVolumeInfo>
                  <CoinPriceVolume>
                    ${(market_data.total_supply / 1000000).toFixed(4)}{' '}
                    {symbol.toUpperCase()}
                  </CoinPriceVolume>
                </div>

                <div>
                  <CoinPriceVolumeInfo>
                    Circ. Supply <img height={13} src={info_button} alt='' />
                  </CoinPriceVolumeInfo>
                  <CoinPriceVolume>
                    ${(market_data.circulating_supply / 1000000).toFixed(4)}{' '}
                    {symbol.toUpperCase()}
                  </CoinPriceVolume>
                </div>

                <div>
                  <CoinPriceVolumeInfo>
                    Volume 24h <img height={13} src={info_button} alt='' />
                  </CoinPriceVolumeInfo>
                  <CoinPriceVolume>
                    ${(market_data.total_volume.usd / 1000000000).toFixed(2)} B
                  </CoinPriceVolume>
                </div>
              </Block>
            </InfoBlock>
            <MediaBlock>
              <Title>About {symbol.toUpperCase()}</Title>
              <DescriptionCoin>
                {description && description.en !== ''
                  ? description.en.substr(0, 200) + '...'
                  : ''}
              </DescriptionCoin>
              {description && description.en === '' ? null : (
                <ReadMore>Read more</ReadMore>
              )}
              <Title mt='10px'>Tags</Title>
              <Categories>{categories.map(cat => cat + '; ')}</Categories>
            </MediaBlock>
          </Container>

          <ContainerChart>
            <Plot
              data={[
                {
                  x: x_lines,
                  y: y_lines,
                  type: 'scatter',
                  mode: 'lines+markers',
                  marker: { color: 'red' }
                }
                //{type: 'bar', x: x_bar, y: y_bar},
              ]}
              layout={{ width: 800, height: 600, title: name }}
            />
          </ContainerChart>
        </>
      )}
    </>
  );
};

export { CoinInfo };
