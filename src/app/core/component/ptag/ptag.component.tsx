import React from 'react';
import classNames from 'classnames';

import { PtagProps } from './ptag.props';

import styles from './ptag.module.scss';

const Ptag = ({
  defaultSize = 'm',
  children,
  className,
  ...props
}: PtagProps) => (
  <p
    className={classNames(className, styles.pTag, {
      [styles.s]: defaultSize === 's',
      [styles.m]: defaultSize === 'm',
      [styles.l]: defaultSize === 'l',
      [styles.xl]: defaultSize === 'xl'
    })}
    {...props}
  >
    {children}
  </p>
);

export { Ptag };
