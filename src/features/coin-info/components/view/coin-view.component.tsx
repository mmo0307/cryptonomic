import React, { Fragment, useMemo, useState } from 'react';
import { FavoriteButton } from '@component/buttons';
import ApexChart from '@entities/charts/spline/spline.component';
import {
  ChartData,
  ChartObject,
  DataCoin,
  RadioInputChangeEvent
} from '@features/coin-info/models/IcoinInfo';
import { TradingViewWidget } from '@root/entities';
import {
  formatNumberWithCommas,
  formatter,
  tabData,
  toDayDate
} from '@shared/lib';
import classNames from 'classnames';
import { nanoid } from 'nanoid';

import styles from '@features/coin-info/coinInfo.module.scss';

const CoinView: React.FC<{
  coinChartData: ChartData;
  data_coin: DataCoin;
  selectedOption: string;
  handleOptionChange: (event: RadioInputChangeEvent) => void;
}> = ({ coinChartData, data_coin, selectedOption, handleOptionChange }) => {
  const {
    name,
    market_cap_rank,
    image,
    symbol,
    market_data: {
      current_price,

      //market cap
      market_cap,
      market_cap_change_percentage_24h_in_currency,

      //high - low - 24h price
      high_24h,
      low_24h,

      //change price in percent & currency
      price_change_24h,
      //percent
      price_change_percentage_24h,
      price_change_percentage_7d,
      price_change_percentage_14d,
      price_change_percentage_30d,
      price_change_percentage_60d,
      price_change_percentage_200d,
      price_change_percentage_1y,
      //currency
      price_change_percentage_1h_in_currency,
      price_change_percentage_24h_in_currency,
      price_change_percentage_7d_in_currency,
      price_change_percentage_14d_in_currency,
      price_change_percentage_30d_in_currency,
      price_change_percentage_60d_in_currency,
      price_change_percentage_200d_in_currency,

      //all-time high
      ath,
      ath_change_percentage,
      ath_date,

      //all-time low
      atl,
      atl_change_percentage,
      atl_date,

      //supply
      max_supply,
      circulating_supply
    },
    description
  } = data_coin;

  const categoriesElements: string[] = coinChartData.prices.map(
    (subArray: number[]) => new Date(subArray[0]).toDateString()
  );

  const dataElements: number[] = coinChartData.prices.map(
    (subArray: number[]) => subArray[1]
  );

  const [chartData, setChartData] = useState<ChartObject>({
    series: [
      {
        name,
        data: dataElements
      }
    ],
    options: {
      chart: {
        height: 350,
        type: 'area'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        type: 'datetime',
        categories: categoriesElements
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        }
      }
    }
  });

  const tabContent = useMemo(() => {
    switch (selectedOption) {
      case 'radio-1': {
        return (
          <div className={styles.overview}>
            <div className={styles.overview__wrapper}>
              <div
                className={classNames(styles.overview__block, {
                  [styles.overview__block_marketCap]: true
                })}
              >
                <span>Market Cap:</span>
                <div className={styles.overview__block_content}>
                  <span className={styles.overview_green}>
                    {formatter.format(+market_cap.usd)} $
                  </span>
                  <span
                    className={classNames({
                      [styles.overview_red]:
                        market_cap_change_percentage_24h_in_currency.usd < 0,
                      [styles.overview_green]:
                        market_cap_change_percentage_24h_in_currency.usd > 0
                    })}
                  >
                    {market_cap_change_percentage_24h_in_currency.usd} %
                  </span>
                </div>
              </div>

              <div
                className={classNames(styles.overview__block, {
                  [styles.overview__block_supply]: true
                })}
              >
                {formatNumberWithCommas(max_supply) > 0 && (
                  <span
                    style={{
                      textAlign: formatNumberWithCommas(max_supply)
                        ? 'center'
                        : undefined
                    }}
                  >
                    Max Supply: {formatNumberWithCommas(max_supply)}
                  </span>
                )}
                <span
                  style={{
                    textAlign: formatNumberWithCommas(circulating_supply)
                      ? 'center'
                      : undefined
                  }}
                >
                  Circulating Supply:{' '}
                  {formatNumberWithCommas(circulating_supply)}
                </span>
              </div>

              <div
                className={classNames(
                  styles.overview__block,
                  styles.overview__block_price
                )}
              >
                <span>High price: {high_24h.usd}$</span>
                <span>Low price: {low_24h.usd}$</span>
                <span>{toDayDate()}</span>
              </div>

              <div className={styles.overview__block}>
                <span>ATH:</span>
                <div className={styles.overview__block_allTimePrice}>
                  <div className={styles.overview__block_content}>
                    <span
                      className={classNames({
                        [styles.overview_red]: ath.usd < 0,
                        [styles.overview_green]: ath.usd > 0
                      })}
                    >
                      {ath.usd}$
                    </span>
                    <span
                      className={classNames({
                        [styles.overview_red]: ath_change_percentage.usd < 0,
                        [styles.overview_green]: ath_change_percentage.usd > 0
                      })}
                    >
                      {ath_change_percentage.usd}%
                    </span>
                  </div>
                  <div>
                    <span>
                      {new Date(ath_date.usd).toISOString().split('T')[0]}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.overview__block}>
                <span>ATL:</span>
                <div className={styles.overview__block_allTimePrice}>
                  <div className={styles.overview__block_content}>
                    <span
                      className={classNames({
                        [styles.overview_red]: atl.usd < 0,
                        [styles.overview_green]: atl.usd > 0
                      })}
                    >
                      {atl.usd}$
                    </span>
                    <span
                      className={classNames({
                        [styles.overview_red]: atl_change_percentage.usd < 0,
                        [styles.overview_green]: atl_change_percentage.usd > 0
                      })}
                    >
                      {atl_change_percentage.usd}%
                    </span>
                  </div>
                  <div>
                    <span>
                      {new Date(atl_date.usd).toISOString().split('T')[0]}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.overview__period_wrapper}>
              <div className={styles.overview__period_block}>
                <span>24h</span>
                <div className={styles.overview__period_block_content}>
                  <span
                    className={classNames({
                      [styles.overview_red]: price_change_percentage_24h < 0,
                      [styles.overview_green]: price_change_percentage_24h > 0
                    })}
                  >
                    {price_change_percentage_24h
                      ? price_change_percentage_24h
                      : '--'}
                    $
                  </span>
                  <span
                    className={classNames({
                      [styles.overview_red]:
                        price_change_percentage_24h_in_currency.usd < 0,
                      [styles.overview_green]:
                        price_change_percentage_24h_in_currency.usd > 0
                    })}
                  >
                    {price_change_percentage_24h_in_currency.usd
                      ? price_change_percentage_24h_in_currency.usd
                      : '--'}
                    %
                  </span>
                </div>
              </div>
              <div className={styles.overview__period_block}>
                <span>7d</span>
                <div className={styles.overview__period_block_content}>
                  <span
                    className={classNames({
                      [styles.overview_red]: price_change_percentage_7d < 0,
                      [styles.overview_green]: price_change_percentage_7d > 0
                    })}
                  >
                    {price_change_percentage_7d
                      ? price_change_percentage_7d
                      : '--'}
                    $
                  </span>
                  <span
                    className={classNames({
                      [styles.overview_red]:
                        price_change_percentage_7d_in_currency.usd < 0,
                      [styles.overview_green]:
                        price_change_percentage_7d_in_currency.usd > 0
                    })}
                  >
                    {price_change_percentage_7d_in_currency.usd
                      ? price_change_percentage_7d_in_currency.usd
                      : '--'}
                    %
                  </span>
                </div>
              </div>
              <div className={styles.overview__period_block}>
                <span>14d</span>
                <div className={styles.overview__period_block_content}>
                  <span
                    className={classNames({
                      [styles.overview_red]: price_change_percentage_14d < 0,
                      [styles.overview_green]: price_change_percentage_14d > 0
                    })}
                  >
                    {price_change_percentage_14d
                      ? price_change_percentage_14d
                      : '--'}
                    $
                  </span>
                  <span
                    className={classNames({
                      [styles.overview_red]:
                        price_change_percentage_14d_in_currency.usd < 0,
                      [styles.overview_green]:
                        price_change_percentage_14d_in_currency.usd > 0
                    })}
                  >
                    {price_change_percentage_14d_in_currency.usd
                      ? price_change_percentage_14d_in_currency.usd
                      : '--'}
                    %
                  </span>
                </div>
              </div>
              <div className={styles.overview__period_block}>
                <span>30d</span>
                <div className={styles.overview__period_block_content}>
                  <span
                    className={classNames({
                      [styles.overview_red]: price_change_percentage_30d < 0,
                      [styles.overview_green]: price_change_percentage_30d > 0
                    })}
                  >
                    {price_change_percentage_30d
                      ? price_change_percentage_30d
                      : '--'}
                    $
                  </span>
                  <span
                    className={classNames({
                      [styles.overview_red]:
                        price_change_percentage_30d_in_currency.usd < 0,
                      [styles.overview_green]:
                        price_change_percentage_30d_in_currency.usd > 0
                    })}
                  >
                    {price_change_percentage_30d_in_currency.usd
                      ? price_change_percentage_30d_in_currency.usd
                      : '--'}
                    %
                  </span>
                </div>
              </div>
              <div className={styles.overview__period_block}>
                <span>60d</span>
                <div className={styles.overview__period_block_content}>
                  <span
                    className={classNames({
                      [styles.overview_red]: price_change_percentage_60d < 0,
                      [styles.overview_green]: price_change_percentage_60d > 0
                    })}
                  >
                    {price_change_percentage_60d
                      ? price_change_percentage_60d
                      : '--'}
                    $
                  </span>
                  <span
                    className={classNames({
                      [styles.overview_red]:
                        price_change_percentage_60d_in_currency.usd < 0,
                      [styles.overview_green]:
                        price_change_percentage_60d_in_currency.usd > 0
                    })}
                  >
                    {price_change_percentage_60d_in_currency.usd
                      ? price_change_percentage_60d_in_currency.usd
                      : '--'}
                    %
                  </span>
                </div>
              </div>
              <div className={styles.overview__period_block}>
                <span>200d</span>
                <div className={styles.overview__period_block_content}>
                  <span
                    className={classNames({
                      [styles.overview_red]: price_change_percentage_200d < 0,
                      [styles.overview_green]: price_change_percentage_200d > 0
                    })}
                  >
                    {price_change_percentage_200d
                      ? price_change_percentage_200d
                      : '--'}
                    $
                  </span>
                  <span
                    className={classNames({
                      [styles.overview_red]:
                        price_change_percentage_200d_in_currency.usd < 0,
                      [styles.overview_green]:
                        price_change_percentage_200d_in_currency.usd > 0
                    })}
                  >
                    {price_change_percentage_200d_in_currency.usd
                      ? price_change_percentage_200d_in_currency.usd
                      : '--'}
                    %
                  </span>
                </div>
              </div>
              <div className={styles.overview__period_block}>
                <span>1y</span>
                <div className={styles.overview__period_block_content}>
                  <span
                    className={classNames({
                      [styles.overview_red]: price_change_percentage_1y < 0,
                      [styles.overview_green]: price_change_percentage_1y > 0
                    })}
                  >
                    {price_change_percentage_1y
                      ? price_change_percentage_1y
                      : '--'}
                    $
                  </span>
                  <span
                    className={classNames({
                      [styles.overview_red]:
                        price_change_percentage_1h_in_currency.usd < 0,
                      [styles.overview_green]:
                        price_change_percentage_1h_in_currency.usd > 0
                    })}
                  >
                    {price_change_percentage_1h_in_currency.usd
                      ? price_change_percentage_1h_in_currency.usd
                      : '--'}
                    %
                  </span>
                </div>
              </div>
            </div>

            <ApexChart options={chartData.options} series={chartData.series} />
          </div>
        );
      }
      case 'radio-2': {
        return (
          <>
            <div className={styles.market__description_block}>
              <h3 className={styles.market__description_title}>
                About {name.toUpperCase()}
              </h3>
              <div
                className={styles.market__description_info}
                dangerouslySetInnerHTML={{ __html: description.en }}
              />
              {/*<p className={styles.market__description_info}>*/}
              {/*  {description.en}*/}
              {/*</p>*/}
            </div>
          </>
        );
      }
      case 'radio-3': {
        return (
          <TradingViewWidget
            width='980'
            height='610'
            symbol={symbol.toUpperCase()}
          />
        );
      }
    }
  }, [selectedOption]);

  return (
    <>
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
                    {current_price.usd}
                  </span>
                  <span className={styles.market__info_coin_symbol}>USD</span>
                </div>

                {price_change_24h > 0.009 && (
                  <span
                    className={classNames(styles.market__info_coin_percent, {
                      [styles.market__info_coin_percent_red]: true
                    })}
                  >
                    {price_change_24h.toFixed(2)}
                  </span>
                )}
                <span
                  className={classNames(styles.market__info_coin_price, {
                    [styles.market__info_coin_price_red]: true
                  })}
                >
                  {price_change_percentage_24h.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>

          <div>
            <FavoriteButton />
          </div>
        </div>

        <div className={styles.container}>
          <div className={styles.tabs}>
            {tabData.map(tab => (
              <Fragment key={nanoid()}>
                <input
                  type='radio'
                  id={tab.inputID}
                  name='tabs'
                  value={tab.inputID}
                  checked={selectedOption === tab.inputID}
                  onChange={handleOptionChange}
                />
                <label htmlFor={tab.inputID} className={styles.tabs_tab}>
                  {tab.labelName}
                </label>
              </Fragment>
            ))}
            <span className={styles.glider}></span>
          </div>
        </div>

        {tabContent}
      </section>
    </>
  );
};

export { CoinView };
