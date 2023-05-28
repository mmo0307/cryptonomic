import React from 'react';
import { Dropdown, InputComponet } from '@app/core/component';
import { useArbitrageProps } from '@pages/arbitrage/arbitrage.props';
import { SkeletonComponent } from '@root/entities';
import { hoc } from '@shared/lib';
import { nanoid } from 'nanoid';

import styles from './arbitrage.module.scss';

const Arbitrage = hoc(
  useArbitrageProps,
  ({
    pair,
    setPair,
    pairArray,
    price,
    commission,
    percentShow,
    handleChangePrice,
    handleChangeCommission,
    handleChangePercent,
    handleSortParam,
    resultView
  }) => (
    <>
      <section>
        <div className={styles.block}>
          <div className={styles.wrapper}>
            <div className={styles.inputBlock}>
              <InputComponet
                placeholder='Transaction amount (USDT)'
                type='number'
                step={100}
                value={price}
                onChange={handleChangePrice}
              />

              <InputComponet
                placeholder='Exchange commission (%)'
                type='number'
                value={commission}
                onChange={handleChangeCommission}
              />

              <InputComponet
                placeholder='Show more (%)'
                type='number'
                step={0.1}
                value={percentShow}
                onChange={handleChangePercent}
              />
            </div>

            <div>
              <div className={styles.radioBlock}>
                {pairArray.map(item => (
                  <label
                    key={nanoid()}
                    htmlFor={`${item}-option`}
                    className={styles.lRadio}
                  >
                    <input
                      type='radio'
                      id={`${item}-option`}
                      name='selector'
                      tabIndex={1}
                      checked={pair === item}
                      onChange={() => setPair(item)}
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>

              <Dropdown
                options={[
                  { title: 'LOW - HIGH', option: 'low' },
                  { title: 'HIGH - LOW', option: 'high' }
                ]}
                label='Sort by'
                color='black'
                handleSortParam={handleSortParam}
              />
            </div>
          </div>
        </div>

        <div className={styles.coin_wrapper}>
          <div className={styles.coin_wrapper_block}>
            {resultView[pair] ? (
              resultView[pair].map(item => (
                <div className={styles.coin_wrapper_block_item} key={nanoid()}>
                  <p>{item.coin}</p>
                  <div>
                    <div>Buy {item.coin}/USDT</div>
                    <div className={styles.coin_wrapper_block_item_content}>
                      by course:
                      <p className={styles.coin_buyPrice}>
                        {item.strategy.buyCoin}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div>
                      Sell {item.coin}/{pair}
                    </div>
                    <div className={styles.coin_wrapper_block_item_content}>
                      by course:
                      <p className={styles.coin_sellPrice}>
                        {item.strategy.sellPairCoin}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div>Sell {pair}/USDT</div>
                    <div className={styles.coin_wrapper_block_item_content}>
                      by course:
                      <p className={styles.coin_sellPrice}>
                        {item.strategy.sellPairUsdt}
                      </p>
                    </div>
                  </div>
                  <div className={styles.coin_wrapper_block_item_content}>
                    <p>Profit:</p>
                    <p>{item.profitPrice}</p>
                  </div>
                  <div className={styles.coin_wrapper_block_item_content}>
                    <p>Percent:</p>
                    <p>{item.percent.toFixed(2)}</p>
                  </div>
                </div>
              ))
            ) : (
              <SkeletonComponent />
            )}
          </div>
        </div>
      </section>
    </>
  )
);

export { Arbitrage };
