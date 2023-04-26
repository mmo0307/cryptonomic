import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FavoriteButton } from '@entities/buttons';
import { Error, Skeleton, TradingViewWidget } from '@root/entities';
import axios from 'axios';
import classNames from 'classnames';

import { Data } from './models/IcoinInfo';

import styles from './coinInfo.module.scss';

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
      price_change_24h: 0,
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
  const Loading = loading ? <Skeleton /> : null;

  const errorMessage = error ? <Error /> : null;

  const { name, market_cap_rank, image, symbol, market_data } = data;

  return (
    <>
      {errorMessage}
      {Loading || (
        <section>
          <div className={styles.wrapper}>
            <div className={styles.wrapper_block}>
              <div className={styles.block}>
                <img
                  className={styles.market__logo}
                  src={image ? image.large : ''}
                  alt='Coin'
                />
                <span className={styles.market__cap}>#{market_cap_rank}</span>
              </div>

              <div>
                <div className={styles.market__info}>
                  <span className={styles.market__info_name}>{name}</span>
                  <span className={styles.market__info_symbol}>
                    {symbol.toUpperCase()}/USD
                  </span>
                </div>

                <div className={styles.market__info_coin}>
                  <div className={styles.market__info_coin_block}>
                    <span className={styles.market__info_coin_price_title}>
                      {market_data.current_price.usd}
                    </span>
                    <span className={styles.market__info_coin_symbol}>USD</span>
                  </div>

                  <span
                    className={classNames(styles.market__info_coin_percent, {
                      [styles.market__info_coin_percent_red]: true
                    })}
                  >
                    {market_data.price_change_24h.toFixed(2)}
                  </span>
                  <span
                    className={classNames(styles.market__info_coin_price, {
                      [styles.market__info_coin_price_red]: true
                    })}
                  >
                    {market_data.price_change_percentage_24h.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>

            <div>
              <FavoriteButton />
            </div>
          </div>

          <TradingViewWidget
            width='980'
            height='610'
            symbol={symbol.toUpperCase()}
          />
        </section>
      )}
    </>
  );
};

export { CoinInfo };
