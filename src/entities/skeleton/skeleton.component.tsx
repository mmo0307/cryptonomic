import React from 'react';

import styles from './skeleton.module.scss';

const SkeletonComponent: React.FC = () => {
  return (
    <div className={styles.box}>
      <div className={styles.post}>
        <div className={styles.avatar}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>

      <div className={styles.post}>
        <div className={styles.avatar}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>

      <div className={styles.post}>
        <div className={styles.avatar}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
    </div>
  );
};

export { SkeletonComponent };
