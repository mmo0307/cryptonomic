import React from 'react';
import { useDropdown } from '@component/drop-down/drop-down.props';
import { hoc } from '@shared/lib';
import AngleDown from '@shared/ui/assets/icons/AngleDown';
import classNames from 'classnames';

import styles from './drop-down.module.scss';

const Dropdown = hoc(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  useDropdown,
  ({
    className,
    selectLabel,
    toggleSelectLabel,
    label,
    color,
    options,
    showOptions,
    toggleShowElements,
    handleSortParam
  }) => (
    <div
      className={classNames(styles.container, styles[color], className, {
        [styles.focused]: showOptions
      })}
    >
      <div className={styles.content} onClick={toggleShowElements}>
        <p>{selectLabel === '' ? label : selectLabel}</p>
        <AngleDown
          className={classNames(styles.icon, {
            [styles.focus]: !!selectLabel
          })}
        />
      </div>
      {showOptions && (
        <div className={styles.options}>
          {options.map(({ title, option }, index) => (
            <p
              key={index}
              className={styles.option}
              onClick={() => {
                handleSortParam(option);
                toggleSelectLabel(title);
                toggleShowElements();
              }}
            >
              {title}
            </p>
          ))}
        </div>
      )}
    </div>
  )
);

export { Dropdown };
