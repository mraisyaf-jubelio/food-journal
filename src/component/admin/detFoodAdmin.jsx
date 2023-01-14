import React, { useEffect, useState } from "react";
import "../component.css";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { getRating, hapus } from "../api";
import { options } from "./ingredients";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { uploadImage } from "../api";
import { detailFood } from "../api";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { sesi } from "../api";

function DetFoodAdmin() {
  const [detFood, setDetFood] = useState([]);
  const [ratingFood, setRatingFood] = useState([]);
  const [show, setShow] = useState(false);
  let { id } = useParams();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const inggredients = detFood.ingredients == undefined ? [] : detFood.ingredients
  const ingreDef = inggredients.map(e => {
    return {
      label: e,
      value: e
    }
  })

  const {
    register,
    handleSubmit,
    control,
  } = useForm();

  const onSubmit = async (data) => {
    let respon = data.defImg;
    const bahan = [];
    const ingre = data.bahan;
    console.log(ingre)
    ingre.map((e) => {
      bahan.push(e.value);
    });
    const imgFood = data.poto[0];
    if (data.poto) {
      try {
        respon = await uploadImage(imgFood)
      } catch (eror) {
        alert(eror.response.data.errors)
      }
    }
    axios.post(`${process.env.REACT_APP_BASEURL}/api/v1/update-food/${id}`,
      {
        name: data.name,
        description: data.desc,
        imageUrl: respon,
        ingredients: bahan,
      },
      {
        headers: {
          apiKey: process.env.REACT_APP_APIKEY,
          "Authorization": `Bearer ${sesi.token}`
        }
      }).then(respon => {
        alert(respon.data.message)
        // window.location.reload(false)
      }).catch(err => {
        let data = err.response.data.errors
        data.map((e) => alert(e.message))
      })
  };

  const hndleHps = (id) => {
    if (window.confirm("Are you sure delete food?")) {
      hapus(id).then(() => {
        window.location.assign("/admin");
      });
    }

  };

  useEffect(() => {
    detailFood(id).then((result) => {
      setDetFood(result);
    });
    getRating(id).then((respon) => setRatingFood(respon));
  }, []);

  return (
    <section className="font detail p-4">
      <Container fluid>
        <Row className="justify-content-center">
          <Col md={5} sm={6} xs={6} className="detail-img p-4 d-flex align-items-center justify-content-center rounded-start">
            <div className="text-center img-detail position-relative">
              <Button variant="dark" className="tombol-back">
                <Link to="/admin">Back</Link>
              </Button>
              <img src={detFood.imageUrl} className="img-fluid rounded-4 rotate-6" alt={detFood.name} />
            </div>
          </Col>
          <Col md={5} sm={6} xs={6} className="p-4 rounded-end bg-white">
            <div>
              <h2 className="fw-bold fs-1">{detFood.name}</h2>
              <div className="d-flex align-items-center">
                <p className="">
                  Likes <FontAwesomeIcon icon={faHeart} className="text-danger me-1" />
                  {detFood.totalLikes}
                </p>
                <p className="ms-1 me-1">|</p>
                <p>rating</p>
                <img
                  src="https://assets.tokopedia.net/assets-tokopedia-lite/v2/zeus/kratos/abeeb1e0.svg"
                  className="ms-2 mb-4 me-1 img-fluid"
                  alt=""
                />
                <p>5</p>
              </div>
              <h5 className="fw-semibold">Description : </h5>
              <p>{detFood.description}</p>
              <div>
                <h5>inggridient :</h5>
                <ul></ul>
              </div>

              <div className="d-flex ">

                <Button variant="outline-light" className="back-color" onClick={() => hndleHps(detFood.id)}>
                  Delete
                </Button>
                <Button variant="outline-light" className="back-color" onClick={handleShow}>
                  Edit
                </Button>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="bg-light p-2 justify-content-center">
          <h2 className="fw-bolder color text-center">Rating</h2>
          {ratingFood.map((e, i) => {
            return (
              <Col lg={4} key={i}>
                <div>
                  <img src={e.user.profilePictureUrl} className="img-fluid img-rating rounded-circle me-2" />
                  <span>{e.user.name}</span>
                </div>
                <div>
                  <FontAwesomeIcon icon={faStar} className="text-warning fs-6 me-2" />
                  <span className="fs-6"></span>
                </div>
                <div>
                  <p>{e.review}</p>
                </div>
                <hr />
              </Col>
            );
          })}
        </Row>
      </Container>
      {/* <Edit  makanan={detFood.name} desc={detFood.description}/> */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Food</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Name Food</Form.Label>
              <Form.Control type="text" {...register("name")} defaultValue={detFood.name} />
              {/* <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text> */}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" {...register("desc")} rows={3} defaultValue={detFood.description} />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-4">
              <Form.Label>Poto</Form.Label>
              <Form.Control {...register("poto")} type="file" name="poto" />
            </Form.Group>

            <Form.Group>
              <Controller
                name="bahan"
                control={control}
                defaultValue={ingreDef}
                render={({ field, onChange }) => (
                  <Select
                    isMulti
                    options={options}
                    defaultValue={ingreDef}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    value={field.value || ingreDef}
                    onChange={(e) => {


                      field.onChange(e)
                    }}
                  />
                )}
              />
            </Form.Group>
            <div className="d-flex justify-content-around ">
              <Button variant="outline-light" className="back-color" type="submit">
                Submit
              </Button>
              <Button variant="outline-light" className="back-color" type="reset">
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </section>
  );
}
export default DetFoodAdmin;
