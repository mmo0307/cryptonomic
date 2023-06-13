import { useEffect } from 'react';
import { useGetSearchTrendingQuery } from '@store/api';

const useMarketProps = () => {
  const { refetch, data, isError, isLoading } = useGetSearchTrendingQuery('');

  return {
    loading: isLoading,
    error: isError,
    coins: data?.coins
  };
};

export { useMarketProps };
