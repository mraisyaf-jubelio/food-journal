import React from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { getFood } from "./api";
import { useState, useEffect } from "react";
import page1 from "./assets/img/page1.png";
import health from "./assets/img/health.jpg";
import veg from "./assets/img/veg.jpg";
import cpt from "./assets/img/cpt.jpg";
import "./component.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import bg from "./assets/img/bg2.png";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import RatingView from "./rating";
import { sesi } from "./api";

const Dashboard = () => {
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
      <section className="font">
        <Container fluid>
          <Row className="align-items-center box">
            <Col md={6} sm={8} xs={11} className="ord-1">
              <div className="p-3">
                <h1 className="font-capitalize text-head fw-bold">Mangan heula atuh</h1>
                <p className="text-white">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. In est non quasi esse perspiciatis. Accusantium modi
                  dolore quasi eum impedit?
                </p>
                <a href="#food">
                  <div className="btn text-white" style={{ backgroundColor: "#FF00C7" }}>
                    See Foods
                  </div>
                </a>
              </div>
            </Col>
            <Col md={5} lg={5} xs={8}>
              <div className="text-center">
                <img src={page1} alt="gambar pendukung" className="img-fluid" />
              </div>
            </Col>
          </Row>

          <h3 className="fw-bold text-center fs-2 fw-bold mt-4 color" id="food">
            List Food
          </h3>
          <Row className="gap-5 mt-5 justify-content-center p-3">
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
                      <div className="d-flex justify-content-center">
                        <div className="like" onClick={() => liked(e.id, e.isLike)}>
                          <FontAwesomeIcon icon={faHeart} className={e.isLike === true ? "text-danger" : "text-white"} />
                          <span className="ms-2">{e.totalLikes}</span>
                        </div>
                        <div className="rate">
                          <RatingView rate={e.rating} size={23} />
                        </div>
                      </div>
                      <Link to={`detail/${e.id}`}>
                        <Button variant="outline-light" className="back-color mt-2">
                          Detail
                        </Button>{" "}
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
          <hr />

          <Row className="justify-content-center align-items-center mb-4 mt-4 ">
            <h2 className="text-center color fs-2 fw-bold">About</h2>
            <Col sm={10} lg={5} md={6} className="digital ord2 ">
              <h2 className="fw-bold">Food Journal Digital</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia officiis minima repellat dolore neque in
                quisquam fuga nesciunt ut alias vero, quis illo molestiae animi reprehenderit dolorem omnis architecto
                laudantium.
              </p>
            </Col>
            <Col md={5} className="vektor2">
              <img src={bg} className="img-fluid" alt="" />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Dashboard;
