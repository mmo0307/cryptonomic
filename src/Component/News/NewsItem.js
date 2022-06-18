import React from 'react'

import './newsitem.css';
import image from '../../assets/logo.svg'

export default function NewsItem({title, url, source, country}) {
  return (
        // <p>{title}</p>
        // <p>{country}</p>
        // <p>{source}</p>
        // <a href={url}>Read More</a>
      <div className="card-container">
        <div className="card-image">
          <img src={image} alt="a brand new sports car" />
        </div>
        <div className="card-body">
          <h1>
            {title}
          </h1>
          <p className="card-subtitle">
            {title}
          </p>
          <div className="card-author">
            <div className="author-info">
              <p className="author-name">{source}</p>
              <p className="post-timestamp">{country}</p>
            </div>
          </div>
          <div>
            <a href={url}>Read More</a>
          </div>
        </div>
      </div>
  )
}
