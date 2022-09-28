import React, { useEffect, useState, useRef } from "react";
import NavigationBar from "../../components/NavigationBar";
import Footer from "../../components/Footer";
import "./donate.css";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import api from "../../api/data";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import Modal from 'react-bootstrap/Modal';

function Donate() {
  const [radioValue, setRadioValue] = useState("1");
  const { t } = useTranslation();

  const radios = [
    { name: "Give Monthly", value: "1" },
    { name: "Give Once", value: "2" },
  ];

  const [selectedRadio, setSelectedRadio] = useState();
  const [amount, setAmount] = useState();
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

  var today = new Date(),
    date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

  const getRadioValue = () => {
    if (radioValue === "1") setSelectedRadio("Monthly");
    else setSelectedRadio("Once");
  };

  useEffect(() => {
    getRadioValue();
  });

  const textReg = new RegExp(/[a-zA-ZğüşöçıİĞÜŞÖÇ]/);
  const numReg = new RegExp(/[0-9]/);
  const mailReg = new RegExp(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
  const addressReg = new RegExp(/^[a-zA-ZğüşöçıİĞÜŞÖÇ0-9\s,.'-]{3,}$/);

  const validateForm = () => {
    const { address, mail, name, number, surname } = form;
    const newErrors = {};
    if (!address || address === "")
      newErrors.address = "Please enter your address ";
    if (!addressReg.test(address))
      newErrors.address = "Please enter a valid address";
    if (!mail || mail === "") newErrors.mail = "Please enter your mail";
    if (!mailReg.test(mail)) newErrors.mail = "Please enter a valid mail";
    if (!name || name === "") newErrors.name = "Please enter your name";
    if (!textReg.test(name)) newErrors.name = "Please enter a valid name";
    if (!surname || surname === "")
      newErrors.surname = "Please enter your surname";
    if (!textReg.test(surname))
      newErrors.surname = "Please enter a valid surname";
    if (!number || number === "")
      newErrors.number = "Please enter your phone number";
    if (!numReg.test(number))
      newErrors.number = "Please enter numbers only remove any text";

    return newErrors;
  };

  const [creditNumber, setCreditNumber] = useState("");

  const [creditName, setCreditName] = useState("");

  const [expiry, setExpiry] = useState("");

  const [cvc, setCvc] = useState("");

  const [focus, setFocus] = useState("");

  const validatePayment = () => {
    const numReg = new RegExp(/[0-9]/);
    const creditReg = new RegExp(
      /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/
    );
    const expReg = new RegExp(/^(0[1-9]|1[0-2])\/?([0-9]{2})/);
    if (!creditName || creditName === "")   return false;
    if (!textReg.test(creditName)){ 
      console.log("Credit name wrong");
      return false;
    }
    if (!creditNumber || creditNumber === "") return false;
    if (!creditReg.test(creditNumber)) return false;
    if (!expiry || expiry === "") return false;
    if (!expReg.test(expiry)) return false;
    if (!cvc || cvc === "") return false;
    if (!numReg.test(cvc)) return false;
    else return true;
  };

  const amountValidation = () => {
    if (!amount || amount === "") return true;
    if (!numReg.test(amount)) return true;
  };

  const donate = useRef();

  const [show, setShow] = useState(false);
  const [payShow, setPayShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlePayClose = () => setPayShow(false)
  const handlePayShow = () => setPayShow(true)

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      if (validatePayment() === false) {
    
      handleShow()      
    } 
      else {
        api
          .post("/donators", {
            name: form.name,
            surname: form.surname,
            mail: form.mail,
            number: form.number,
            address: form.address,
            donationType: selectedRadio,
            donationAmount: amount,
            donateDate: date,
          })
          .then((res) => {
            console.log(res.data);
          });
        emailjs.sendForm(
          "service_di4caar",
          "template_s7wrlnf",
          donate.current,
          "vfIYz4eqhWMQv2r60"
        );

        handlePayShow()
      }
    }
  };
  return (
    <div className="Donate">
      <NavigationBar />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Invalid Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>Check your Payment inputs something is wrong!</Modal.Body>
      </Modal>
      <Modal show={payShow} onHide={handlePayClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thanks for your donation</Modal.Title>
        </Modal.Header>
        <Modal.Body>You will receive a mail about your donation</Modal.Body>
      </Modal>
      <div className="info-side">
        <div className="info-container">
          <h3>{t("Your Info")}</h3>
          <div className="toolbar">
            <InputGroup>
              <InputGroup.Text id="btnGroupAddon">$</InputGroup.Text>
              <Form.Control
                id="option-4"
                type="tel"
                value={amount}
                placeholder={t("Amount of money")}
                onChange={(e) => setAmount(e.target.value)}
                isInvalid={!!amountValidation()}
              />
            </InputGroup>
            <div className="donation-container">
          <p>{t("Please select a donate type")}</p>
          <ButtonGroup>
            {radios.map((radio, x) => (
              <ToggleButton
                key={x}
                id={`radio-${x}`}
                type="radio"
                variant={x % 2 ? "outline-success" : "outline-success"}
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
          </Form>
        </div>
  
        <div className="payment-container">
          
          <h3>{t('Credit Card Info')}</h3>
          <Cards
            number={creditNumber}
            name={creditName}
            expiry={expiry}
            cvc={cvc}
            focused={focus}
          />
          <form>
            <input
              type="tel"
              name="number"
              maxLength={16}
              placeholder={t("Card Number")}
              value={creditNumber}
              onChange={(e) => setCreditNumber(e.target.value)}
              onFocus={(e) => setFocus(e.target.name)}
            />
            <input
              type="text"
              name="name"
              placeholder={t("Full Name")}
              value={creditName}
              onChange={(e) => setCreditName(e.target.value)}
              onFocus={(e) => setFocus(e.target.name)}
            />
            <input
              type="tel"
              name="expiry"
              maxLength={5}
              placeholder={t("MM/YY")}
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              onFocus={(e) => setFocus(e.target.name)}
            />
            <input
              type="tel"
              name="cvc"
              maxLength={3}
              placeholder="CVC"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              onFocus={(e) => setFocus(e.target.name)}
            />
          </form>
          
        </div>
        
        <Button
          className="submit-btn"
          onClick={handleSubmit}
          type="submit"
          variant="success"
        >
          {t("Pay")}
        </Button>
      </div>

      <Footer />
    </div>
  );
}

export default Donate;
