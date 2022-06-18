import React from 'react'

import './skeleton.css';

export default function Skeleton() {
  return (
    <div className="box">
      <div className="post">
        <div className="avatar"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      <div className="post">
        <div className="avatar"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      <div className="post">
        <div className="avatar"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </div>
  )
}
