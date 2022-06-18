import React from 'react'
import './Navbar.css';
import logo from '../../assets/logo.svg'

import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <div className='container'>
        <div>
          <img src={logo} alt="Logo" />
        </div>
        <div className='menu'>
          <ul>
            <li>
             <Link to="/">List Crypto</Link> 
            </li>
            <li>
             <Link to="/news">News</Link> 
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
