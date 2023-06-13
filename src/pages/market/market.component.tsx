import React from 'react';
import { useMarketProps } from '@pages/market/market.props';
import { hoc } from '@shared/lib';
import { v4 as uuid } from 'uuid';

const Market = hoc(useMarketProps, ({ loading, error, coins }) => {
  return (
    <div>
      {!error &&
        !loading &&
        coins.map((el: any) => (
          <div key={uuid()}>
            <p>{el.item.name}</p>
            <img src={el.item.large} alt='Coin IMG' />
          </div>
        ))}
    </div>
  );
});

export { Market };
