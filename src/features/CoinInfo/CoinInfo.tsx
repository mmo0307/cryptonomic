import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Error, Modal, Skeleton, TradingViewWidget } from '@root/entities';
import { Infarmation } from '@shared/ui/assets/icons/Infarmation';
import {
  BrowserSite,
  Discord,
  Github,
  Instagram,
  LinkedIn,
  Reddit,
  Telegram,
  Twitter,
  Youtube
} from '@shared/ui/assets/icons/social';
import { Star } from '@shared/ui/assets/icons/Star';
import { Triangle } from '@shared/ui/assets/icons/Triangle';
import axios from 'axios';

import { Data } from './models/IcoinInfo';

import './coinInfo.scss';

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
      price_change_percentage_7d: 0,
      price_change_percentage_14d: 0,
      price_change_percentage_30d: 0,
      price_change_percentage_60d: 0,
      price_change_percentage_200d: 0,
      price_change_percentage_1y: 0,
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
      },
      ath: {
        usd: 0
      }
    },
    tickers: []
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const { id } = useParams<string>();

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
  const [active, setActive] = useState<boolean>(false);
  const Loading = loading ? <Skeleton /> : null;
  const errorMessage = error ? <Error /> : null;
  const {
    categories,
    name,
    market_cap_rank,
    image,
    description,
    symbol,
    market_data
  } = data;

  const avgValue: number =
    ((market_data.current_price.usd - market_data.low_24h.usd) /
      (market_data.low_24h.usd - market_data.high_24h.usd)) *
    100;
  const backgroundValue =
    Math.abs(avgValue) > 0
      ? `linear-gradient(to right, #00FF38 0%, #00FF38 ${Math.abs(
          avgValue
        )}%, #ffffff ${Math.abs(avgValue)}%, #ffffff 100%)`
      : 'linear-gradient(to right, #00FF38 0%, #00FF38 0%, #ffffff 0%, #ffffff 100%)';

  return (
    <>
      {errorMessage}

      {Loading || (
        <section>
          <div className='container'>
            <div className='block-info'>
              <div className='block-info-title'>
                <Link to='/'>&lt; All Coins</Link>
                {/*<span className='block-info-title-date'>*/}
                {/*  Update {new Date().toDateString()}*/}
                {/*</span>*/}
              </div>
              <div className='block-info-coin-block'>
                <div>
                  <div className='coin-container'>
                    <span className='coin-container-rating'>
                      Rating #{market_cap_rank}
                    </span>
                    <div className='coin-container-info'>
                      <img
                        className='coin-container-info-logo'
                        src={image ? image.small : ''}
                        alt='Coin'
                      />
                      <span className='coin-container-info-name'>{name}</span>
                      <span className='coin-container-info-symbol'>
                        {symbol}
                      </span>
                    </div>
                    <span className='coin-container-text-price'>
                      Price 1 {symbol.toUpperCase()}
                    </span>
                  </div>
                  <div className='price-container'>
                    <span className='price-container-coin-price'>
                      ${market_data.current_price.usd}
                    </span>
                    <span
                      className={`price-container-percent ${
                        market_data.price_change_percentage_24h < 0
                          ? 'down'
                          : 'grow'
                      }`}
                    >
                      <Triangle color='#FF0000' />
                      {market_data.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  </div>

                  <div className='day-container'>
                    <div className='day-container-title-block'>
                      <span className='red'>{market_data.low_24h.usd}</span>
                      <span className='green'>{market_data.high_24h.usd}</span>
                    </div>

                    <input
                      style={{ background: backgroundValue }}
                      type='range'
                      min={market_data.low_24h.usd}
                      max={market_data.high_24h.usd}
                      className='day-container-range-price'
                    />

                    <div className='day-container-title-block'>
                      <span className='red'>Low</span>
                      <span className='green'>High</span>
                    </div>
                  </div>
                </div>

                <div>
                  <button className='favorite-button'>
                    <Star color='#fff' />
                    Add to favorite
                  </button>
                  <div className='market-coin-block'>
                    <div className='market-coin-block-info'>
                      <span className='market-coin-block-info-text'>
                        market capitalization
                        <Infarmation />
                      </span>
                      <span className='market-coin-block-info-price'>
                        ${(market_data.market_cap.usd / 1000000000).toFixed(2)}{' '}
                        B
                      </span>
                    </div>
                    <div className='market-coin-block-info'>
                      <span className='market-coin-block-info-text'>
                        all time high
                        <Infarmation />
                      </span>
                      <span className='market-coin-block-info-price'>
                        ${market_data.ath.usd}
                      </span>
                    </div>
                    <div className='market-coin-block-info'>
                      <span className='market-coin-block-info-text'>
                        circulating supply
                        <Infarmation />
                      </span>
                      <span className='market-coin-block-info-price'>
                        ${(market_data.circulating_supply / 1000000).toFixed(2)}{' '}
                        B
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='block-info'>
              <div className='block-info-description'>
                <span className='block-info-description-title'>
                  Information about {name.toUpperCase()}
                </span>
                <span className='block-info-description-text'>
                  {description && description.en !== ''
                    ? description.en.substr(0, 200) + '...'
                    : ''}
                </span>
                <button
                  className='block-info-description-button'
                  onClick={() => setActive(true)}
                >
                  Read more
                </button>
              </div>

              <div className='block-info-social'>
                <span className='block-info-social-title'>Social network</span>
                <div className='block-info-social-block'>
                  <div className='block-info-social-block-circle'>
                    <Twitter />
                  </div>
                  <div className='block-info-social-block-circle'>
                    <Instagram />
                  </div>
                  <div className='block-info-social-block-circle'>
                    <Youtube />
                  </div>
                  <div className='block-info-social-block-circle'>
                    <Discord />
                  </div>
                  <div className='block-info-social-block-circle'>
                    <Telegram />
                  </div>
                  <div className='block-info-social-block-circle'>
                    <BrowserSite />
                  </div>
                  <div className='block-info-social-block-circle'>
                    <LinkedIn />
                  </div>
                  <div className='block-info-social-block-circle'>
                    <Reddit />
                  </div>
                  <div className='block-info-social-block-circle'>
                    <Github />
                  </div>
                </div>
              </div>

              <div className='block-info-tags'>
                <span className='block-info-tags-title'>Tags</span>
                <div className='block-info-tags-block'>
                  {categories.map(item => (
                    <span
                      key={item}
                      className='block-info-tags-block-tags-text'
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className='percent-container'>
            <div className='percent-container-elements'>
              <div className='percent-container-elements-block'>
                <span className='time-date'>24H</span>
                <span
                  className={`time-percent ${
                    market_data.price_change_percentage_24h < 0
                      ? 'down'
                      : 'grow'
                  }`}
                >
                  <Triangle color='#FF0000' />{' '}
                  {market_data.price_change_percentage_24h.toFixed(2)}%
                </span>
              </div>
              <div className='percent-container-elements-block'>
                <span className='time-date'>7D</span>
                <span
                  className={`time-percent ${
                    market_data.price_change_percentage_7d < 0 ? 'down' : 'grow'
                  }`}
                >
                  <Triangle color='#FF0000' />{' '}
                  {market_data.price_change_percentage_7d.toFixed(2)}%
                </span>
              </div>
              <div className='percent-container-elements-block'>
                <span className='time-date'>14D</span>
                <span
                  className={`time-percent ${
                    market_data.price_change_percentage_14d < 0
                      ? 'down'
                      : 'grow'
                  }`}
                >
                  <Triangle color='#FF0000' />{' '}
                  {market_data.price_change_percentage_14d.toFixed(2)}%
                </span>
              </div>
              <div className='percent-container-elements-block'>
                <span className='time-date'>30D</span>
                <span
                  className={`time-percent ${
                    market_data.price_change_percentage_30d < 0
                      ? 'down'
                      : 'grow'
                  }`}
                >
                  <Triangle color='#FF0000' />{' '}
                  {market_data.price_change_percentage_30d.toFixed(2)}%
                </span>
              </div>
              <div className='percent-container-elements-block'>
                <span className='time-date'>60D</span>
                <span
                  className={`time-percent ${
                    market_data.price_change_percentage_60d < 0
                      ? 'down'
                      : 'grow'
                  }`}
                >
                  <Triangle color='#FF0000' />{' '}
                  {market_data.price_change_percentage_60d.toFixed(2)}%
                </span>
              </div>
              <div className='percent-container-elements-block'>
                <span className='time-date'>200D</span>
                <span
                  className={`time-percent ${
                    market_data.price_change_percentage_200d < 0
                      ? 'down'
                      : 'grow'
                  }`}
                >
                  <Triangle color='#FF0000' />{' '}
                  {market_data.price_change_percentage_200d.toFixed(2)}%
                </span>
              </div>
              <div className='percent-container-elements-block'>
                <span className='time-date'>1Y</span>
                <span
                  className={`time-percent ${
                    market_data.price_change_percentage_1y < 0 ? 'down' : 'grow'
                  }`}
                >
                  <Triangle color='#FF0000' />{' '}
                  {market_data.price_change_percentage_1y.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>

          <TradingViewWidget
            width='980'
            height='610'
            symbol={symbol.toUpperCase()}
          />
        </section>
      )}

      <Modal active={active} setActive={setActive}>
        <div>{description.en}</div>
      </Modal>
    </>
  );
};

export { CoinInfo };
