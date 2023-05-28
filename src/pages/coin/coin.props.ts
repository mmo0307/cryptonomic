import { ChangeEvent, useState } from 'react';
import { deviceMin } from '@shared/lib';
import useMediaQuery from '@shared/lib/hooks/use-media-query';
import { useGetCoinsQuery } from '@store/api';

const useCoin = () => {
  const { data, isError, isLoading } = useGetCoinsQuery({
    vs_currency: 'usd'
    // per_page: 10,
    // page: 1
  });

  const [search, setSearch] = useState('');

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const deviceLaptop = useMediaQuery(deviceMin.laptop);

  const deviceTablet = useMediaQuery(deviceMin.tablet);

  return {
    deviceTablet,
    deviceLaptop,
    handleSearch,
    search,
    data,
    isError,
    isLoading
  };
};

export { useCoin };
