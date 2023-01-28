import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { getRating, hapus } from "../api";
import { options } from "../datas";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { uploadImage } from "../api";
import { detailFood } from "../api";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import RatingView from "../rating";
import axios from "axios";
import { sesi } from "../api";
import Footer from "../footer";
import Rate from "../createRating";

function DetFoodAdmin() {
  const [detFood, setDetFood] = useState([]);
  const [ratingFood, setRatingFood] = useState([]);
  const [show, setShow] = useState(false);
  let { id } = useParams();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [tampil, setTampil] = useState(false);
  const rate = () => setTampil(true);
  const close = () => setTampil(false);

  const inggredients = detFood.ingredients === undefined ? [] : detFood.ingredients;
  const ingreDef = inggredients.map((e) => {
    return {
      label: e,
      value: e,
    };
  });

  const { register, handleSubmit, control } = useForm();

  const onSubmit = async (data) => {
    let respon = data.defImg;
    const bahan = [];
    const ingre = data.bahan;
    const validate = ingre === undefined ? [] : ingre;
    validate.map((e) => {
      return bahan.push(e.value);
    });
    const imgFood = data.poto[0];
    if (data.poto) {
      try {
        respon = await uploadImage(imgFood);
      } catch (eror) {}
    }
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/api/v1/update-food/${id}`,
        {
          name: data.name,
          description: data.desc,
          imageUrl: respon,
          ingredients: bahan,
        },
        {
          headers: {
            apiKey: process.env.REACT_APP_APIKEY,
            Authorization: `Bearer ${sesi.token}`,
          },
        }
      )
      .then((respon) => {
        alert(respon.data.message);
        window.location.reload(false);
      })
      .catch((err) => {
        let data = err.response.data.errors;
        data.map((e) => alert(e.message));
      });
  };

  const hndleHps = (id) => {
    if (window.confirm(`are you sure delete ${detFood.name}`)) {
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
  }, [id]);

  return (
    <section className="font bg-light">
      <Container fluid className="p-3">
        <Row className="justify-content-center">
          <Col xl={4} md={6} sm={8} className="detail-img p-4 d-flex align-items-center justify-content-center rounded-start">
            <div className="text-center">
              <img src={detFood.imageUrl} className="img-fluid rounded-4 rotate-6" alt={detFood.name} />
            </div>
          </Col>
          <Col xl={4} md={6} xs={11} className="p-4 rounded-end bg-white">
            <div>
              <h2 className="fw-bold fs-1">{detFood.name}</h2>
              <div className="d-flex align-items-center gap-1">
                <p>
                  Likes <FontAwesomeIcon icon={faHeart} className="text-danger ms-1 me-1" />
                  {detFood.totalLikes}
                </p>
                <p>|</p>
                <p>
                  <FontAwesomeIcon icon={faStar} className="text-warning" />
                </p>
                <p>{detFood.rating}</p>
              </div>
              <h5>Description : </h5>
              <p>{detFood.description}</p>
              <div>
                <h5>ingredients:</h5>
                <ul>
                  {inggredients.map((e, i) => {
                    return <li key={i}>{e}</li>;
                  })}
                </ul>
              </div>
              <div className="d-flex mt-2 justify-content-around">
                <Button variant="outline-light" className="btn-danger" onClick={() => hndleHps(detFood.id)}>
                  Delete
                </Button>
                <Button variant="outline-light" className="back-color" onClick={handleShow}>
                  Edit
                </Button>
                <Button variant="outline-light" className="back-color" onClick={rate}>
                  Rate
                </Button>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="p-2 justify-content-center gap-3">
          <h2 className="fw-bolder text-center">Rating</h2>
          {ratingFood.map((e, i) => {
            return (
              <Col lg={3} md={6} sm={7} key={i} className="p-3 rounded-3 kolom-review">
                <div className="mb-1">
                  <img src={e.user.profilePictureUrl} alt={e.user.name} className="img-fluid img-rating rounded-circle me-2" />
                  <span>{e.user.name}</span>
                </div>
                <RatingView rate={e.rating} size={19} />
                <p className="mt-1">{e.review}</p>
                <hr />
              </Col>
            );
          })}
        </Row>
      </Container>

      <Footer />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Food</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Name Food</Form.Label>
              <Form.Control type="text" {...register("name")} defaultValue={detFood.name} />
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
              <Form.Label>Ingredients</Form.Label>
              <Controller
                name="bahan"
                control={control}
                render={({ field: { value, onChange } }) => {
                  if (!value) {
                    onChange(ingreDef);
                  }
                  return (
                    <Select
                      isMulti
                      options={options}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      value={value}
                      onChange={(e) => {
                        onChange(e);
                      }}
                    />
                  );
                }}
              />
            </Form.Group>
            <div className="d-flex justify-content-around mt-2">
              <Button variant="outline-light" className="back-color" type="submit">
                Submit
              </Button>
              <Button variant="outline-light" className="back-color" type="reset" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={tampil} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Rate Food</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Rate idFood={id} />
        </Modal.Body>
      </Modal>
    </section>
  );
}
export default DetFoodAdmin;
