import React, { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import {
  CoinData,
  CoinInfo,
  Container,
  ContainerRow,
  Paragraph
} from '@features/Coin/Coins.styles';
import { Error, Skeleton } from '@root/entities';
import { Coin } from '@root/features';
import { deviceMin } from '@shared/lib/constants/device';
import axios from 'axios';

import useMediaQuery from '../../shared/lib/hooks/useMediaQuery';

import { CoinApp, CoinSearch } from './CoinMain.styles';

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
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const timeInterval = setInterval(getData, 2000);

    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  const getData = () => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100`
      )
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredCoins = data.filter((el: DataItem) =>
    el.name.toLowerCase().includes(search.toLowerCase())
  );

  const Loading = loading ? <Skeleton /> : null;
  const errorMessage = error ? <Error /> : null;
  const deviceLaptop = useMediaQuery(deviceMin.laptop);
  const deviceMobileL = useMediaQuery(deviceMin.mobileL);

  return (
    <CoinApp>
      <CoinSearch>
        <h1 className='coin-text'>Search a currency</h1>
        <form>
          <input
            type='text'
            placeholder='Search'
            className='coin-input'
            onChange={handleSearch}
          />
        </form>
      </CoinSearch>
      {errorMessage}

      <Container>
        <ContainerRow>
          <CoinInfo>
            <h1>Name</h1>
            {deviceMobileL ? <Paragraph>Symbol</Paragraph> : null}
          </CoinInfo>
          <CoinData>
            <Paragraph Width='100px'>Price</Paragraph>
            {deviceLaptop ? <Paragraph Width='200px'>Volume</Paragraph> : null}
            <Paragraph Width='80px'>Percent</Paragraph>
            {deviceLaptop ? <Paragraph Width='240px'>Mkt Cap</Paragraph> : null}
          </CoinData>
        </ContainerRow>
      </Container>

      {Loading}
      {filteredCoins.map((data: DataItem, index: number) => (
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
      ))}
    </CoinApp>
  );
};

export { CoinMain };
