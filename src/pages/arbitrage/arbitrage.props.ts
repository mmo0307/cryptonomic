import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  CoinRes,
  CoinsAttr,
  DataCoins,
  ResultCoins
} from '@pages/arbitrage/models/arbitrage';

const useArbitrageProps = () => {
  const pairArray = ['BTC', 'BNB', 'ETH'];

  const [price, setPrice] = useState<number>(1000);

  const [commission, setCommission] = useState<number>(0.1);

  const [percentShow, setPercentShow] = useState<number>(0.5);

  const [pair, setPair] = useState<string>('BTC');

  const [sortParam, setSortParam] = useState<string>('');

  const [coins, setCoins] = useState<DataCoins[]>([]);

  const [coinsPair, setCoinsPair] = useState<DataCoins[]>([]);

  const [filterCoins, setFilterCoins] = useState<CoinsAttr[]>([]);

  const coinsArrayFilterAndSort = useCallback((item: DataCoins) => {
    if (
      item.symbol === 'BTCUSDT' ||
      item.symbol === 'ETHUSDT' ||
      item.symbol === 'BNBUSDT'
    ) {
      item.price = +item.price;

      setCoinsPair(prev => [...prev, item]);
    }

    if (
      item.symbol.includes('USDT') ||
      item.symbol.includes('BTC') ||
      item.symbol.includes('BNB') ||
      item.symbol.includes('ETH')
    ) {
      if (
        item.symbol.split('USDT')[0] !== '' ||
        item.symbol.split('BTC')[0] !== '' ||
        item.symbol.split('BNB')[0] !== '' ||
        item.symbol.split('ETH')[0] !== ''
      ) {
        let pair = '';

        if (item.symbol.split('USDT')[1] === '') {
          pair = 'USDT';
        }

        if (item.symbol.split('BTC')[1] === '') {
          pair = 'BTC';
        }

        if (item.symbol.split('BNB')[1] === '') {
          pair = 'BNB';
        }

        if (item.symbol.split('ETH')[1] === '') {
          pair = 'ETH';
        }

        switch (pair) {
          case 'USDT': {
            setFilterCoins(prev =>
              [
                ...prev,
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
              })
            );
            break;
          }
          case 'BTC': {
            setFilterCoins(prev =>
              [
                ...prev,
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
              })
            );
            break;
          }
          case 'BNB': {
            setFilterCoins(prev =>
              [
                ...prev,
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
              })
            );
            break;
          }
          case 'ETH': {
            setFilterCoins(prev =>
              [
                ...prev,
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
              })
            );
            break;
          }
        }
      }
    }
  }, []);

  const handleSortParam = (param: string): void => {
    setSortParam(param);
  };

  const handleChangePrice = (value: number | string): void => {
    setPrice(typeof value === 'string' ? parseFloat(value) : value);
  };

  const handleChangeCommission = (value: number | string): void => {
    setCommission(typeof value === 'string' ? parseFloat(value) : value);
  };

  const handleChangePercent = (value: number | string): void => {
    setPercentShow(typeof value === 'string' ? parseFloat(value) : value);
  };

  const formattedCoins = useCallback(
    (
      wallet: CoinsAttr[],
      pairToCoin: DataCoins[],
      sort: string,
      percentView: number,
      priceInvesting: number
    ) => {
      const result: CoinRes = {
        USDT: [],
        BTC: [],
        ETH: [],
        BNB: []
      };

      wallet.forEach((item, _, selfWallet) => {
        const tokenSymbolUSDT = selfWallet.filter(
          el => el.coin === item.coin && el.symbol === 'USDT'
        );

        if (tokenSymbolUSDT[0]) {
          if (item.symbol === 'USDT') {
            result.USDT.push({
              coin: item.coin,
              price: item.price
            } as ResultCoins);
          }
          if (item.symbol === 'BTC') {
            result.BTC.push({
              coin: item.coin,
              price: item.price
            } as ResultCoins);
          }
          if (item.symbol === 'ETH') {
            result.ETH.push({
              coin: item.coin,
              price: item.price
            } as ResultCoins);
          }
          if (item.symbol === 'BNB') {
            result.BNB.push({
              coin: item.coin,
              price: item.price
            } as ResultCoins);
          }
        }
      });

      if (pairToCoin.length > 0) {
        result.BTC.map(item => {
          const findElement = result.USDT.find(el => el.coin === item.coin);

          if (findElement) {
            const firstCalculate =
              priceInvesting / findElement.price -
              ((priceInvesting / findElement.price) * commission) / 100;

            const secondCalculate =
              +firstCalculate.toFixed(2) * item.price -
              (firstCalculate * item.price * commission) / 100;

            const thirdCalculate =
              +secondCalculate.toFixed(5) * pairToCoin[0].price;

            item.percent = (thirdCalculate * 100) / priceInvesting - 100;

            item.profitPrice = thirdCalculate.toFixed(2);

            item.strategy = {
              buyCoin: findElement.price,
              sellPairCoin: item.price.toFixed(8),
              sellPairUsdt: pairToCoin[0].price.toFixed(2)
            };
          }
        });

        result.ETH.map(item => {
          const findElement = result.USDT.find(el => el.coin === item.coin);

          if (findElement) {
            const firstCalculate =
              priceInvesting / findElement.price -
              ((priceInvesting / findElement.price) * commission) / 100;

            const secondCalculate =
              +firstCalculate.toFixed(2) * item.price -
              (firstCalculate * item.price * commission) / 100;

            const thirdCalculate =
              +secondCalculate.toFixed(3) * pairToCoin[1].price -
              (+secondCalculate.toFixed(3) * pairToCoin[2].price * commission) /
                100;

            item.percent = (thirdCalculate * 100) / priceInvesting - 100;

            item.profitPrice = thirdCalculate.toFixed(2);

            item.strategy = {
              buyCoin: findElement.price,
              sellPairCoin: item.price.toFixed(8),
              sellPairUsdt: pairToCoin[1].price.toFixed(2)
            };
          }
        });

        result.BNB.map(item => {
          const findElement = result.USDT.find(el => el.coin === item.coin);

          if (findElement) {
            const firstCalculate =
              priceInvesting / findElement.price -
              ((priceInvesting / findElement.price) * commission) / 100;

            const secondCalculate =
              +firstCalculate.toFixed(2) * item.price -
              (firstCalculate * item.price * commission) / 100;

            const thirdCalculate =
              +secondCalculate.toFixed(3) * pairToCoin[2].price -
              (+secondCalculate.toFixed(3) * pairToCoin[2].price * commission) /
                100;

            item.percent = (thirdCalculate * 100) / priceInvesting - 100;

            item.profitPrice = thirdCalculate.toFixed(2);

            item.strategy = {
              buyCoin: findElement.price,
              sellPairCoin: item.price.toFixed(8),
              sellPairUsdt: pairToCoin[2].price.toFixed(1)
            };
          }
        });

        result.BTC = result.BTC.filter(item => item.percent > percentView).sort(
          (a, b) => {
            if (sort === 'high') {
              return b.percent - a.percent;
            } else {
              return a.percent - b.percent;
            }
          }
        );

        result.ETH = result.ETH.filter(item => item.percent > percentView).sort(
          (a, b) => {
            if (sort === 'high') {
              return b.percent - a.percent;
            } else {
              return a.percent - b.percent;
            }
          }
        );

        result.BNB = result.BNB.filter(item => item.percent > percentView).sort(
          (a, b) => {
            if (sort === 'high') {
              return b.percent - a.percent;
            } else {
              return a.percent - b.percent;
            }
          }
        );
      }

      return result;
    },
    []
  );

  const resultView = useMemo(() => {
    return formattedCoins(
      filterCoins,
      coinsPair,
      sortParam,
      percentShow,
      price
    );
  }, [coinsPair, price, commission, sortParam, percentShow, pair]);

  useEffect(() => {
    const abortController = new AbortController();

    void (async function fetchData() {
      try {
        const response = await fetch(
          'https://api1.binance.com/api/v3/ticker/price'
        );

        const data = await response.json();

        setCoins(data);
      } catch (error) {
        console.log('error', error);
      }
    })();
    return () => {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(
          'https://api1.binance.com/api/v3/ticker/price'
        );

        const data = await response.json();

        setCoins(data);
      } catch (error) {
        console.log('error', error);
      }
    }, 15 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCoinsPair([]);

    setFilterCoins([]);

    coins.forEach((item: DataCoins) => {
      coinsArrayFilterAndSort(item);
    });
  }, [coins]);

  // console.log('resultView=>', resultView[pair]);

  return {
    pairArray,
    price,
    commission,
    percentShow,
    pair,
    setPair,
    sortParam,
    coins,
    coinsPair,
    handleChangePrice,
    handleChangeCommission,
    handleChangePercent,
    setSortParam,
    setCoins,
    setCoinsPair,
    filterCoins,
    setFilterCoins,
    handleSortParam,
    resultView
  };
};

export { useArbitrageProps };
