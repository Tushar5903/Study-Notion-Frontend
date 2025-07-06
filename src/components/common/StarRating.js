import React, { useState } from "react";
import "./css/StarRating.css";

const StarRating = ({ count = 5, size = 40, rating, setRating }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="custom-star-rating">
      {Array.from({ length: count }, (_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={index}
            className={`star ${starValue <= (hover || rating) ? "filled" : ""}`}
            onClick={() => setRating(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
            style={{ fontSize: `${size}px` }}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
