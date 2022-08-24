import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./join.css";
import NavigationBar from '../../components/NavigationBar'
import Footer from '../../components/Footer'

function Join() {
  return (
    <div className="Join">
      <NavigationBar />
      <img src={require("../../images/volunteer.jpg")} alt="bg" />
      <div className="form-container">
        <h1>Registration Form</h1>
        <p>
          Be a part of to create immense opportunity for the youth to do
          something for the country{" "}
        </p>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Your name here" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Surname</Form.Label>
            <Form.Control type="text" placeholder="Your surname here" />
          </Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Group className="mb-3">
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="Your address here" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Why do you wanna be part of us?</Form.Label>
            <Form.Control type="text" placeholder="Explain your reasons" />
          </Form.Group>
          <Form.Group>
            <Form.Select>
              <option>Which division you wanna be part of?</option>
              <option value="1">Teacher</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </Form.Group>
        </Form>
        <Button variant="primary">Submit</Button>

      </div>
      <Footer />
    </div>
  );
}

export default Join;
