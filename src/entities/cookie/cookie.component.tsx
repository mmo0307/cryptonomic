import React from 'react';

import styles from './cookie.module.scss';

const CookieComponent = () => {
  return (
    <div className={styles['cookie-card']}>
      <span className={styles.title}>🍪 Cookie Notice</span>
      <p className={styles.description}>
        We use cookies to ensure that we give you the best experience on our
        website. <a href='#'>Read cookies policies</a>.{' '}
      </p>
      <div className={styles.actions}>
        <button className={styles.pref}>Manage your preferences</button>
        <button className={styles.accept}>Accept</button>
      </div>
    </div>
  );
};

export { CookieComponent };
