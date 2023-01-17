import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import { createRate } from "./api";

function Rate(props) {
  const [review, setReview] = useState();
  const [rating, setRating] = useState();
  const ratingChanged = (newRating) => {
    setRating(newRating);
  };
  const submit = () => {
    createRate(props.idFood, review, rating).then(() => window.location.reload(false));
  };
  return (
    <div>
      <ReactStars
        count={5}
        onChange={ratingChanged}
        size={24}
        isHalf={true}
        emptyIcon={<i className="far fa-star"></i>}
        halfIcon={<i className="fa fa-star-half-alt"></i>}
        fullIcon={<i className="fa fa-star "></i>}
        activeColor="#ffd700"
      />
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} onChange={(e) => setReview(e.target.value)} />
      </Form.Group>
      <Button type="submit" onClick={submit}>
        Submit
      </Button>{" "}
    </div>
  );
}

export default Rate;
