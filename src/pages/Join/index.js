import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./join.css";
import NavigationBar from "../../components/NavigationBar";
import Footer from "../../components/Footer";
import Modal from "react-bootstrap/Modal";
import emailjs from "@emailjs/browser";
import api from "../../api/data";
import { useTranslation } from "react-i18next";
import { v4 as uuid } from "uuid";

function Join() {
  const [show, setShow] = useState(false);
  const { t } = useTranslation();
  const join = useRef();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  var today = new Date(),
    date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

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
    const { address, dob, gender, mail, name, number, job, surname } = form;
    const textReg = new RegExp(/^([a-zA-ZğüşöçıİĞÜŞÖÇ]){2,30}$/);
    const numReg = new RegExp(/[0-9]/);
    const mailReg = new RegExp(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );
    const addressReg = new RegExp(/^[a-zA-ZğüşöçıİĞÜŞÖÇ0-9\s,.'-]{3,}$/)
    const newErrors = {};

    if (!dob || dob === "") newErrors.dob = "Please enter your date of birth";

    if (!gender || gender === "Select Gender")
      newErrors.gender = "Please select a gender";

    if (!address || address === "")
      newErrors.address = "Please enter your address";
      if (!addressReg.test(address)) newErrors.address = "Please enter a valid address";

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

    if (!job || job === "Select a Job Type")
      newErrors.reason = "Please select a job";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      emailjs.sendForm(
        "service_di4caar",
        "template_e2zn009",
        join.current,
        "vfIYz4eqhWMQv2r60"
      );
      api
        .post("/pending", {
          id: uuid(),
          name: form.name,
          surname: form.surname,
          dob: form.dob,
          mail: form.mail,
          number: form.number,
          address: form.address,
          job: form.job,
          gender: form.gender,
          registerdate: date
        })
        .then((res) => {
          console.log(res.data);
        });
      handleShow();
    }
  };

  return (
    <div className="Join">
      <NavigationBar />
      <img
        className="bg"
        src={require("../../images/volunteer.jpg")}
        alt="bg"
      />

      <div className="join-container">
        <h1>{t("Join Us")}</h1>
        <p>
          {t(
            "Thanks for deciding to join us! Help us to grow our team and lets provide quality education to every children we can reach."
          )}
        </p>
      </div>
      <div className="form-container">
        <h3>{t("Registration")}</h3>
        <Form ref={join}>
          <div className="row">
            <Form.Group className="col" controlId="name">
              <Form.Label>{t("Name")}</Form.Label>
              <Form.Control
                type="text"
                name="join_name"
                placeholder={t("Your name here")}
                value={form.name}
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
                placeholder={t("Your surname here")}
                name="join_surname"
                value={form.surname}
                onChange={(e) => setField("surname", e.target.value)}
                isInvalid={!!errors.surname}
              />
              <Form.Control.Feedback type="invalid">
                {errors.surname}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="col" controlId="dob">
              <Form.Label>{t("Date of Birth")}</Form.Label>
              <Form.Control
                type="date"
                name="join_dob"
                max="2005-01-01"
                placeholder={t("Enter the date of birth")}
                value={form.dob}
                onChange={(e) => setField("dob", e.target.value)}
                isInvalid={!!errors.dob}
              />
            </Form.Group>
            <Form.Control.Feedback type="invalid">
              {errors.dob}
            </Form.Control.Feedback>
          </div>

          <div className="row">
            <Form.Group className="col" controlId="mail">
              <Form.Label>{t("Email address")}</Form.Label>
              <Form.Control
                type="email"
                name="join_mail"
                placeholder={t("Enter email")}
                maxLength={20}
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
                maxLength={11}
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
              onChange={(e) => setField("address", e.target.value)}
              isInvalid={!!errors.address}
            />
            <Form.Control.Feedback type="invalid">
              {errors.address}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="job">
            <Form.Label>{t("Job")}</Form.Label>
            <Form.Select
              value={form.job}
              isInvalid={!!errors.job}
              placeholder="Select a Job"
              onChange={(e) => {
                setField("job", e.target.value);
              }}
            >
              <option>{t("Select a Job Type")}</option>
              <option value="Educational">{t("Educational")}</option>
              <option value="Medical">{t("Medical")}</option>
              <option value="Social Work">{t("Social Work")}</option>
              <option value="Fundraiser">{t("Fundraiser")}</option>
              <option value="Other">{t("Other")}</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.job}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="gender">
            <Form.Label>{t("Gender")}</Form.Label>
            <Form.Select
              value={form.gender}
              isInvalid={!!errors.gender}
              placeholder="Select Gender"
              onChange={(e) => {
                setField("gender", e.target.value);
              }}
            >
              <option>{t("Select Gender")}</option>
              <option value="M">{t("Male")}</option>
              <option value="F">{t("Female")}</option>
              <option value="U">{t("Prefer not to say")}</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.gender}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" size="lg" onClick={handleSubmit}>
            {t("Register")}
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Thanks for registering</Modal.Title>
            </Modal.Header>
            <Modal.Body>We will contact you as soon as possible!</Modal.Body>
          </Modal>
        </Form>
      </div>
      <Footer />
    </div>
  );
}

export default Join;
