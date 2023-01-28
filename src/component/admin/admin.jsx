import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button, Card } from "react-bootstrap";
import "./admin.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { getFood } from "../api";
import RatingView from "../rating";
import { sesi } from "../api";
import Footer from "../footer";

const Admin = () => {
  const [food, setFood] = useState([]);

  const liked = (id, like) => {
    let likeApi;
    if (!like) {
      likeApi = "like";
    } else {
      likeApi = "unlike";
    }
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/api/v1/${likeApi}`,
        {
          foodId: id,
        },
        {
          headers: {
            apiKey: process.env.REACT_APP_APIKEY,
            "Content-Type": "application/json",
            Authorization: `Bearer ${sesi.token}`,
          },
        }
      )
      .then(() => getFood().then((result) => setFood(result)));
  };

  useEffect(() => {
    getFood().then((result) => setFood(result));
  }, []);
  return (
    <>
      <Container className="font">
        <Row className="gap-5 justify-content-center p-3">
          <h1 className="fw-bolder color text-center">List Food</h1>
          {food.map((e, i) => {
            return (
              <Col key={i} lg={3} md={6} className="d-flex justify-content-center">
                <Card className="card-food d-flex justify-content-center align-items-center bg-page">
                  <div className="card-food-image">
                    <Card.Img variant="top" src={e.imageUrl} className="img-thumbnail" />
                  </div>
                  <Card.Body className="text-center ">
                    <Card.Title>
                      <h4 className="fw-bold">{e.name}</h4>
                    </Card.Title>
                    <Card.Text>{e.description}</Card.Text>
                    <div className="d-flex justify-content-center ">
                      <div className="like" onClick={() => liked(e.id, e.isLike)}>
                        <FontAwesomeIcon icon={faHeart} className={e.isLike === true ? "text-danger" : "text-light"} />
                        <span className="ms-2 ">{e.totalLikes}</span>
                      </div>
                      <div className="rate">
                        <RatingView rate={e.rating} size={24} />
                      </div>
                    </div>
                    <Link to={`detailFoodAdmin/${e.id}`}>
                      <Button variant="outline-light" className="back-color mt-2 tombol-detail">
                        Detail
                      </Button>{" "}
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Admin;
