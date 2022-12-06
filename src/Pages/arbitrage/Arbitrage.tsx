import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Coins, CoinsAttr, CoinsResult, DataCoins} from "../../globals/interface";

export const Arbitrage = () => {
    const [coins, setCoins] = useState<DataCoins[]>([]);
    const [coinsPair, setCoinsPair] = useState<DataCoins[]>([]);
    const [filterCoins, setFilterCoins]  = useState<CoinsAttr[]>([]);
    const [filterTakePairCoins, setFilterTakePairCoins]  = useState<Coins[]>([]);
    const [result, setResult] = useState<CoinsResult[]>([]);

    const formattedCoins = (wallet:CoinsAttr[]) => {
        const result:any[] = [];
        wallet.forEach(i => {
            const currentSymbol = Object.values(i)[1];
            const idx = result.findIndex((el) => el.coin === i.coin);
            if (idx >= 0) {
                result[idx][currentSymbol] = i.price;
            } else {
                result.push({ coin: i.coin, [currentSymbol]: i.price });
            }
        });

        return result;
    };

    const getPair = (item:DataCoins) => {
        if(item.symbol === 'BTCUSDT' || item.symbol === 'ETHUSDT' || item.symbol === 'BNBUSDT'){
            setCoinsPair((prev) => [...prev, item]);
        }
    }

    const coinsArrayFilterAndSort = (item:DataCoins) => {
        if(item.symbol.includes('USDT') ||
            item.symbol.includes('BTC') ||
            item.symbol.includes('BNB') ||
            item.symbol.includes('ETH')) {

            if (item.symbol.split('USDT')[0] !== '' ||
                item.symbol.split('BTC')[0] !== '' ||
                item.symbol.split('BNB')[0] !== '' ||
                item.symbol.split('ETH')[0] !== '') {

                let pair:string = '';

                if(item.symbol.split('USDT')[1] === ''){
                    pair = 'USDT';
                }
                if(item.symbol.split('BTC')[1] === ''){
                    pair = 'BTC';
                }
                if(item.symbol.split('BNB')[1] === ''){
                    pair = 'BNB';
                }
                if(item.symbol.split('ETH')[1] === ''){
                    pair = 'ETH';
                }

                switch(pair){
                    case 'USDT': {
                        setFilterCoins((prev) => [...prev,
                            {
                                coin: item.symbol.split('USDT')[0],
                                symbol: 'USDT',
                                price: +item.price
                            }
                        ].sort(function (a, b) {
                            if (a.coin > b.coin) {
                                return 1;
                            }
                            if (a.coin < b.coin) {
                                return -1;
                            }
                            return 0;
                        }));
                        break;
                    }
                    case 'BTC': {
                        setFilterCoins((prev) => [...prev,
                            {
                                coin: item.symbol.split('BTC')[0],
                                symbol: 'BTC',
                                price: +item.price
                            }
                        ].sort(function (a, b) {
                            if (a.coin > b.coin) {
                                return 1;
                            }
                            if (a.coin < b.coin) {
                                return -1;
                            }
                            return 0;
                        }));
                        break;
                    }
                    case 'BNB': {
                        setFilterCoins((prev) => [...prev,
                            {
                                coin: item.symbol.split('BNB')[0],
                                symbol: 'BNB',
                                price: +item.price
                            }
                        ].sort(function (a, b) {
                            if (a.coin > b.coin) {
                                return 1;
                            }
                            if (a.coin < b.coin) {
                                return -1;
                            }
                            return 0;
                        }));
                        break;
                    }
                    case 'ETH': {
                        setFilterCoins((prev) => [...prev,
                            {
                                coin: item.symbol.split('ETH')[0],
                                symbol: 'ETH',
                                price: +item.price
                            }
                        ].sort(function (a, b) {
                            if (a.coin > b.coin) {
                                return 1;
                            }
                            if (a.coin < b.coin) {
                                return -1;
                            }
                            return 0;
                        }));
                        break;
                    }
                }

            }
        }
    }

    useEffect(() => {
            axios.get('https://api1.binance.com/api/v3/ticker/price').then(response => {
                setCoins(response.data);
            });
    }, []);

    // useEffect(() => {
    //     const interval = setInterval(async () => {
    //         const data = await axios.get('https://api1.binance.com/api/v3/ticker/price');
    //         const response = await data.data;
    //         filterFirstCoins(response);
    //     }, 15*1000);
    //     return () => clearInterval(interval);
    // }, []);

    useEffect(() => {
        setFilterCoins([]);
        setCoinsPair([]);
        setFilterTakePairCoins([]);

        coins.forEach((item:DataCoins) => {
            getPair(item);
            coinsArrayFilterAndSort(item);
        });
    }, [coins]);

    useEffect(() => {
        setResult([]);
        // filterTakePairCoins.forEach((itemPairCoin) => {
        //     const coinItem = filterCoins.find(item => item.coin === itemPairCoin.coin);
        //     if(coinItem){
        //         const percent: number = ((((coinItem.count * itemPairCoin.price) * ((+coinsPair[0].price*(100 + 5 - 2))/100)) * 100) / 500) - 100;
        //         if(percent > 0) {
        //             setResult((prev) => [...prev,
        //                 {
        //                     symbol: coinItem.coin,
        //                     priceBtc: (coinItem.count * itemPairCoin.price) * ((+coinsPair[0].price*(100 + 5 - 2))/100),
        //                     // priceEth: (coinItem.count * itemPairCoin.price) * +coinsPair[1].price,
        //                     //priceBnb: (coinItem.count * itemPairCoin.price) * +coinsPair[2].price
        //                     percent: percent
        //                 }
        //             ])
        //         }
        //     }
        // });
        const res = formattedCoins(filterCoins)
        setResult(res);
    }, [filterCoins])

    console.log('result=>', result);

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
