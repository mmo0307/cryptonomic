import React from 'react';
import { Link } from 'react-router-dom';
import { useNavbar } from '@entities/navbar/navbar.props';
import { hoc } from '@shared/lib';
import logo from '@shared/ui/assets/images/svg/logo-cryptonomic.svg';
import fireData from '@shared/ui/assets/json_lottie_file/fire.json';
import Lottie from 'lottie-react';

import styles from './navbar.module.scss';

const NavbarComponent = hoc(useNavbar, ({ getAccount, account }) => (
  <nav className={styles.navbar}>
    <div className={styles.menu}>
      <div>
        <Link to='/'>
          <img className={styles.logo} src={logo} alt='Logo' />
        </Link>
      </div>

      <ul className={styles.list}>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/markets'>Markets</Link>
        </li>
        <li>
          <Link to='/news'>News</Link>
        </li>
        <li>
          <Link to='/' style={{ display: 'inline-flex', gap: '3px' }}>
            <Lottie
              animationData={fireData}
              loop={true}
              style={{ height: '15px' }}
            />
            Themes
          </Link>
          <ul className={styles.dropMenu}>
            <li>
              <Link to='/arbitrage'>Arbitrage</Link>
            </li>
            <li>
              <Link to='/'>Gainers / Losers</Link>
            </li>
            <li>
              <Link to='/'>Top 7</Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <div>
      {account ? (
        <p style={{ color: 'white' }}>
          {account.slice(0, 5) + '...' + account.slice(-4)}
        </p>
      ) : (
        <button className={styles.connectWallet} onClick={getAccount}>
          Connect wallet
        </button>
      )}
    </div>
  </nav>
));

export { NavbarComponent };
