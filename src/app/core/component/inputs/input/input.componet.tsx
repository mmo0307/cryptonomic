import React from 'react';
import { useInputProps } from '@component/inputs/input/input.props';
import { hoc } from '@shared/lib';

import styles from './input.module.scss';

const InputComponet = hoc(
  useInputProps,
  ({ placeholder, type, step, value, handleChange }) => (
    <div className={styles.inputContainer}>
      <input
        className={styles.input}
        type={type}
        step={step}
        placeholder=' '
        value={value}
        onChange={handleChange}
      />
      <div className={styles.cut}></div>
      <label htmlFor='firstname' className={styles.placeholder}>
        {placeholder}
      </label>
    </div>
  )
);

export { InputComponet };
