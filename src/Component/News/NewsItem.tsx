import React from "react";

import {
  CardContainer,
  CardImage,
  CardBody,
  CardAuthor,
} from "./newsitem.style";

interface Data {
  title: string;
  source: string;
  country: string;
  url: string;
}

const NewsItem: React.FC<{ data: Data }> = ({ data }) => {
  return (
    <>
      <CardContainer>
        {/* <CardImage>
          <img src={image} alt="newsImage" />
        </CardImage> */}
        <CardBody>
          <h1>{data.title}</h1>
          {/* <p className="card-subtitle">{data.title}</p> */}
          <CardAuthor>
            <div className="author-info">
              <p className="author-name">{data.source}</p>
              <p className="post-timestamp">{data.country}</p>
            </div>
          </CardAuthor>
          <div>
            <a href={data.url}>Read More</a>
          </div>
        </CardBody>
      </CardContainer>
    </>
  );
};

export { NewsItem };
