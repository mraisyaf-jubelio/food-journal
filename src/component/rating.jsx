import React from "react";
import "./rating.css";
import ReactStars from "react-rating-stars-component";
const RatingView = (props) => {
  const star = props.rate;
  return (
    <div className="ms-2">
      <ReactStars name="rating" value={star} size={19} isHalf={true} edit={false} classNames="text-warning" />
    </div>
  );
};
export default RatingView;
