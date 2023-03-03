import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/svg/404.svg';

import './404.css';

const Page404 = () => {
  return (
    <div id='oopss'>
      <div id='error-text'>
        <img src={logo} alt='404' className='error_img' />
        <span>Error 404</span>
        <Link to='/' className='back'>
          Back main
        </Link>
      </div>
    </div>
  );
};

export { Page404 };
