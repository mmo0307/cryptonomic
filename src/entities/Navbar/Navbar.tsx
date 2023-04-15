import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Arrow } from '@shared/ui/assets/icons/Arrow';
import fireData from '@shared/ui/assets/json_lottie_file/fire.json';
import logo from '@shared/ui/assets/svg/logo-cryptonomic.svg';
import Lottie from 'lottie-react';

import {
  Block,
  ConnectWallet,
  Container,
  DropDownBlock,
  Menu,
  Nav
} from './Navbar.styles';

const Navbar: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const getAccount = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      setAccount(accounts[0]);
    }
  };

  return (
    <Nav>
      <Container>
        <div>
          <Link to='/'>
            <img src={logo} alt='Logo' />
          </Link>
        </div>
        <Menu>
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
              <DropDownBlock className='dropBlock'>
                <Block>
                  <div>
                    <p className='titleDrop'>Core</p>
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
                    <p className='titleDrop'>Products</p>
                    <ul>
                      <li>Arbitrage</li>
                      <li>Pump (soon)</li>
                      <li>Pump (soon)</li>
                    </ul>
                  </div>

                  <div>
                    <p className='titleDrop'>Links</p>
                    <ul>
                      <li>Arbitrage</li>
                      <li>Pump (soon)</li>
                      <li>Pump (soon)</li>
                    </ul>
                  </div>
                </Block>
              </DropDownBlock>
            </li>
            <li className='textDisable'>
              <Link to='/'>Analytics(soon)</Link>
            </li>
          </ul>
          {account ? (
            account.slice(0, 5) + '...' + account.slice(-4)
          ) : (
            <ConnectWallet onClick={getAccount}>Connect wallet</ConnectWallet>
          )}
        </Menu>
      </Container>
    </Nav>
  );
};

export { Navbar };
