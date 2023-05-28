import React from 'react';
import { Link } from 'react-router-dom';
import logo from '@shared/ui/assets/images/svg/404.svg';

import styles from './error.module.scss';

const Error = () => {
  return (
    <div className={styles.error}>
      <div className={styles.error_text}>
        <img src={logo} alt='404' className={styles.error_img} />
        <span>Error</span>
        <Link to='/' className={styles.back}>
          Back main
        </Link>
      </div>
    </div>
  );
};

export { Error };
