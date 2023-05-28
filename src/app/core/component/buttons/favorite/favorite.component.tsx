import React from 'react';
import { useFavorite } from '@component/buttons/favorite/favorite.props';
import { hoc } from '@shared/lib';
import classNames from 'classnames';

import styles from './favorite.module.scss';

const FavoriteButton = hoc(useFavorite, ({ handleClick, active }) => (
  <button
    className={classNames(styles.favoriteButton, {
      [styles.active]: active
    })}
    onClick={handleClick}
  >
    <div className={styles.icon}>
      <div className={styles.star}></div>
    </div>
    <span>Favorite</span>
  </button>
));

export { FavoriteButton };
