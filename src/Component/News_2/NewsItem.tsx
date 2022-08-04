import React from "react";

import {
  CardContainer,
  CardImage,
  CardBody,
  CardAuthor,
} from "./newsitem.style";

interface Tags {
  icon: string;
  [key: string]: any;
  tags: Array<object>;
}

interface Data {
  title: string;
  source: string;
  description: string;
  link: string;
  date: string;
  tags: Tags;
}

const NewsItem: React.FC<{ data: Data }> = ({ data }) => {
  return (
    <>
      <CardContainer>
        {/* <CardImage>
          <img src={data.tags[0].icon} alt="newsImage" />
        </CardImage> */}
        <CardBody>
          <h1>{data.title}</h1>

          <p className="card-subtitle">{data.description}</p>
          <CardAuthor>
            <div className="author-info">
              <p className="author-name">{data.source}</p>
              <p className="post-timestamp">{data.date}</p>
              <img src={data.tags[0].icon} alt="newsImage" width={50}/>
            </div>
          </CardAuthor>
          <div style={{marginTop: '20px'}}>
            <a href={data.link}>Read More</a>
          </div>
        </CardBody>
      </CardContainer>
    </>
  );
};

export { NewsItem };
