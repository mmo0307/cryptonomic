import React from 'react';
import axios from "axios";
import { useEffect, useState } from 'react';

import NewsItem from '../../Component/News/NewsItem';

export default function NewsMain() {
  const options = {
    method: 'GET',
    url: 'https://cryptocurrency-news-live.p.rapidapi.com/crypto-news',
    headers: {
      'X-RapidAPI-Key': '6f8c939be8msh5443d26a510b91ep16bc80jsn4f1490900ae7',
      'X-RapidAPI-Host': 'cryptocurrency-news-live.p.rapidapi.com'
    }
  };

  const [data_news, setDataNews] = useState([]);

  useEffect(() => {
    axios.request(options).then(function (response) {
      setDataNews(response.data);
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }, []);

  return (
    <section className='container-box'>
      {
          data_news.map(data => {
            return (
              <NewsItem 
                title={data.title}
                url={data.url}
                source={data.source}
                country={data.country}
              />
            )
        })
      }
    </section>
  )
}
