import React, { useEffect, useState,useRef } from "react";
import NavigationBar from "../../components/NavigationBar";
import Footer from "../../components/Footer";
import "./donate.css";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Form from "react-bootstrap/Form";
import InputGroup from 'react-bootstrap/InputGroup';
import {useNavigate} from 'react-router-dom'
import api from '../../api/data'
import { useTranslation} from 'react-i18next';
import emailjs from '@emailjs/browser';



function Donate() {


  const [radioValue, setRadioValue] = useState("1");
  const { t } = useTranslation();

  const radios = [
    { name: "Give Monthly", value: "1" },
    { name: "Give Once", value: "2" },
  ];
  
  const [selectedRadio, setSelectedRadio] = useState()
  const [amount, setAmount]= useState()
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



  const getRadioValue = () => {
    if (radioValue === '1')
    setSelectedRadio('Monthly')
    else
    setSelectedRadio('Once')
  }

  useEffect(() => {
    getRadioValue()
  })

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

  const navigate = useNavigate()
  const donate = useRef()

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      api.post('/donators', {
        name: form.name,
        surname: form.surname,
        mail: form.mail,
        number: form.number,
        address: form.address,
        donationType: selectedRadio,
        donationAmount: amount
      })
      .then(res => {
        console.log(res.data);
      })
      emailjs.sendForm('service_di4caar', 'template_s7wrlnf', donate.current, 'vfIYz4eqhWMQv2r60')
      navigate('/donate/payment')
    }
  };
  return (
    <div className="Donate">
      <NavigationBar />
      <div className="options-side">
          <h1>{t("You are about to change a child's life!")}</h1>
        </div>

      <div className="info-side">
      <div className="toolbar">
        <InputGroup>
          <InputGroup.Text id="btnGroupAddon">$</InputGroup.Text>
          <Form.Control
            id="option-4"
            type="tel"
            value={amount}
            placeholder={t("Amount of money")}
            onChange={(e) => setAmount(e.target.value)}
          />
        </InputGroup>
        </div>
        <div className="info-container">
          <h3>{t("Your Info")}</h3>
          <Form ref={donate}>
            <div className="row">
              <Form.Group className="col" controlId="name">
                <Form.Label>{t("Name")}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t("Your name")}
                  value={form.name}
                  name="donate_name"
                  onChange={(e) => setField("name", e.target.value)}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="col" controlId="surname">
                <Form.Label>{t("Surname")}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t("Your surname")}
                  value={form.surname}
                  name="donate_surname"
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
                <Form.Label>{t("Email address")}</Form.Label>
                <Form.Control
                  type="email"
                  placeholder={t("Enter email")}
                  name="donate_mail"
                  value={form.mail}
                  onChange={(e) => setField("mail", e.target.value)}
                  isInvalid={!!errors.mail}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.mail}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="col" controlId="number">
                <Form.Label>{t("Phone Number")}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t("Phone number here")}
                  value={form.number}
                  name="donate_number"
                  onChange={(e) => setField("number", e.target.value)}
                  isInvalid={!!errors.number}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.number}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <Form.Group className="mb-3" controlId="address">
              <Form.Label>{t("Address")}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t("Your address here")}
                value={form.address}
                name="donate_address"
                onChange={(e) => setField("address", e.target.value)}
                isInvalid={!!errors.address}
              />
              <Form.Control.Feedback type="invalid">
                {errors.address}
              </Form.Control.Feedback>
            </Form.Group>
            <Button onClick={handleSubmit} type="submit" variant="primary">{t("Go to Payment")}</Button>
          </Form>
        </div>
        <div className="donation-container">
          <p>{t("Please select a donate type")}</p>
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
