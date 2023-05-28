import React from 'react';
import { Link } from 'react-router-dom';
import { deviceMin } from '@shared/lib/constants/device';
import useMediaQuery from '@shared/lib/hooks/use-media-query';
import classNames from 'classnames';

import styles from './coin.module.scss';

const Coin: React.FC<{
  id: number;
  name: string;
  image: string;
  symbol: string;
  volume: string;
  price: string;
  priceChange: number;
  marketcap: string;
}> = ({ image, name, symbol, price, volume, id, priceChange, marketcap }) => {
  const deviceLaptop = useMediaQuery(deviceMin.laptop);
  const deviceMobileL = useMediaQuery(deviceMin.mobileL);

  return (
    <Link to={`/coin/${id}`}>
      <div className={styles.coin__container}>
        <div className={styles.coin__container_row}>
          <div className={styles.coin__container_row_info}>
            <img src={image} alt='crypto' />
            <p>{name}</p>
            {deviceMobileL ? <p>{symbol}</p> : null}
          </div>
          <div className={styles.coin__container_row_dataTitle}>
            <p className={styles.coin__container_row_dataTitle_text_price}>
              ${price}
            </p>
            {deviceLaptop ? (
              <p className={styles.coin__container_row_dataTitle_text_volume}>
                ${volume.toLocaleString()}
              </p>
            ) : null}
            <p
              className={classNames(
                styles.coin__container_row_dataTitle_text_price,
                {
                  [styles.red]: priceChange < 0,
                  [styles.green]: priceChange > 0
                }
              )}
            >
              {priceChange !== null ? priceChange.toFixed(2) : '--'}%
            </p>
            {deviceLaptop ? (
              <p className={styles.coin__container_row_dataTitle_text_mktCap}>
                Mkt Cap: ${marketcap.toLocaleString()}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </Link>
  );
};

export { Coin };
