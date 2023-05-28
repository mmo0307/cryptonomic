import React from 'react';
import { useCoin } from '@pages/coin/coin.props';
import { DataItem } from '@pages/coin/models';
import { Error, SkeletonComponent } from '@root/entities';
import { Coin as CoinView } from '@root/features';
import { hoc } from '@shared/lib';

import styles from './coin.module.scss';

const Coin = hoc(
  useCoin,
  ({
    deviceTablet,
    deviceLaptop,
    handleSearch,
    search,
    data,
    isError,
    isLoading
  }) => {
    const errorMessage = isError ? <Error /> : null;

    return (
      <div className={styles.coin__app}>
        <div className={styles.coin__search}>
          <h1>Search a currency</h1>
          <form>
            <input
              type='text'
              placeholder='Search'
              className='coin-input'
              onChange={handleSearch}
            />
          </form>
        </div>
        {errorMessage}

        <div className={styles.coin__container}>
          <div className={styles.coin__container_row}>
            <div className={styles.coin__container_row_info}>
              <p>Name</p>
              {deviceTablet ? <p>Symbol</p> : null}
            </div>
            <div className={styles.coin__container_row_dataTitle}>
              <p className={styles.coin__container_row_dataTitle_text_price}>
                Price
              </p>
              {deviceLaptop ? (
                <p className={styles.coin__container_row_dataTitle_text_volume}>
                  Volume
                </p>
              ) : null}
              <p className={styles.coin__container_row_dataTitle_text_percent}>
                Percent
              </p>
              {deviceLaptop ? (
                <p className={styles.coin__container_row_dataTitle_text_mktCap}>
                  Mkt Cap
                </p>
              ) : null}
            </div>
          </div>
        </div>

        {isLoading ? (
          <SkeletonComponent />
        ) : (
          data
            .filter((el: DataItem) =>
              el.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((data: DataItem, index: number) => (
              <CoinView
                key={index}
                id={data.id}
                name={data.name}
                image={data.image}
                symbol={data.symbol}
                volume={data.market_cap}
                price={data.current_price}
                priceChange={data.price_change_percentage_24h}
                marketcap={data.market_cap}
              />
            ))
        )}
      </div>
    );
  }
);

export { Coin };
