import React, {useCallback, useEffect, useState} from 'react';
import axios from "axios";
import {CoinsAttr, CoinsResult, DataCoins} from "../../globals/interface";

export const Arbitrage = () => {
    const [coins, setCoins] = useState<DataCoins[]>([]);
    const [coinsPair, setCoinsPair] = useState<DataCoins[]>([]);
    const [filterCoins, setFilterCoins]  = useState<CoinsAttr[]>([]);
    const [result, setResult] = useState<CoinsResult[]>([]);

    const formattedCoins = useCallback((wallet:CoinsAttr[]) => {
        const result:any[] = [];
        wallet.forEach((item, _, selfWallet) => {
            const currentSymbol = Object.values(item)[1];
            const idx = result.findIndex((el) => el.coin === item.coin);
            if (idx >= 0) {
                //const percent: number = ((((coinItem.count * itemPairCoin.price) * ((+coinsPair[0].price*(100 + 5 - 2))/100)) * 100) / 500) - 100;

                if(currentSymbol === 'USDT'){
                    result[idx].usdtPrice = item.price;
                }
                if(currentSymbol === 'BTC'){
                    result[idx][currentSymbol] = {
                       price: item.price,
                        btcPrice: (item.price * result[idx].count) * +coinsPair[0].price //((+coinsPair[0].price*(100 + 5 - 2))/100) - увеличение процента продажи
                    };
                }
                if(currentSymbol === 'ETH'){
                    result[idx][currentSymbol] = {
                        price: item.price,
                        ethPrice: (item.price * result[idx].count) * +coinsPair[1].price
                    };
                }
                if(currentSymbol === 'BNB'){
                    result[idx][currentSymbol] = {
                        price: item.price,
                        bnbPrice: (item.price * result[idx].count) * +coinsPair[2].price
                    };
                }
            } else {
                const tokenSymbolUSDT = selfWallet.filter((el) => el.coin === item.coin && el.symbol === 'USDT');

                if(tokenSymbolUSDT.length) {
                    if(item.symbol === 'USDT'){
                        result.push({
                            coin: item.coin,
                            usdtPrice: tokenSymbolUSDT[0].price,
                            count: 500 / tokenSymbolUSDT[0].price
                        });
                    }
                    if(item.symbol === 'BTC'){
                        result.push({
                            coin: item.coin,
                            [currentSymbol]: {
                                price: item.price,
                                btcPrice: (item.price * (500 / tokenSymbolUSDT[0].price)) * +coinsPair[0].price
                            },
                            count: 500 / tokenSymbolUSDT[0].price
                        });
                    }
                    if(item.symbol === 'ETH'){
                        result.push({
                            coin: item.coin,
                            [currentSymbol]: {
                                price: item.price,
                                ethPrice: (item.price * (500 / tokenSymbolUSDT[0].price)) * +coinsPair[0].price
                            },
                            count: 500 / tokenSymbolUSDT[0].price
                        });
                    }
                    if(item.symbol === 'BNB'){
                        result.push({
                            coin: item.coin,
                            [currentSymbol]: {
                                price: item.price,
                                bnbPrice: (item.price * (500 / tokenSymbolUSDT[0].price)) * +coinsPair[0].price
                            },
                            count: 500 / tokenSymbolUSDT[0].price
                        });
                    }
                }
            }
        });

        return result.filter(el => el.BTC || el.BNB || el.ETH);
    }, []);

    const getPair = useCallback((item:DataCoins) => {
        if(item.symbol === 'BTCUSDT' || item.symbol === 'ETHUSDT' || item.symbol === 'BNBUSDT'){
            setCoinsPair((prev) => [...prev, item]);
        }
    }, []);

    const coinsArrayFilterAndSort = useCallback((item:DataCoins) => {
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
    }, []);

    useEffect(() => {
            axios.get('https://api1.binance.com/api/v3/ticker/price').then(response => {
                setCoins(response.data);
            });
    }, []);

    useEffect(() => {
        const interval = setInterval(async () => {
            const data = await axios.get('https://api1.binance.com/api/v3/ticker/price');
            const response = await data.data;
            setCoins(response);
        }, 15*1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setCoinsPair([]);
        coins.forEach((item:DataCoins) => {
            getPair(item);
            coinsArrayFilterAndSort(item);
        });
    }, [coins]);

    useEffect(() => {
        const res = formattedCoins(filterCoins);
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
