import React from "react";
import "./style.css";

const Image= ({
  src,
  alt = "",
  style = {},
  className = "",
  ...props
}) => {
  return (
    <img src={src} alt={alt} style={style} className={className} {...props} />
  );
}

const Card = ({ imageURL, isFlipped, onClick }) => {
  return (
    <div className="card-container" onClick={onClick}>
      <div className={"card" + (isFlipped ? " is-flipped" : "")}>
        <div className="side front">
          <Image src={`${process.env.PUBLIC_URL}${imageURL}`} alt={imageURL} />
        </div>
        <div className="side back"></div>
      </div>
    </div>
  );
};

export default Card;