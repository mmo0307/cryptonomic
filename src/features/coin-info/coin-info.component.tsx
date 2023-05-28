import React from 'react';
import { useCoinInfoProps } from '@features/coin-info/coin-info.props';
import { CoinView } from '@features/coin-info/components/view/coin-view.component';
import { Error, SkeletonComponent } from '@root/entities';
import { hoc } from '@shared/lib';

const CoinInfoComponent = hoc(
  useCoinInfoProps,
  ({
    coinMarketDataLoading,
    marketChartDataLoading,
    coinMarketData,
    marketChartData,
    coinMarketDataError,
    marketChartDataError,
    selectedOption,
    handleOptionChange
  }) => {
    if (
      coinMarketDataLoading ||
      marketChartDataLoading ||
      !coinMarketData ||
      !marketChartData
    ) {
      return <SkeletonComponent />;
    }

    if (coinMarketDataError || marketChartDataError) {
      return <Error />;
    }

    return (
      <CoinView
        coinChartData={marketChartData}
        data_coin={coinMarketData}
        selectedOption={selectedOption}
        handleOptionChange={handleOptionChange}
      />
    );
  }
);

export { CoinInfoComponent };
