import React, {useCallback, useEffect, useMemo, useState} from 'react';
import { nanoid } from 'nanoid'
import {CoinsAttr, CoinsResult, DataCoins} from "../../globals/interface";
import {
    Block,
    BuyPrice,
    ContentBlock,
    ContentWrapper, ContentWrapperBlock,
    ItemBlock,
    SellPrice,
    Wrapper,
    WrapperBlock,
    WrapperItem
} from "./Arbitrage.styles";
import {Skeleton} from "../../Component/Skeleton/Skeleton";


export const Arbitrage: React.FC = () => {
    const comsa_1 = 0.002;
    const comsa_2 = 0.001;
    const [price, setPrice] = useState<number>(1000);
    const [commission, setCommission] = useState<string>('0.2');
    const [coins, setCoins] = useState<DataCoins[]>([]);
    const [coinsPair, setCoinsPair] = useState<DataCoins[]>([]);
    const [filterCoins, setFilterCoins]  = useState<CoinsAttr[]>([]);

    const formattedCoins = useCallback((wallet:CoinsAttr[]) => {
        const result:any[] = [];
        wallet.forEach((item, _, selfWallet) => {
            const currentSymbol = Object.values(item)[1];
            const idx = result.findIndex((el) => el.coin === item.coin);
            if (idx >= 0) {
                if(currentSymbol === 'USDT'){
                    result[idx].usdtPrice = item.price;
                }
                if(currentSymbol === 'BTC'){
                    const firstCalculate = price / ((result[idx].usdtPrice * (100 - +commission)) / 100);
                    const secondCalculate = firstCalculate * (item.price * comsa_1+ item.price);
                    const thirdCalculate = secondCalculate * ((coinsPair[0].price * comsa_2) + coinsPair[0].price);
                    const percentBTC: number = ((thirdCalculate * 100) / price) - 100;

                    if(percentBTC > 0) {
                        result[idx][currentSymbol] = {
                            price: item.price,
                            profitPrice: thirdCalculate.toFixed(2),
                            percent: percentBTC
                        };
                    }
                }
                if(currentSymbol === 'ETH'){
                    const firstCalculate = price / ((result[idx].usdtPrice * (100 - +commission)) / 100);
                    const secondCalculate = firstCalculate * (item.price * comsa_1+ item.price);
                    const thirdCalculate = secondCalculate * ((coinsPair[1].price * comsa_2) + coinsPair[1].price);
                    const percentETH: number = ((thirdCalculate * 100) / price) - 100;

                    if(percentETH > 0) {
                        result[idx][currentSymbol] = {
                            price: item.price,
                            profitPrice: thirdCalculate.toFixed(2),
                            percent: percentETH
                        };
                    }
                }
                if(currentSymbol === 'BNB'){
                    const firstCalculate = price / ((result[idx].usdtPrice * (100 - +commission)) / 100);
                    const secondCalculate = firstCalculate * (item.price * comsa_1+ item.price);
                    const thirdCalculate = secondCalculate * ((coinsPair[2].price * comsa_2) + coinsPair[2].price);
                    const percentBNB: number = ((thirdCalculate * 100) / price) - 100;

                    if(percentBNB>0) {
                        result[idx][currentSymbol] = {
                            price: item.price,
                            profitPrice: thirdCalculate.toFixed(2),
                            percent: percentBNB
                        };
                    }
                }
            } else {
                const tokenSymbolUSDT = selfWallet.filter((el) => el.coin === item.coin && el.symbol === 'USDT');

                if(tokenSymbolUSDT.length) {
                    if(item.symbol === 'USDT'){
                        result.push({
                            coin: item.coin,
                            usdtPrice: tokenSymbolUSDT[0].price,
                            count: price / tokenSymbolUSDT[0].price
                        });
                    }
                    if(item.symbol === 'BTC'){
                        const firstCalculateBTC = price / ((tokenSymbolUSDT[0].price * (100 - +commission)) / 100);
                        const secondCalculateBTC = firstCalculateBTC * (item.price * comsa_1+ item.price);
                        const thirdCalculateBTC = secondCalculateBTC * ((coinsPair[0].price * comsa_2) + coinsPair[0].price);
                        const percentBTC: number = ((thirdCalculateBTC * 100) / price) - 100;

                        if(percentBTC>0) {
                            result.push({
                                coin: item.coin,
                                [currentSymbol]: {
                                    price: item.price,
                                    profitPrice: thirdCalculateBTC.toFixed(2),
                                    percent: percentBTC
                                },
                                count: price / tokenSymbolUSDT[0].price
                            });
                        }
                    }
                    if(item.symbol === 'ETH'){
                        const firstCalculateETH = price / ((tokenSymbolUSDT[0].price * (100 - +commission)) / 100);
                        const secondCalculateETH = firstCalculateETH * (item.price * comsa_1+ item.price);
                        const thirdCalculateETH = secondCalculateETH * ((coinsPair[1].price * comsa_2) + coinsPair[1].price);
                        const percentETH: number = ((thirdCalculateETH * 100) / price) - 100;

                        if(percentETH>0) {
                            result.push({
                                coin: item.coin,
                                [currentSymbol]: {
                                    price: item.price,
                                    profitPrice: thirdCalculateETH.toFixed(2),
                                    percent: percentETH
                                },
                                count: price / tokenSymbolUSDT[0].price
                            });
                        }
                    }
                    if(item.symbol === 'BNB'){
                        const firstCalculateBNB = price / ((tokenSymbolUSDT[0].price * (100 - +commission)) / 100);
                        const secondCalculateBNB = firstCalculateBNB * (item.price * comsa_1+ item.price);
                        const thirdCalculateBNB = secondCalculateBNB * ((coinsPair[2].price * comsa_2) + coinsPair[2].price);
                        const percentBNB: number = ((thirdCalculateBNB * 100) / price) - 100;

                        if(percentBNB>0) {
                            result.push({
                                coin: item.coin,
                                [currentSymbol]: {
                                    price: item.price,
                                    profitPrice: thirdCalculateBNB.toFixed(2),
                                    percent: percentBNB
                                },
                                count: price / tokenSymbolUSDT[0].price
                            });
                        }
                    }
                }
            }
        });

        return result.filter(el => el.BTC || el.BNB || el.ETH);
    }, [coinsPair, price, commission]);

    const coinsArrayFilterAndSort = useCallback((item:DataCoins) => {
        if(item.symbol === 'BTCUSDT' || item.symbol === 'ETHUSDT' || item.symbol === 'BNBUSDT'){
            item.price = +item.price;
            setCoinsPair((prev) => [...prev, item]);
        }

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

    const resultView = useMemo(() => {
        const res:CoinsResult[] = formattedCoins(filterCoins);
        console.log('res=>', res);
        return (
            <Wrapper>
                <WrapperBlock>
                    {res.length ? res.map((item) => (
                        <>
                            {item.BTC !== undefined ?
                                <WrapperItem key={nanoid()}>
                                    <p>{item.coin}</p>
                                    <div>
                                        <div>Buy {item.coin}/USDT</div>
                                        <ItemBlock>
                                            by course:<BuyPrice>{item.usdtPrice}</BuyPrice>
                                        </ItemBlock>
                                    </div>
                                    <div>
                                        <div>Sell {item.coin}/BTC</div>
                                        <ItemBlock>
                                            by course:<SellPrice>{item.BTC.price * comsa_1+ item.BTC.price}</SellPrice>
                                        </ItemBlock>
                                    </div>
                                    <div>
                                        <div>Sell BTC/USDT</div>
                                        <ItemBlock>
                                            by course:<SellPrice>{coinsPair[0].price * comsa_2 + coinsPair[0].price}</SellPrice>
                                        </ItemBlock>
                                    </div>
                                    <ItemBlock>
                                        <p>Profit:</p>
                                        <p>{item.BTC.profitPrice}</p>
                                    </ItemBlock>
                                    <ItemBlock>
                                        <p>Percent:</p>
                                        <p>{item.BTC.percent.toFixed(2)}</p>
                                    </ItemBlock>
                                </WrapperItem> : null}

                            {item.ETH !== undefined ?
                                <WrapperItem key={nanoid()}>
                                    <p>{item.coin}</p>
                                    <div>
                                        <div>Buy {item.coin}/USDT</div>
                                        <ItemBlock>
                                            by course:<BuyPrice>{item.usdtPrice}</BuyPrice>
                                        </ItemBlock>
                                    </div>
                                    <div>
                                        <div>Sell {item.coin}/ETH</div>
                                        <ItemBlock>
                                            by course:<SellPrice>{item.ETH.price * comsa_1+ item.ETH.price}</SellPrice>
                                        </ItemBlock>
                                    </div>
                                    <div>
                                        <div>Sell ETH/USDT</div>
                                        <ItemBlock>
                                            by course:<SellPrice>{coinsPair[1].price * comsa_2 + coinsPair[1].price}</SellPrice>
                                        </ItemBlock>
                                    </div>
                                    <ItemBlock>
                                        <p>Profit:</p>
                                        <p>{item.ETH.profitPrice}</p>
                                    </ItemBlock>
                                    <ItemBlock>
                                        <p>Percent:</p>
                                        <p>{item.ETH.percent.toFixed(2)}</p>
                                    </ItemBlock>
                                </WrapperItem> : null}

                            {item.BNB !== undefined ?
                                <WrapperItem key={nanoid()}>
                                    <p>{item.coin}</p>
                                    <div>
                                        <div>Buy {item.coin}/USDT</div>
                                        <ItemBlock>
                                            by course:<BuyPrice>{item.usdtPrice}</BuyPrice>
                                        </ItemBlock>
                                    </div>
                                    <div>
                                        <div>Sell {item.coin}/BNB</div>
                                        <ItemBlock>
                                            by course:<SellPrice>{item.BNB.price * comsa_1+ item.BNB.price}</SellPrice>
                                        </ItemBlock>
                                    </div>
                                    <div>
                                        <div>Sell BNB/USDT</div>
                                        <ItemBlock>
                                            by course:<SellPrice>{coinsPair[2].price * comsa_2 + coinsPair[2].price}</SellPrice>
                                        </ItemBlock>
                                    </div>
                                    <ItemBlock>
                                        <p>Profit:</p>
                                        <p>{item.BNB.profitPrice}</p>
                                    </ItemBlock>
                                    <ItemBlock>
                                        <p>Percent:</p>
                                        <p>{item.BNB.percent.toFixed(2)}</p>
                                    </ItemBlock>
                                </WrapperItem> : null}
                        </>
                    )) : <Skeleton />}
                </WrapperBlock>
            </Wrapper>
        );
    }, [coinsPair, price, commission])

    useEffect(() => {
        const abortController = new AbortController();
        void async function fetchData() {
            try {
                const response = await fetch('https://api1.binance.com/api/v3/ticker/price');
                const data = await response.json();
                setCoins(data);
            } catch (error) {
                console.log('error', error);
            }
        }();
        return () => {
            abortController.abort();
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
               const response = await fetch('https://api1.binance.com/api/v3/ticker/price');
               const data = await response.json();
               setCoins(data);
            } catch (error) {
                console.log('error', error);
            }
        }, 15*1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setCoinsPair([]);
        coins.forEach((item:DataCoins) => {
            coinsArrayFilterAndSort(item);
        });
    }, [coins]);

    return (
        <>
            <ContentWrapperBlock>
                <ContentWrapper>
                    <ContentBlock>
                        <Block>
                            <p>Transaction amount (USDT)</p>
                            <input type="text" placeholder="amount" value={price}  onChange={(e) => setPrice(+e.target.value)}/>
                        </Block>
                        <Block>
                            <p>Exchange commission (%)</p>
                            <input type="text" placeholder="commission" value={commission} onChange={(e) => {
                                console.log('e.target.value=>', e.target.value);
                                setCommission(e.target.value)
                            }}/>
                        </Block>
                    </ContentBlock>
                    <ContentBlock>
                        <Block>
                            <p>Show more (%)</p>
                            <input type="text" placeholder="percent" value={0}/>
                        </Block>
                        <Block>
                            <p>Sort by</p>
                            <select name="" id="">
                                <option value="high">High - Low</option>
                                <option value="low">Low - High</option>
                            </select>
                        </Block>
                    </ContentBlock>
                </ContentWrapper>
            </ContentWrapperBlock>
            {resultView}
        </>
    );
};
