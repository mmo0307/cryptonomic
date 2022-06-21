import React from 'react';
import { Link } from "react-router-dom";

import './404.css';

export default function Page404() {
  return (
    <div id='oopss'>
        <div id='error-text'>
            <img src="https://cdn.rawgit.com/ahmedhosna95/upload/1731955f/sad404.svg" alt="404" className='error_img'/>
            <span>Error 404</span>
                <Link to="/" className="back">Back main</Link>
        </div>
    </div>
  )
}
