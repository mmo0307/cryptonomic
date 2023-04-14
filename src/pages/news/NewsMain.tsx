import React from 'react';
import { useEffect, useState } from 'react';
import { ContainerBox } from '@features/News/newsitem.style';
import { NewsItem } from '@root/features';
import axios from 'axios';

const NewsMain: React.FC = () => {
  const options = {
    method: 'GET',
    url: 'https://cryptocurrency-news-live.p.rapidapi.com/crypto-news', //https://crypto-pulse.p.rapidapi.com/news
    headers: {
      'X-RapidAPI-Key': '6f8c939be8msh5443d26a510b91ep16bc80jsn4f1490900ae7',
      'X-RapidAPI-Host': 'cryptocurrency-news-live.p.rapidapi.com'
    }
  };

  const [data_news, setDataNews] = useState([]);

  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        setDataNews(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <ContainerBox>
      {data_news.length === 0 ? (
        <svg
          className='ap'
          viewBox='0 0 128 256'
          width='128px'
          height='256px'
          xmlns='http://www.w3.org/2000/svg'
        >
          <defs>
            <linearGradient id='ap-grad1' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='0%' stopColor='hsl(223,90%,55%)' />
              <stop offset='100%' stopColor='hsl(253,90%,55%)' />
            </linearGradient>
            <linearGradient id='ap-grad2' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='0%' stopColor='hsl(193,90%,55%)' />
              <stop offset='50%' stopColor='hsl(223,90%,55%)' />
              <stop offset='100%' stopColor='hsl(253,90%,55%)' />
            </linearGradient>
          </defs>
          <circle
            className='ap__ring'
            r='56'
            cx='64'
            cy='192'
            fill='none'
            stroke='#ddd'
            strokeWidth='16'
            strokeLinecap='round'
          />
          <circle
            className='ap__worm1'
            r='56'
            cx='64'
            cy='192'
            fill='none'
            stroke='url(#ap-grad1)'
            strokeWidth='16'
            strokeLinecap='round'
            strokeDasharray='87.96 263.89'
          />
          <path
            className='ap__worm2'
            d='M120,192A56,56,0,0,1,8,192C8,161.07,16,8,64,8S120,161.07,120,192Z'
            fill='none'
            stroke='url(#ap-grad2)'
            strokeWidth='16'
            strokeLinecap='round'
            strokeDasharray='87.96 494'
          />
        </svg>
      ) : (
        data_news.map((data, indx) => {
          return <NewsItem key={indx} data={data} />;
        })
      )}
    </ContainerBox>
  );
};

export { NewsMain };
