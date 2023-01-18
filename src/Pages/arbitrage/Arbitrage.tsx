import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {CoinRes, CoinsAttr, DataCoins} from "../../globals/interface";
import {
    Block, BuyPrice,
    ContentBlock, ContentPair,
    ContentWrapper,
    ContentWrapperBlock, ItemBlock, SellPrice,
    Wrapper,
    WrapperBlock,
    WrapperItem
} from "./Arbitrage.styles";
import {Skeleton} from "../../Component/Skeleton/Skeleton";
import {nanoid} from "nanoid";


export const Arbitrage: React.FC = () => {
    const comsa_1 = 0.002;
    const comsa_2 = 0.001;
    const [price, setPrice] = useState<number>(1000);
    const [commission, setCommission] = useState<string>('0.2');
    const [coins, setCoins] = useState<DataCoins[]>([]);
    const [coinsPair, setCoinsPair] = useState<DataCoins[]>([]);
    const [filterCoins, setFilterCoins]  = useState<CoinsAttr[]>([]);
    //TODO change pair coin
    const [pair, setPair] = useState<string>("BTC");

    const formattedCoins = useCallback((wallet:CoinsAttr[]) => {
        const result:CoinRes = {
            USDT: [],
            BTC: [],
            ETH: [],
            BNB: []
        };
        wallet.forEach((item, _, selfWallet) => {
            const tokenSymbolUSDT = selfWallet.filter((el) => el.coin === item.coin && el.symbol === 'USDT');

                if(tokenSymbolUSDT[0]) {
                    if(item.symbol === 'USDT'){
                        result.USDT.push({
                            coin: item.coin,
                            price: item.price
                        });
                    }
                    if(item.symbol === 'BTC'){
                        result.BTC.push({
                            coin: item.coin,
                            price: item.price
                        })
                    }
                    if(item.symbol === 'ETH'){
                        result.ETH.push({
                            coin: item.coin,
                            price: item.price
                        })
                    }
                    if(item.symbol === 'BNB'){
                        result.BNB.push({
                            coin: item.coin,
                            price: item.price
                        })
                    }
                }
        });

        result.BTC.map((item) => {
            const findElement = result.USDT.find(el => el.coin === item.coin);
            if(findElement){
                const firstCalculate = price / ((findElement.price * (100 - +commission)) / 100);
                const secondCalculate = firstCalculate * (item.price * comsa_1 + item.price);
                const thirdCalculate = secondCalculate * ((coinsPair[0].price * comsa_2) + coinsPair[0].price);

                item.percent = ((thirdCalculate * 100) / price) - 100;
                item.profitPrice = thirdCalculate.toFixed(2);

                item.strategy = {
                    buyCoin: findElement.price,
                    sellPairCoin: item.price * comsa_1 + item.price,
                    sellPairUsdt: coinsPair[0].price * comsa_2 + coinsPair[0].price
                }
            }
        });

        result.ETH.map((item) => {
            const findElement = result.USDT.find(el => el.coin === item.coin);
            if(findElement){
                const firstCalculate = price / ((findElement.price * (100 - +commission)) / 100);
                const secondCalculate = firstCalculate * (item.price * comsa_1 + item.price);
                const thirdCalculate = secondCalculate * ((coinsPair[1].price * comsa_2) + coinsPair[1].price);

                item.percent = ((thirdCalculate * 100) / price) - 100;
                item.profitPrice = thirdCalculate.toFixed(2);

                item.strategy = {
                    buyCoin: findElement.price,
                    sellPairCoin: item.price * comsa_1 + item.price,
                    sellPairUsdt: coinsPair[1].price * comsa_2 + coinsPair[1].price
                }
            }
        });

        result.BNB.map((item) => {
            const findElement = result.USDT.find(el => el.coin === item.coin);
            if(findElement){
                const firstCalculate = price / ((findElement.price * (100 - +commission)) / 100);
                const secondCalculate = firstCalculate * (item.price * comsa_1 + item.price);
                const thirdCalculate = secondCalculate * ((coinsPair[2].price * comsa_2) + coinsPair[2].price);

                item.percent = ((thirdCalculate * 100) / price) - 100;
                item.profitPrice = thirdCalculate.toFixed(2);

                item.strategy = {
                    buyCoin: findElement.price,
                    sellPairCoin: item.price * comsa_1 + item.price,
                    sellPairUsdt: coinsPair[2].price * comsa_2 + coinsPair[2].price
                }
            }
        });

        return result;
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
        const res:CoinRes = formattedCoins(filterCoins);
        console.log(res);
        return (
            <Wrapper>
                <WrapperBlock>
                    {res.BNB ?
                        res.BNB.map(item =>
                            <WrapperItem key={nanoid()}>
                                <p>{item.coin}</p>
                                <div>
                                     <div>Buy {item.coin}/USDT</div>
                                     <ItemBlock>
                                        by course:<BuyPrice>{item.strategy?.buyCoin}</BuyPrice>
                                     </ItemBlock>
                                 </div>
                                 <div>
                                   <div>Sell {item.coin}/BNB</div>
                                    <ItemBlock>
                                        by course:<SellPrice>{item.strategy?.sellPairCoin}</SellPrice>
                                    </ItemBlock>
                                 </div>
                                 <div>
                                     <div>Sell BNB/USDT</div>
                                     <ItemBlock>
                                         by course:<SellPrice>{item.strategy?.sellPairUsdt}</SellPrice>
                                     </ItemBlock>
                                 </div>
                                 <ItemBlock>
                                     <p>Profit:</p>
                                     <p>{item.profitPrice}</p>
                                 </ItemBlock>
                                 <ItemBlock>
                                     <p>Percent:</p>
                                     <p>{item.percent?.toFixed(2)}</p>
                                 </ItemBlock>
                            </WrapperItem>
                        )
                        : <Skeleton /> }
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

    // useEffect(() => {
    //     const interval = setInterval(async () => {
    //         try {
    //            const response = await fetch('https://api1.binance.com/api/v3/ticker/price');
    //            const data = await response.json();
    //            setCoins(data);
    //         } catch (error) {
    //             console.log('error', error);
    //         }
    //     }, 15*1000);
    //     return () => clearInterval(interval);
    // }, []);

    useEffect(() => {
        setCoinsPair([]);
        setFilterCoins([]);
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
                    <ContentPair>
                        <input type="radio" name="coin" value='BTC' onChange={(e) => setPair(e.target.value)}/>
                        <label htmlFor="">BTC</label>

                        <input type="radio" name="coin"  value='BNB' onChange={(e) => setPair(e.target.value)}/>
                        <label htmlFor="">BNB</label>

                        <input type="radio" name="coin"  value='ETH' onChange={(e) => setPair(e.target.value)}/>
                        <label htmlFor="">ETH</label>
                    </ContentPair>
                </ContentWrapper>
            </ContentWrapperBlock>
            {resultView}
        </>
    );
};
