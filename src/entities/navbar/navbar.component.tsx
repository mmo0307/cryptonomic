import React from 'react';
import { Link } from 'react-router-dom';
import { useNavbar } from '@entities/navbar/navbar.props';
import { formatAddress, formatChainAsNum, hoc } from '@shared/lib';
import logo from '@shared/ui/assets/images/svg/logo-cryptonomic.svg';
import fireData from '@shared/ui/assets/json_lottie_file/fire.json';
import Lottie from 'lottie-react';

import styles from './navbar.module.scss';

const NavbarComponent = hoc(
  useNavbar,
  ({
    wallet,
    hasProvider,
    isConnecting,
    connectMetaMask,
    error,
    errorMessage,
    clearError
  }) => (
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
            <Link to='/market'>Markets</Link>
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
        {hasProvider && wallet.accounts.length > 0 && (
          <>
            <p style={{ color: 'white' }}>
              {formatAddress(wallet.accounts[0])}
            </p>
            <p style={{ color: 'white' }}>Wallet Balance: {wallet.balance}</p>
            <p style={{ color: 'white' }}>Hex ChainId: {wallet.chainId}</p>
            <p style={{ color: 'white' }}>
              Numeric ChainId: {formatChainAsNum(wallet.chainId)}
            </p>
          </>
        )}
        {window.ethereum?.isMetaMask && wallet.accounts.length < 1 && (
          <button
            className={styles.connectWallet}
            disabled={isConnecting}
            onClick={connectMetaMask}
          >
            Connect wallet
          </button>
        )}
        {error && (
          <div onClick={clearError}>
            <strong>Error:</strong> {errorMessage}
          </div>
        )}
        {!hasProvider && (
          <a href='https://metamask.io' target='_blank' rel='noreferrer'>
            Install MetaMask
          </a>
        )}
      </div>
    </nav>
  )
);

export { NavbarComponent };
