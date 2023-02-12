import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/svg/logo.svg';

import { Container, Menu, Nav } from './Navbar.styles';

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
              <Link to='/'>List Crypto</Link>
            </li>
            <li>
              <Link to='/arbitrage'>Arbitrage</Link>
            </li>
            <li>
              <Link to='/news'>News</Link>
            </li>
          </ul>
        </Menu>
      </Container>
    </Nav>
  );
};

export { Navbar };
