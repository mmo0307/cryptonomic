import { useState, useEffect } from 'react';
import axios from 'axios';

import Coin from './Component/Coin/Coin';

import './App.css';

function App() {
const [data, setData] = useState([]);
const [search, setSearch] = useState('');

  useEffect(()=>{
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(res => {
        setData(res.data);
        console.log(res.data);
      }).catch(error => console.log('Error!'));
  }, []);

  const handleSearch = e => {
    setSearch(e.target.value);
  }

  const filteredCoins = data.filter(el => 
    el.name.toLowerCase().includes(search.toLowerCase())  
  );

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
        {filteredCoins.map(data =>{
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
            />
          ) 
        })}
    </div>
  );
}

export default App;
