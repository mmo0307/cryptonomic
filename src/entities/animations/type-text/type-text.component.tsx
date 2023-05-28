import React from 'react';
import { useTypeText } from '@entities/animations/type-text/type-text.props';
import { hoc } from '@shared/lib';

import styles from './type-text.module.scss';

const TypingAnimation = hoc(useTypeText, ({ children, currentCharIndex }) => (
  <span className={styles.typewriter}>
    {children.slice(0, currentCharIndex)}
  </span>
));

export { TypingAnimation };
