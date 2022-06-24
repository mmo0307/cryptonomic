import React from 'react';

const NewsItem = ({data}) => {
  const obj = data.tags;
  console.log(obj[0].icon);

  return (
    <div style={{marginTop: '55px'}}>
      <img src={obj[0].icon} alt="" />
      <p>{data.title}</p>
      <a href={data.link}>{data.link}</a>
      <p>{data.description}</p>
      <p>{data.source}</p>
      <p>{data.date}</p>
    </div>
  )
}

export default NewsItem;