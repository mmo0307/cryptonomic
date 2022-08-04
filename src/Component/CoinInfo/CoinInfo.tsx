import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { Skeleton } from "../Skeleton/Skeleton";
import { Error } from "../Error/Error";
import { Container } from "../CoinInfo/coinInfo.style";

interface CommunityData {
  twitter_followers: number;
  [key: string]: any;
}

interface Description {
  en: string;
  [key: string]: any;
}

interface Image {
  large: string;
  small: string;
  thumb: string;
  [key: string]: any;
}

interface Data {
  name: string;
  categories: string;
  genesis_date: string;
  last_updated: string;
  market_cap_rank: string;
  image: Image;
  description: Description;
  symbol: string;
  block_time_in_minutes: string;
  community_data: CommunityData;
}

const CoinInfo: React.FC = () => {
  const [data_coin, setData] = useState<Data>({
    name: "",
    categories: "",
    genesis_date: "",
    last_updated: "",
    market_cap_rank: "",
    symbol: "",
    block_time_in_minutes: "",
    image: {
      large: "",
      small: "",
      thumb: "",
    },
    community_data: {
      twitter_followers: 0,
    },
    description: {
      en: "",
    },
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  let { id } = useParams<string>();

  console.log(data_coin);

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${id}?localization=true&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true`
      )
      .then((res) => {
        setData(res.data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return <View data={data_coin} loading={loading} error={error} />;
};

const View: React.FC<{ loading: boolean; error: boolean; data: Data }> = ({
  loading,
  error,
  data,
}) => {
  const Loading = loading ? <Skeleton /> : null;
  const errorMessage = error ? <Error /> : null;
  const {
    name,
    categories,
    genesis_date,
    last_updated,
    market_cap_rank,
    image,
    description,
    symbol,
    block_time_in_minutes,
    community_data,
  } = data;

  return (
    <>
      {Loading}
      {errorMessage}
      
        <img src={image ? image.large : ""} alt="Coin" width={50} />
        <p>{name}</p>
        <p>{symbol}</p>
        <p>{block_time_in_minutes}</p>
        <p>{genesis_date}</p>
        <p>{categories}</p>
        <p>{community_data.twitter_followers}</p>
        <p>{last_updated}</p>
        <p>{market_cap_rank}</p>
        <p>{description ? description.en : null}</p>
    </>
  );
};

export { CoinInfo };
