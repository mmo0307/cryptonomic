import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams } from "react-router-dom";

import Skeleton from '../../Component/Skeleton/Skeleton';
import Error from '../../Component/Error/Error';

export default function CoinInfo() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    let { id } = useParams();

    useEffect(() => {
        axios.get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=true&market_data=false&community_data=false&developer_data=false&sparkline=true`)
            .then(res => {
                setData(res.data);
            }).catch(() => {
                setError(true);
            }
            ).finally(() => {
                setLoading(false);
            });
    }, []);

     //https://api.coingecko.com/api/v3/coins/ethereum/market_chart/range?vs_currency=usd&from=1654030800&to=1655758800

    return ( <View data={data} loading={loading} error={error}/> )
}

const View = ({loading, error, data}) => {
    const Loading = loading ? <Skeleton /> : null;
    const errorMessage = error ? <Error /> : null;
    const {name, categories, genesis_date, last_updated, market_cap_rank} = data;
    console.log(data);

    return(
        <>
            {Loading}
            {errorMessage}
            <img src={data.image ? data.image.large : null} alt="" />
            <div>{name}</div>
            <p>{data.description ? data.description.en : null}</p>
            <div>{genesis_date}</div>
            <div>{categories}</div>
            <div>{last_updated}</div>
            <div>{market_cap_rank}</div>
        </>
    );
}
