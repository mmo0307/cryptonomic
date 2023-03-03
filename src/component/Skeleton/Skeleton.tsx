import React from "react";

import "./skeleton.css";

const Skeleton: React.FC = () => {
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
  );
};

export { Skeleton };
