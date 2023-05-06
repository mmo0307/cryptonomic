import React from 'react';
import { Link } from 'react-router-dom';
import logo from '@shared/ui/assets/images/svg/404.svg';

import styles from './404.module.scss';

const Page404 = () => {
  return (
    <div className={styles.error}>
      <div className={styles.error_text}>
        <img src={logo} alt='404' className={styles.error_img} />
        <span>Error 404</span>
        <Link to='/' className={styles.back}>
          Back main
        </Link>
      </div>
    </div>
  );
};

export { Page404 };
