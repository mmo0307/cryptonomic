import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

import { NewsItem } from "../../Component/News/NewsItem";
import { ContainerBox } from "../../Component/News/newsitem.style";

const NewsMain: React.FC = () => {
  const options = {
    method: "GET",
    url: "https://cryptocurrency-news-live.p.rapidapi.com/crypto-news",
    headers: {
      "X-RapidAPI-Key": "6f8c939be8msh5443d26a510b91ep16bc80jsn4f1490900ae7",
      "X-RapidAPI-Host": "cryptocurrency-news-live.p.rapidapi.com",
    },
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
        <p>Loading...</p>
      ) : (
        data_news.map((data, indx) => {
          return <NewsItem key={indx} data={data} />;
        })
      )}
    </ContainerBox>
  );
};

export { NewsMain };
