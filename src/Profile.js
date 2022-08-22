import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import { Button, Form, Row, Col } from "react-bootstrap";
import "./App.css";
const App = () => {
  const [data, setdata] = useState([]);
  const [value, setValue] = useState("");
  const [Sortvalue, setSortValue] = useState("");

  useEffect(() => {
    loadUserData();
  }, []);
  const loadUserData = async () => {
    return await axios
      .get("http://localhost:5000/users")
      .then((res) => setdata(res.data))
      .catch((err) => console.log(err));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    return await axios
      .get(`http://localhost:5000/users?q=${value}`)
      .then((res) => {
        setdata(res.data);
        setValue("");
      })
      .catch((err) => console.log(err));
  };
  const handleReset = () => {
    loadUserData();
  };
  const handleSort = async (e) => {
    let value = e.target.value;
    setSortValue(value);
    return await axios
      .get(`http://localhost:5000/users?_sort=${value}&_order=asc`)
      .then((res) => {
        setdata(res.data);
        // setValue("");
      })
      .catch((err) => console.log(err));
  };
  const SortData = ["name", "email", "address", "status", "phone"];
  const handleFilter = async (value) => {
    return await axios
      .get(`http://localhost:5000/users?status=${value}`)
      .then((res) => {
        setdata(res.data);
        // setValue("");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="App">
      <Form onSubmit={handleSubmit}>
        <div className="formDiv">
          <Form.Control
            type="search"
            placeholder="Search Here"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button type="submit" variant="success">
            Search
          </Button>
          <Button
            type="button"
            onClick={(e) => handleReset(e)}
            variant="outline-info"
          >
            Reset
          </Button>
        </div>
      </Form>
      <div className="tablediv">
        <h1>Show-Table-Data</h1>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Index</th>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Status</th>
            </tr>
          </thead>
          {data.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={7}>Data Not Found </td>
              </tr>
            </tbody>
          ) : (
            data.map((item, index) => (
              <tbody key={index}>
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.address}</td>
                  <td>{item.phone}</td>
                  <td>{item.status}</td>
                </tr>
              </tbody>
            ))
          )}
        </Table>
      </div>
      <Row>
        <Col size={8}>
          <h5>Sort By :</h5>
          <select
            style={{
              width: "50%",
              borderRadius: "5px ",
              border: "3px solid #7ca6bf",
              height: "35px",
            }}
            value={Sortvalue}
            onChange={(e) => handleSort(e)}
          >
            <option>Please Select Value</option>
            {SortData.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
        </Col>
        <Col size={4}>
          {" "}
          <h5>Filter By Status :</h5>
          <Button
            onClick={() => handleFilter("Active")}
            variant="outline-warning"
          >
            Active
          </Button>
          <Button
            onClick={() => handleFilter("Inactive")}
            style={{ marginLeft: "2px" }}
            variant="outline-danger"
          >
            Inactive
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default App;
