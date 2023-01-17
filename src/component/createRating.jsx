import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import { createRate } from "./api";

function Rate(props) {
  const [review, setReview] = useState();
  const [rating, setRating] = useState();
  const ratingChanged = (newRating) => {
    setRating(newRating);
    console.log(newRating);
  };
  const submit = () => {
    createRate(props.idFood, review, rating).then(() => window.location.reload(false));
  };
  return (
    <div className="d-flex flex-column align-items-center">
      <ReactStars
        count={5}
        onChange={ratingChanged}
        size={29}
        isHalf={true}
        emptyIcon={<i className="far fa-star"></i>}
        halfIcon={<i className="fa fa-star-half-alt"></i>}
        fullIcon={<i className="fa fa-star "></i>}
        activeColor="#ffd700"
      />
      <Form.Group className="mb-3 w-100" controlId="exampleForm.ControlTextarea1">
        <Form.Label className="text-center w-100 h5">Description</Form.Label>
        <Form.Control as="textarea" rows={3} onChange={(e) => setReview(e.target.value)} />
      </Form.Group>
      <Button type="submit" className="w-100" onClick={submit}>
        Submit
      </Button>{" "}
    </div>
  );
}

export default Rate;
