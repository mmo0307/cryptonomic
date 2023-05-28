import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { RadioInputChangeEvent } from '@features/coin-info/models/IcoinInfo';
import { useGetCoinQuery, useGetMarketChartQuery } from '@store/api';

const useCoinInfoProps = () => {
  //1-365 days
  const [days, setDays] = useState<number>(365);

  //select tabs
  const [selectedOption, setSelectedOption] = useState('radio-1');

  const { id } = useParams<string>();

  const market_data = true;

  const community_data = true;

  const currency = 'usd';

  const {
    data: coinMarketData,
    isLoading: coinMarketDataLoading,
    isError: coinMarketDataError
  } = useGetCoinQuery({
    id,
    market_data,
    community_data
  });

  const {
    data: marketChartData,
    isLoading: marketChartDataLoading,
    isError: marketChartDataError
  } = useGetMarketChartQuery({
    id,
    currency,
    days
  });

  const handleOptionChange = (event: RadioInputChangeEvent) => {
    setSelectedOption(event.target.value);
  };

  return {
    selectedOption,
    handleOptionChange,
    marketChartData,
    marketChartDataLoading,
    marketChartDataError,
    coinMarketData,
    coinMarketDataLoading,
    coinMarketDataError
  };
};

export { useCoinInfoProps };
