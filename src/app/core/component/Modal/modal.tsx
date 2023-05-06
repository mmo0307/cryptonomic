import React, { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';

import styles from './modal.module.scss';

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

interface Props {
  label?: string;
  active: boolean;
  setActive: Dispatcher<boolean>;
  children: any;
}

export const Modal = ({ active, setActive, children, label }: Props) => {
  return (
    <div
      className={classNames(styles.modal, {
        [styles.active]: active
      })}
      onClick={e => e.stopPropagation()}
    >
      <div
        className={classNames(styles.modal_content, {
          [styles.active]: active
        })}
      >
        <div className={styles.modal_content_header}>
          {label && (
            <div>
              <p className={styles.modal_content_title}>{label}</p>
            </div>
          )}
          <div>
            <span onClick={() => setActive(false)}>X</span>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};
