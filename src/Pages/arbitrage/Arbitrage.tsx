import React, {useCallback, useEffect, useState} from 'react';
import axios from "axios";
import {Coins, CoinsAttr, CoinsResult, DataCoins} from "../../globals/interface";

export const Arbitrage = () => {
    const [coins, setCoins] = useState<DataCoins[]>([]);
    const [coinsPair, setCoinsPair] = useState<DataCoins[]>([]);
    const [filterCoins, setFilterCoins]  = useState<CoinsAttr[]>([]);
    const [filterTakePairCoins, setFilterTakePairCoins]  = useState<Coins[]>([]);
    const [result, setResult] = useState<CoinsResult[]>([]);
    const [takePair, setTakePair] = useState<string>('');

    // const filterFirstCoins = useCallback( (dataCoins:DataCoins[]) => {
    //     console.log('dataCoins=>', dataCoins);
    //     setCoinsFirst([]);
    //     dataCoins.map((item:DataCoins) => {
    //         if(item.symbol.includes('USDT')){
    //             setCoinsFirst((prev) => [...prev,
    //             {
    //                 coin: item.symbol.split('USDT')[0],
    //                 symbol: 'USDT',
    //                 price: item.price,
    //                 count: 500/+item.price
    //             }
    //             ]);
    //         }
    //     });
    // }, []);

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
            if(item.symbol === 'BTCUSDT' || item.symbol === 'ETHUSDT' || item.symbol === 'BNBUSDT'){
                setCoinsPair((prev) => [...prev, item]);
            }

            if(item.symbol.includes('USDT')) {
                if (item.symbol.split('USDT')[0] !== '') {
                    setFilterCoins((prev) => [...prev,
                        {
                            coin: item.symbol.split('USDT')[0],
                            symbol: 'USDT',
                            price: +item.price,
                            count: 500 / +item.price
                        }
                    ]);
                }
            }

            if(item.symbol.includes('BTC')){
                if(item.symbol.split('BTC')[0] !== '') {
                    setFilterTakePairCoins((prev) => [...prev,
                        {
                            coin: item.symbol.split('BTC')[0],
                            symbol: 'BTC',
                            price: +item.price
                        }
                    ]);
                }
            }
        });
    }, [coins]);

    useEffect(() => {
        setResult([]);
        filterTakePairCoins.forEach((itemPairCoin) => {
            const coinItem = filterCoins.find(item => item.coin === itemPairCoin.coin);

            if(coinItem){
                const percent: number = ((((coinItem.count * itemPairCoin.price) * ((+coinsPair[0].price*(100 + 5 - 2))/100)) * 100) / 500) - 100;
                if(percent > 0) {
                    setResult((prev) => [...prev,
                        {
                            symbol: coinItem.coin,
                            priceBtc: (coinItem.count * itemPairCoin.price) * ((+coinsPair[0].price*(100 + 5 - 2))/100),
                            // priceEth: (coinItem.count * itemPairCoin.price) * +coinsPair[1].price,
                            //priceBnb: (coinItem.count * itemPairCoin.price) * +coinsPair[2].price
                            percent: percent
                        }
                    ])
                }
            }
        });
    }, [filterTakePairCoins])

      //console.log('coins=>', coins);
      //console.log('coinsPair=>', coinsPair);
     //console.log('filterCoins=>', filterCoins);
     //console.log('filterTakePairCoins=>', filterTakePairCoins);

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
