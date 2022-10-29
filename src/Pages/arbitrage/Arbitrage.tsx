import React, { useEffect, useMemo, useState } from 'react';
import axios from "axios";
import { Coins, DataCoins } from "../../globals/interface";

export const Arbitrage = () => {
    const [dataCoins, setDataCoins] = useState<DataCoins[]>([]);
    const [coins, setCoins]  = useState<Coins[]>([]);

    const filterCoins = useMemo(() => {
        return dataCoins.map((item:DataCoins) => {
            if(item.symbol.includes('USDT')){
                return {
                    coin: item.symbol.split('USDT')[0],
                    symbol: 'USDT',
                    price: item.price
                }
            }
        }).filter((item) => item !== undefined);
    }, [dataCoins]);

    useEffect(() => {
            axios.get('https://api1.binance.com/api/v3/ticker/price').then(response => {
                setDataCoins(response.data);
            });
    }, [])

    useEffect(() => {
        const interval = setInterval(async () => {
            const data = await axios.get('https://api1.binance.com/api/v3/ticker/price');
            const response = await data.data;
            setDataCoins(response);
        }, 15*1000);
        return () => clearInterval(interval);
    }, []);

    console.log('filterCoins=>', filterCoins);
    console.log('dataCoins=>', dataCoins.map((item:DataCoins) => {
        if(item.symbol.includes('BTC')){
            return {
                coin: item.symbol.split('BTC')[0],
                symbol: 'BTC',
                price: item.price
            }
        }
    }).filter((item) => item !== undefined));
    console.log('BTC-USDT =>', dataCoins.filter((item) => item.symbol.includes('BTCUSDT'))[0]);

    return (
        <div>
            <p>Transaction amount (USDT)</p>
            <input type="text" placeholder="amount"/>
            <p>Exchange commission (%)</p>
            <input type="text" placeholder="commission"/>
            <p>Show more (%)</p>
            <input type="text" placeholder="percent"/>
            <p>Sort by</p>
            <select name="" id="">
                <option value="high">High - Low</option>
                <option value="low">Low - High</option>
            </select>
        </div>
    );
};
