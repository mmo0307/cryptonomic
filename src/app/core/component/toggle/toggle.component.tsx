import React from 'react';
import { Ptag } from '@app/core/component';
import { useToggle } from '@component/toggle/toggle.props';
import { hoc } from '@shared/lib';
import minus from '@shared/ui/assets/icons/minus.svg';
import plus from '@shared/ui/assets/icons/plus.svg';
import classNames from 'classnames';

import styles from './toggle.module.scss';

const ToggleComponent = hoc(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  useToggle,
  ({ active, setActive, number, title, text }) => (
    <div className={classNames(styles.container, { [styles.active]: active })}>
      <div className={styles.wrapper}>
        <div className={styles.block}>
          <div className={styles.text_block}>
            <Ptag defaultSize='s' className={styles.text_block_label_number}>
              {number}
            </Ptag>
            <Ptag defaultSize='s' className={styles.text_block_label_text}>
              {title}
            </Ptag>
          </div>
          <div onClick={() => setActive(!active)}>
            <img
              className={classNames(styles.toggle_button, {
                [styles.toggle_button_active]: active
              })}
              src={active ? plus : minus}
              alt='icon'
            />
          </div>
        </div>
        {active && (
          <>
            <div className={styles.line}></div>
            <div>
              <Ptag defaultSize='s' className={styles.text}>
                {text}
              </Ptag>
            </div>
          </>
        )}
      </div>
    </div>
  )
);

export { ToggleComponent };
