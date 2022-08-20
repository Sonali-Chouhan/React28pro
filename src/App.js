import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import { Button,InputGroup,Form } from 'react-bootstrap';
import "./App.css";
const App = () => {
  const [data, setdata] = useState([]);
  const [value, setValue] = useState("");
  useEffect(() => {
    loadUserData();
  }, []);
  const loadUserData = async () => {
    return await axios
      .get("http://localhost:5000/users")
      .then((res) => setdata(res.data))
      .catch((err) => console.log(err));
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    return await axios
    .get(`http://localhost:5000/users?q=${value}`)
    .then((res) =>{ setdata(res.data) ;setValue("")})
    .catch((err) => console.log(err));
  };
  const handleReset=()=>{

  }
  return (
    <div className="App">
      <Form onSubmit={handleSubmit}>
        <div className="formDiv">
        <Form.Control
        type="type"
        placeholder="Search Here"
        value={value} onChange={(e) => setValue(e.target.value)}
      />
        <Button type="submit">Search</Button>
        <Button type="button" onClick={(e)=>handleReset(e)}>Reset</Button>
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
              <tr >
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
    </div>
  );
};

export default App;
