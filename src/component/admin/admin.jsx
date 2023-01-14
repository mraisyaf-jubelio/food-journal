import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table, Button, Card } from "react-bootstrap";
import { allUser } from "../api";
import ReactPaginate from "react-paginate";
import poto from "../assets/img/potoDefault.png";
import "./admin.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { getFood } from "../api";
import "../component.css";

const Admin = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [users, setUsers] = useState([]);
  const [food, setFood] = useState([]);
  const perPage = 10;
  const pageVisit = pageNumber * perPage;
  const local = localStorage.getItem("myObject");
  const obj = JSON.parse(local);
  let sesi = {};
  for (const i in obj) {
    sesi = obj[i];
  }

  const displayUsers = users.slice(pageVisit, pageVisit + perPage).map((user, i) => {
    return (
      <tr key={i}>
        <td>
          <img src={user.profilePictureUrl ? user.profilePictureUrl : poto} alt={user.name} className="img-fluid img-orang" />
        </td>
        <td>{user.name}</td>
        <td>{user.phoneNumber}</td>
        <td>{user.role}</td>
        <td>
          <Link to={`users/${user.id}`} className="text-decoration-none">
            <Button variant="outline-light" className="back-color">
              Detail
            </Button>{" "}
          </Link>
        </td>
      </tr>
    );
  });

  const pageCount = Math.ceil(users.length / perPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

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
    allUser().then((respon) => setUsers(respon));
    getFood().then((result) => setFood(result));
  }, []);
  return (
    <>
      <Container className="mb-5">
        <h1>Data User</h1>
        <Row>
          <Col lg={12}>
            <Table striped borderless responsive="sm" className="text-center">
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {displayUsers}
                <tr>
                  <td colSpan={5}>
                    <nav aria-label="Page navigation example" className="d-flex justify-content-center">
                      <ReactPaginate
                        previousLabel={"<"}
                        nextLabel={">"}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"pagination"}
                        previousLinkClassName={"page-link"}
                        nextLinkClassName={"page-link"}
                        disabledClassName={"paginationDisabled"}
                        activeClassName={"paginationActive"}
                        pageLinkClassName={"page-link"}
                      />
                    </nav>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
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
                    <div className="d-flex justify-content-center mt-2 mb-2">
                      <div className="like" onClick={() => liked(e.id, e.isLike)}>
                        <FontAwesomeIcon icon={faHeart} className={e.isLike === true ? "text-danger" : "text-white"} />
                        <span className="ms-2 ">{e.totalLikes}</span>
                      </div>
                      <div className="rate p-1">
                        <FontAwesomeIcon icon={faStar} className="text-warning" />
                        <FontAwesomeIcon icon={faStar} className="text-warning" />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                      </div>
                    </div>
                    <Link to={`detailFoodAdmin/${e.id}`}>
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
      </Container>
    </>
  );
};

export default Admin;
