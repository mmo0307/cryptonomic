import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

import Coin from '../../Component/Coin/Coin';
import Skeleton from '../../Component/Skeleton/Skeleton';
import Error from '../../Component/Error/Error';

import './CoinMain.css';


export default function CoinMain() {
const [data, setData] = useState([]);
const [search, setSearch] = useState('');
const [loading, setLoading] = useState(true);
const [error, setError] = useState(false);
//const [offset, setOffset] = useState(10);

  useEffect(() => {
    const timeInterval = setInterval(getData, 2000);

    return () => {
      clearInterval(timeInterval);
    }
  }, []);

  const getData = () => {
    axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100`)
      .then(res => {
        setData(res.data);
        setLoading(false);
      }).catch(() => {
          setError(true);
          setLoading(false);
        }
      );
  }

  const handleSearch = e => {
    setSearch(e.target.value);
  }

  const filteredCoins = data.filter(el => 
    el.name.toLowerCase().includes(search.toLowerCase())  
  );

  const Loading = loading ? <Skeleton /> : null;
  const errorMessage = error ? <Error /> : null;

  return (
      <div className="coin-app">
          <div className='coin-search'>
              <h1 className='coin-text'>
                  Search a currency
              </h1>
              <form>
                  <input type="text" placeholder='Search' 
                      className="coin-input"
                      onChange={handleSearch}/>
              </form>
          </div>
          {errorMessage}
          
          <div className='coin-container'>
            <div className="coin-row">
                <div className="coin">
                    <h1>Name</h1>
                    <p className="coin-symbol">Symbol</p>
                </div>
                <div className="coin-data">
                    <p className="coin-price">Price</p>
                    <p className="coin-volume">Volume</p>
                    <p className="coin-percent">Percent</p>
                    <p className="coin-marketcap">Mkt Cap</p>
                </div>
            </div>
          </div>

          {Loading}
          {
            filteredCoins.map(data => {
              return (
                  <Coin 
                  key={data.id} 
                  name={data.name} 
                  image={data.image}
                  symbol={data.symbol}
                  volume={data.market_cap}
                  price={data.current_price}
                  priceChange={data.price_change_percentage_24h}
                  marketcap={data.market_cap}
                />) 
            })
          }
      </div>
  );
}
