import React from 'react';
import { Link } from 'react-router-dom';
import { Arrow } from '@assets/icons/Arrow';

import logo from '../../assets/svg/logo.svg';

import {
  Block,
  ConnectWallet,
  Container,
  DropDownBlock,
  Menu,
  Nav
} from './Navbar.styles';

const Navbar = () => {
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
              <Link to='/'>🔥Themes</Link>
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
          <ConnectWallet>Connect wallet</ConnectWallet>
        </Menu>
      </Container>
    </Nav>
  );
};

export { Navbar };
