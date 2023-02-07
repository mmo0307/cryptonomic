import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {CoinRes, CoinsAttr, DataCoins, ResultCoins} from "../../globals/interface";
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
    const [price, setPrice] = useState<number>(1000);
    const [commission, setCommission] = useState<number>(0.1);
    const [percentShow, setPercentShow] = useState<number>(0.5);
    const [pair, setPair] = useState<string>("BTC");
    const [sortParam, setSortParam] = useState<string>("low");
    const [coins, setCoins] = useState<DataCoins[]>([]);
    const [coinsPair, setCoinsPair] = useState<DataCoins[]>([]);
    const [filterCoins, setFilterCoins] = useState<CoinsAttr[]>([]);

    const formattedCoins = useCallback((wallet:CoinsAttr[], pairToCoin:DataCoins[], sort:string, percentView:number, priceInvesting:number) => {
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
                        } as ResultCoins);
                    }
                    if(item.symbol === 'BTC'){
                        result.BTC.push({
                            coin: item.coin,
                            price: item.price
                        } as ResultCoins);
                    }
                    if(item.symbol === 'ETH'){
                        result.ETH.push({
                            coin: item.coin,
                            price: item.price
                        } as ResultCoins);
                    }
                    if(item.symbol === 'BNB'){
                        result.BNB.push({
                            coin: item.coin,
                            price: item.price
                        } as ResultCoins);
                    }
                }
        });

        if(pairToCoin.length > 0) {
            result.BTC.map((item) => {
                const findElement = result.USDT.find(el => el.coin === item.coin);
                if (findElement) {
                    const firstCalculate = (priceInvesting / findElement.price) - (((priceInvesting / findElement.price) * commission) / 100);
                    const secondCalculate = (+firstCalculate.toFixed(2) * item.price) - (((firstCalculate * item.price) * commission) / 100);
                    const thirdCalculate = +secondCalculate.toFixed(5) * pairToCoin[0].price;

                    item.percent = ((thirdCalculate * 100) / priceInvesting) - 100;
                    item.profitPrice = thirdCalculate.toFixed(2);

                    item.strategy = {
                        buyCoin: findElement.price,
                        sellPairCoin: item.price.toFixed(8),
                        sellPairUsdt: pairToCoin[0].price.toFixed(2)
                    }
                }
            });
            result.ETH.map((item) => {
                const findElement = result.USDT.find(el => el.coin === item.coin);
                if (findElement) {
                    const firstCalculate = (priceInvesting / findElement.price) - (((priceInvesting / findElement.price) * commission) / 100);
                    const secondCalculate = (+firstCalculate.toFixed(2) * item.price) - (((firstCalculate * item.price) * commission) / 100);
                    const thirdCalculate = +secondCalculate.toFixed(4) * pairToCoin[1].price;

                    item.percent = ((thirdCalculate * 100) / priceInvesting) - 100;
                    item.profitPrice = thirdCalculate.toFixed(2);

                    item.strategy = {
                        buyCoin: findElement.price,
                        sellPairCoin: item.price.toFixed(8),
                        sellPairUsdt: pairToCoin[1].price.toFixed(2)
                    }
                }
            });
            result.BNB.map((item) => {
                const findElement = result.USDT.find(el => el.coin === item.coin);
                if (findElement) {
                    const firstCalculate = (priceInvesting / findElement.price) - (((priceInvesting / findElement.price) * commission) / 100);
                    const secondCalculate = (+firstCalculate.toFixed(2) * item.price) - (((firstCalculate * item.price) * commission) / 100);
                    const thirdCalculate = +secondCalculate.toFixed(3) * pairToCoin[2].price;

                    item.percent = ((thirdCalculate * 100) / priceInvesting) - 100;
                    item.profitPrice = thirdCalculate.toFixed(2);

                    item.strategy = {
                        buyCoin: findElement.price,
                        sellPairCoin: item.price.toFixed(8),
                        sellPairUsdt: pairToCoin[2].price.toFixed(1)
                    }
                }
            });

            result.BTC = result.BTC.filter(item => item.percent > percentView).sort((a, b) => {
                if (sort === 'high') {
                    return b.percent - a.percent;
                } else {
                    return a.percent - b.percent;
                }
            });
            result.ETH = result.ETH.filter(item => item.percent > percentView).sort((a, b) => {
                if (sort === 'high') {
                    return b.percent - a.percent;
                } else {
                    return a.percent - b.percent;
                }
            });
            result.BNB = result.BNB.filter(item => item.percent > percentView).sort((a, b) => {
                if (sort === 'high') {
                    return b.percent - a.percent;
                } else {
                    return a.percent - b.percent;
                }
            });
        }

        return result;
    }, []);

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

    const resultView:JSX.Element = useMemo(() => {
        const res:CoinRes = formattedCoins(filterCoins, coinsPair, sortParam, percentShow, price);
        switch(pair){
            case "BTC": return (
                <Wrapper>
                    <WrapperBlock>
                        {res.BTC ?
                            res.BTC.map(item =>
                                <WrapperItem key={nanoid()}>
                                    <p>{item.coin}</p>
                                    <div>
                                        <div>Buy {item.coin}/USDT</div>
                                        <ItemBlock>
                                            by course:<BuyPrice>{item.strategy.buyCoin}</BuyPrice>
                                        </ItemBlock>
                                    </div>
                                    <div>
                                        <div>Sell {item.coin}/BTC</div>
                                        <ItemBlock>
                                            by course:<SellPrice>{item.strategy.sellPairCoin}</SellPrice>
                                        </ItemBlock>
                                    </div>
                                    <div>
                                        <div>Sell BTC/USDT</div>
                                        <ItemBlock>
                                            by course:<SellPrice>{item.strategy.sellPairUsdt}</SellPrice>
                                        </ItemBlock>
                                    </div>
                                    <ItemBlock>
                                        <p>Profit:</p>
                                        <p>{item.profitPrice}</p>
                                    </ItemBlock>
                                    <ItemBlock>
                                        <p>Percent:</p>
                                        <p>{item.percent.toFixed(2)}</p>
                                    </ItemBlock>
                                </WrapperItem>
                            )
                            : <Skeleton /> }
                    </WrapperBlock>
                </Wrapper>
            );
            case "BNB": return (
                <Wrapper>
                    <WrapperBlock>
                        {res.BNB ?
                            res.BNB.map(item =>
                                <WrapperItem key={nanoid()}>
                                    <p>{item.coin}</p>
                                    <div>
                                        <div>Buy {item.coin}/USDT</div>
                                        <ItemBlock>
                                            by course:<BuyPrice>{item.strategy.buyCoin}</BuyPrice>
                                        </ItemBlock>
                                    </div>
                                    <div>
                                        <div>Sell {item.coin}/BNB</div>
                                        <ItemBlock>
                                            by course:<SellPrice>{item.strategy.sellPairCoin}</SellPrice>
                                        </ItemBlock>
                                    </div>
                                    <div>
                                        <div>Sell BNB/USDT</div>
                                        <ItemBlock>
                                            by course:<SellPrice>{item.strategy.sellPairUsdt}</SellPrice>
                                        </ItemBlock>
                                    </div>
                                    <ItemBlock>
                                        <p>Profit:</p>
                                        <p>{item.profitPrice}</p>
                                    </ItemBlock>
                                    <ItemBlock>
                                        <p>Percent:</p>
                                        <p>{item.percent.toFixed(2)}</p>
                                    </ItemBlock>
                                </WrapperItem>
                            )
                            : <Skeleton /> }
                    </WrapperBlock>
                </Wrapper>
            );
            case "ETH": return (
                <Wrapper>
                    <WrapperBlock>
                        {res.ETH ?
                            res.ETH.map(item =>
                                <WrapperItem key={nanoid()}>
                                    <p>{item.coin}</p>
                                    <div>
                                        <div>Buy {item.coin}/USDT</div>
                                        <ItemBlock>
                                            by course:<BuyPrice>{item.strategy.buyCoin}</BuyPrice>
                                        </ItemBlock>
                                    </div>
                                    <div>
                                        <div>Sell {item.coin}/ETH</div>
                                        <ItemBlock>
                                            by course:<SellPrice>{item.strategy.sellPairCoin}</SellPrice>
                                        </ItemBlock>
                                    </div>
                                    <div>
                                        <div>Sell ETH/USDT</div>
                                        <ItemBlock>
                                            by course:<SellPrice>{item.strategy.sellPairUsdt}</SellPrice>
                                        </ItemBlock>
                                    </div>
                                    <ItemBlock>
                                        <p>Profit:</p>
                                        <p>{item.profitPrice}</p>
                                    </ItemBlock>
                                    <ItemBlock>
                                        <p>Percent:</p>
                                        <p>{item.percent.toFixed(2)}</p>
                                    </ItemBlock>
                                </WrapperItem>
                            )
                            : <Skeleton /> }
                    </WrapperBlock>
                </Wrapper>
            );
            default: return <></>;
        }
    }, [coinsPair, price, commission, sortParam, percentShow, pair]);

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
        setFilterCoins([]);
        coins.forEach((item:DataCoins) => {
            coinsArrayFilterAndSort(item);
        });
    }, [coins]);

    /*

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const account = accounts[0];
                console.log(account);
     */

    return (
        <>
            <ContentWrapperBlock>
                <ContentWrapper>
                    <ContentBlock>
                        <Block>
                            <p>Transaction amount (USDT)</p>
                            <input type="number" placeholder="amount" step={100} value={price}  onChange={(e) => setPrice(+e.target.value)}/>
                        </Block>
                        <Block>
                            <p>Exchange commission (%)</p>
                            <input type="number" placeholder="commission" value={commission} onChange={(e) => setCommission(+e.target.value)}/>
                        </Block>
                    </ContentBlock>
                    <ContentBlock>
                        <Block>
                            <p>Show more (%)</p>
                            <input type="number" placeholder="percent" step={0.1} value={percentShow} onChange={(e) => setPercentShow(+e.target.value)}/>
                        </Block>
                        <Block>
                            <p>Sort by</p>
                            <select name="sort_by" onChange={(e) => setSortParam(e.target.value)}>
                                <option value="low">Low - High</option>
                                <option value="high">High - Low</option>
                            </select>
                        </Block>
                    </ContentBlock>
                    <ContentPair>
                        <input type="radio" name="coin" checked={pair === 'BTC'} value='BTC' onChange={(e) => setPair(e.target.value)}/>
                        <label htmlFor="">BTC</label>

                        <input type="radio" name="coin" checked={pair === 'BNB'}  value='BNB' onChange={(e) => setPair(e.target.value)}/>
                        <label htmlFor="">BNB</label>

                        <input type="radio" name="coin" checked={pair === 'ETH'}  value='ETH' onChange={(e) => setPair(e.target.value)}/>
                        <label htmlFor="">ETH</label>
                    </ContentPair>
                </ContentWrapper>
            </ContentWrapperBlock>
            {resultView}
        </>
    );
};
