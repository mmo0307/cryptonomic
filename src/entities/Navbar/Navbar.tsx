import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Arrow } from '@shared/ui/assets/icons/Arrow';
import fireData from '@shared/ui/assets/json_lottie_file/fire.json';
import logo from '@shared/ui/assets/svg/logo-cryptonomic.svg';
import classNames from 'classnames';
import Lottie from 'lottie-react';

import styles from './navbar.module.scss';

const Navbar: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [modeActive, setModeActive] = useState<boolean>(false);
  const getAccount = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      setAccount(accounts[0]);
    }
  };

  return (
    <div className={styles.nav}>
      <div className={styles.container}>
        <div>
          <Link to='/'>
            <img src={logo} alt='Logo' />
          </Link>
        </div>
        <div className={styles.menu}>
          <ul>
            <li>
              <Link to='/'>Markets</Link>
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
              <div className={styles.dropBlock}>
                <div className={styles.block}>
                  <div>
                    <p className={styles.titleDrop}>Core</p>
                    <ul>
                      <li>
                        <Link to='/arbitrage'>
                          Arbitrage <Arrow color={'#919191'} />
                        </Link>
                      </li>
                      <li>Pump (soon)</li>
                      <li>Pump (soon)</li>
                    </ul>
                  </div>

                  <div>
                    <p className={styles.titleDrop}>Products</p>
                    <ul>
                      <li>Arbitrage</li>
                      <li>Pump (soon)</li>
                      <li>Pump (soon)</li>
                    </ul>
                  </div>

                  <div>
                    <p className={styles.titleDrop}>Links</p>
                    <ul>
                      <li>Arbitrage</li>
                      <li>Pump (soon)</li>
                      <li>Pump (soon)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li className={styles.textDisable}>
              <Link to='/'>Analytics(soon)</Link>
            </li>
          </ul>

          <div
            className={classNames(styles.mode, {
              [styles.active]: modeActive
            })}
            onClick={() => setModeActive(!modeActive)}
          >
            <span></span>
          </div>

          {account ? (
            account.slice(0, 5) + '...' + account.slice(-4)
          ) : (
            <button className={styles.connectWallet} onClick={getAccount}>
              Connect wallet
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export { Navbar };
