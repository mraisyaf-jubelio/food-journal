import React from "react";
import ReactStars from "react-rating-stars-component";
const RatingView = (props) => {
  const star = props.rate;
  const sz = props.size;
  return <ReactStars name="rating" value={star} size={sz} isHalf={true} edit={false} classNames="text-warning" />;
};
export default RatingView;
