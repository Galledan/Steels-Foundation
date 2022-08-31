import React, { useState } from "react";
import NavigationBar from "../../components/NavigationBar";
import Footer from "../../components/Footer";
import "./donate.css";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ToggleButton from "react-bootstrap/ToggleButton";
import Form from "react-bootstrap/Form";
import InputGroup from 'react-bootstrap/InputGroup';


function Donate() {

  const [radioValue, setRadioValue] = useState("1");
  const radios = [
    { name: "Give Monthly", value: "1" },
    { name: "Give Once", value: "2" },
  ];
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });

    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const validateForm = () => {
    const { address, mail, name, number, surname } = form;
    const newErrors = {};
    if (!address || address === "")
      newErrors.address = "Please enter your address ";
    if (!mail || mail === "") newErrors.mail = "Please enter your mail";
    if (!name || name === "") newErrors.name = "Please enter your name";
    if (!surname || surname === "")
      newErrors.surname = "Please enter your surname";
    if (!number || number === "")
      newErrors.number = "Please enter your phone number";

    return newErrors;
  };



  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
    }
  };
  return (
    <div className="Donate">
      <NavigationBar />
      <div className="options-side">
          <h1>You are about to change a child's life!</h1>
        </div>

      <div className="info-side">
      <div className="toolbar">
        <ButtonToolbar className="mb-3">
        <ButtonGroup size='lg' className="me-2">
          <Button id="option-1" variant="primary">15$</Button>
          <Button id="option-2" variant="primary">30$</Button>
          <Button id="option-3" variant="primary">45$</Button>
        </ButtonGroup>
        <InputGroup>
          <InputGroup.Text id="btnGroupAddon">$</InputGroup.Text>
          <Form.Control
            id="option-4"
            type="text"
            placeholder="Other amount"
          />
        </InputGroup>
      </ButtonToolbar>
        </div>
        <div className="info-container">
          <h3>Your Info</h3>
          <Form>
            <div className="row">
              <Form.Group className="col" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="col" controlId="surname">
                <Form.Label>Surname</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Your surname"
                  value={form.surname}
                  onChange={(e) => setField("surname", e.target.value)}
                  isInvalid={!!errors.surname}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.surname}
                </Form.Control.Feedback>
              </Form.Group>
            </div>

            <div className="row">
              <Form.Group className="col" controlId="mail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={form.mail}
                  onChange={(e) => setField("mail", e.target.value)}
                  isInvalid={!!errors.mail}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.mail}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="col" controlId="number">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Phone number here"
                  value={form.number}
                  onChange={(e) => setField("number", e.target.value)}
                  isInvalid={!!errors.number}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.number}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <Form.Group className="mb-3" controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your address here"
                value={form.address}
                onChange={(e) => setField("address", e.target.value)}
                isInvalid={!!errors.address}
              />
              <Form.Control.Feedback type="invalid">
                {errors.address}
              </Form.Control.Feedback>
            </Form.Group>
            <Button onClick={handleSubmit} type="submit" variant="primary">Go to Payment</Button>
          </Form>
        </div>
        <div className="donation-container">
          <p>Please select a donate type</p>
          <ButtonGroup>
            {radios.map((radio, x) => (
              <ToggleButton
                key={x}
                id={`radio-${x}`}
                type="radio"
                variant={x % 2 ? "outline-primary" : "outline-primary"}
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </div>
        
      </div>

      <Footer />
    </div>
  );
}

export default Donate;
