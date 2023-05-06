import React, { ChangeEvent, useState } from 'react';
import { Error, Skeleton } from '@root/entities';
import { Coin } from '@root/features';
import { deviceMin } from '@shared/lib/constants/device';
import useMediaQuery from '@shared/lib/hooks/use-media-query';
import { useGetCoinsQuery } from '@store/api';

import styles from './coin-main.module.scss';

interface DataItem {
  id: number;
  name: string;
  image: string;
  symbol: string;
  market_cap: string;
  current_price: string;
  price_change_percentage_24h: number;
  marketcap: string;
}

const CoinMain: React.FC = () => {
  const { data, isError, isLoading } = useGetCoinsQuery({
    vs_currency: 'usd'
    // per_page: 10,
    // page: 1
  });

  const [search, setSearch] = useState('');

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const errorMessage = isError ? <Error /> : null;

  const deviceLaptop = useMediaQuery(deviceMin.laptop);

  const deviceTablet = useMediaQuery(deviceMin.tablet);

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
        <Skeleton />
      ) : (
        data
          .filter((el: DataItem) =>
            el.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((data: DataItem, index: number) => (
            <Coin
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
};

export { CoinMain };
