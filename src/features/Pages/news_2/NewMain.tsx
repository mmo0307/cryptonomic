import React, { useEffect, useState } from 'react';
import { ContainerBox } from '@component/News/newsitem.style';
import { NewsItem } from '@component/News_2/NewsItem';
import axios from 'axios';

const NewMain: React.FC = () => {
  // Add view attr tags with response

  const options = {
    method: 'GET',
    url: 'https://crypto-pulse.p.rapidapi.com/news',
    headers: {
      'X-RapidAPI-Key': '6f8c939be8msh5443d26a510b91ep16bc80jsn4f1490900ae7',
      'X-RapidAPI-Host': 'crypto-pulse.p.rapidapi.com'
    }
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <ContainerBox>
      {data.length === 0 ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100vw'
          }}
        >
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
        </div>
      ) : (
        data.map((el, index) => {
          return <NewsItem key={index} data={el} />;
        })
      )}
    </ContainerBox>
  );
};

export { NewMain };
