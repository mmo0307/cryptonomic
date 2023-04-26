import React, { useState } from 'react';
import classNames from 'classnames';
import gsap from 'gsap';

import styles from './favorite.module.scss';

const FavoriteButton = () => {
  const [animated, setAnimated] = useState(false);
  const [active, setActive] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (animated) {
      return;
    }

    setAnimated(true);

    const button = e.currentTarget;

    gsap.to(button, {
      keyframes: [
        {
          '--star-y': '-36px',
          duration: 0.3,
          ease: 'power2.out'
        },
        {
          '--star-y': '48px',
          '--star-scale': 0.4,
          duration: 0.325,
          onStart() {
            button.classList.add('starRound');
          }
        },
        {
          '--star-y': '-64px',
          '--star-scale': 1,
          duration: 0.45,
          ease: 'power2.out',
          onStart() {
            console.log(1);
            // button.classList.toggle('active');
            setActive(!active);
            setTimeout(() => button.classList.remove('starRound'), 100);
          }
        },
        {
          '--star-y': '0px',
          duration: 0.45,
          ease: 'power2.in'
        },
        {
          '--button-y': '3px',
          duration: 0.11
        },
        {
          '--button-y': '0px',
          '--star-face-scale': 0.65,
          duration: 0.125
        },
        {
          '--star-face-scale': 1,
          duration: 0.15
        }
      ],
      clearProps: true,

      onComplete() {
        setAnimated(false);
      }
    });

    gsap.to(button, {
      keyframes: [
        {
          '--star-hole-scale': 0.8,
          duration: 0.5,
          ease: 'elastic.out(1, .75)'
        },
        {
          '--star-hole-scale': 0,
          duration: 0.2,
          delay: 0.2
        }
      ]
    });

    gsap.to(button, {
      '--star-rotate': '360deg',
      duration: 1.55,
      clearProps: true
    });
  };

  return (
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
  );
};

export { FavoriteButton };
