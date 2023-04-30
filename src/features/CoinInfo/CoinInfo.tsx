import React, { Fragment, useMemo } from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FavoriteButton } from '@entities/buttons';
import ApexChart from '@entities/Charts/Spline';
import { Error, Skeleton, TradingViewWidget } from '@root/entities';
import { tabData } from '@shared/lib';
import axios from 'axios';
import classNames from 'classnames';
import { nanoid } from 'nanoid';

import { Data } from './models/IcoinInfo';

import styles from './coinInfo.module.scss';

type RadioInputChangeEvent = React.ChangeEvent<HTMLInputElement> & {
  target: {
    value: string;
  };
};

type ChartData = {
  data: {
    prices: number[];
    market_caps: number[];
    total_volumes: number[];
  };
  success: boolean;
};

interface ApexChartData {
  name: string;
  data: number[];
}

type ChartOptions = {
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
};

interface ChartObject {
  series: ApexChartData[];
  options: ChartOptions;
}

const CoinInfo: React.FC = () => {
  const [data_coin, setData] = useState<Data | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  const [error, setError] = useState<boolean>(false);

  const [selectedOption, setSelectedOption] = useState('radio-1');

  //1-365 days
  const [days, setDays] = useState<number>(1);

  const [chartData, setChartData] = useState<ChartData | null>(null);

  const handleOptionChange = (event: RadioInputChangeEvent) => {
    setSelectedOption(event.target.value);
  };

  const { id } = useParams<string>();

  const URLs = [
    `https://api.coingecko.com/api/v3/coins/${id}?tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true`,
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`
  ];

  const getAllData = (URLs: string[]) => {
    return Promise.all(URLs.map(fetchData));
  };

  const fetchData = (URL: string) => {
    return axios
      .get(URL)
      .then(response => {
        return {
          success: true,
          data: response.data
        };
      })
      .catch(e => {
        console.log('error=>', e);
        setError(true);
        return {
          success: false,
          data: null
        };
      });
  };

  useEffect(() => {
    getAllData(URLs)
      .then(resp => {
        console.log('resp 0=>', resp[0]);
        console.log('resp 1=>', resp[1]);

        setData(resp[0].data);
        setChartData(resp[1].data);
      })
      .catch(e => {
        console.log(e);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  console.log('chartData=>', chartData);
  console.log('data_coin 1=>', data_coin);

  if (loading) {
    return <Skeleton />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <View
      coinChartData={chartData}
      data_coin={data_coin}
      selectedOption={selectedOption}
      handleOptionChange={handleOptionChange}
    />
  );
};

const View: React.FC<{
  coinChartData: ChartData | null;
  data_coin: Data | null;
  selectedOption: string;
  handleOptionChange: (event: RadioInputChangeEvent) => void;
}> = ({ coinChartData, data_coin, selectedOption, handleOptionChange }) => {
  const [chartData, setChartData] = useState<ChartObject>({
    series: [
      {
        name: 'series1',
        data: [12, 50, 70, 10, 45, 13, 5]
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
        categories: [
          '2018-09-19T00:00:00.000Z',
          '2018-09-19T01:30:00.000Z',
          '2018-09-19T02:30:00.000Z',
          '2018-09-19T03:30:00.000Z',
          '2018-09-19T04:30:00.000Z',
          '2018-09-19T05:30:00.000Z',
          '2018-09-19T06:30:00.000Z'
        ]
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        }
      }
    }
  });

  const formatter = Intl.NumberFormat('en', {
    notation: 'compact'
  });

  const formatNumberWithCommas = (number: number | string | null) => {
    if (number === null) {
      return 0;
    }

    if (typeof number === 'number') {
      return Math.floor(number)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const toDayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

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
                <span>Max Supply: {formatNumberWithCommas(max_supply)}</span>
                <span>
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
                    {price_change_percentage_24h}$
                  </span>
                  <span
                    className={classNames({
                      [styles.overview_red]:
                        price_change_percentage_24h_in_currency.usd < 0,
                      [styles.overview_green]:
                        price_change_percentage_24h_in_currency.usd > 0
                    })}
                  >
                    {price_change_percentage_24h_in_currency.usd}%
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
                    {price_change_percentage_7d}$
                  </span>
                  <span
                    className={classNames({
                      [styles.overview_red]:
                        price_change_percentage_7d_in_currency.usd < 0,
                      [styles.overview_green]:
                        price_change_percentage_7d_in_currency.usd > 0
                    })}
                  >
                    {price_change_percentage_7d_in_currency.usd}%
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
                    {price_change_percentage_14d}$
                  </span>
                  <span
                    className={classNames({
                      [styles.overview_red]:
                        price_change_percentage_14d_in_currency.usd < 0,
                      [styles.overview_green]:
                        price_change_percentage_14d_in_currency.usd > 0
                    })}
                  >
                    {price_change_percentage_14d_in_currency.usd}%
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
                    {price_change_percentage_30d}$
                  </span>
                  <span
                    className={classNames({
                      [styles.overview_red]:
                        price_change_percentage_30d_in_currency.usd < 0,
                      [styles.overview_green]:
                        price_change_percentage_30d_in_currency.usd > 0
                    })}
                  >
                    {price_change_percentage_30d_in_currency.usd}%
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
                    {price_change_percentage_60d}$
                  </span>
                  <span
                    className={classNames({
                      [styles.overview_red]:
                        price_change_percentage_60d_in_currency.usd < 0,
                      [styles.overview_green]:
                        price_change_percentage_60d_in_currency.usd > 0
                    })}
                  >
                    {price_change_percentage_60d_in_currency.usd}%
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
                    {price_change_percentage_200d}$
                  </span>
                  <span
                    className={classNames({
                      [styles.overview_red]:
                        price_change_percentage_200d_in_currency.usd < 0,
                      [styles.overview_green]:
                        price_change_percentage_200d_in_currency.usd > 0
                    })}
                  >
                    {price_change_percentage_200d_in_currency.usd}%
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
                    {price_change_percentage_1y}$
                  </span>
                  <span
                    className={classNames({
                      [styles.overview_red]:
                        price_change_percentage_1h_in_currency.usd < 0,
                      [styles.overview_green]:
                        price_change_percentage_1h_in_currency.usd > 0
                    })}
                  >
                    {price_change_percentage_1h_in_currency.usd}%
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

                <span
                  className={classNames(styles.market__info_coin_percent, {
                    [styles.market__info_coin_percent_red]: true
                  })}
                >
                  {price_change_24h.toFixed(2)}
                </span>
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

export { CoinInfo };
