import React from "react";

function Card(props) {
  return (
    <div className="card">
      <img src={props.img} alt="unsplash_image" />
    </div>
  );
}

export default Card;
