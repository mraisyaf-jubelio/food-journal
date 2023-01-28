import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { allUser } from "../api";
import ReactPaginate from "react-paginate";
import poto from "../assets/img/potoDefault.png";
import "./admin.css";
import { roleData } from "../datas";
import ReactSelect from "react-select";
import { updateRole } from "../api";

const DatasUser = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [users, setUsers] = useState([]);
  const perPage = 10;
  const pageVisit = pageNumber * perPage;

  const displayUsers = users.slice(pageVisit, pageVisit + perPage).map((user, i) => {
    const defRole = {
      value: user.role,
      label: user.role,
    };
    const upRole = (el) => {
      updateRole(el, user.id).then((respon) => {
        alert(respon.data.message);
        window.location.reload(false);
      });
    };
    return (
      <tr key={i}>
        <td>
          <img src={user.profilePictureUrl ? user.profilePictureUrl : poto} alt={user.name} className="img-fluid img-orang" />
        </td>
        <td>{user.name}</td>
        <td>{user.phoneNumber}</td>
        <td>{user.role}</td>
        <td>
          <ReactSelect
            className="basic-single"
            classNamePrefix="select"
            defaultValue={defRole}
            name="color"
            options={roleData}
            onChange={(e) => upRole(e.value)}
          />
        </td>
      </tr>
    );
  });

  const pageCount = Math.ceil(users.length / perPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    allUser().then((respon) => setUsers(respon));
  }, []);
  return (
    <>
      <Container className="mb-5 font">
        <h1 className="fw-bolder color text-center">Data User</h1>
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
      </Container>
    </>
  );
};

export default DatasUser;
