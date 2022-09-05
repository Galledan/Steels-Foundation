import React, {useRef, useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./join.css";
import NavigationBar from "../../components/NavigationBar";
import Footer from "../../components/Footer";
import Modal from "react-bootstrap/Modal"
import emailjs from '@emailjs/browser';
import api from '../../api/data'

function Join() {

  const [show, setShow] = useState(false);
  const join = useRef()
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const [form, setForm] = useState({})
    const [errors, setErrors] = useState({})
    const setField = (field, value) =>{
      setForm({
        ...form,
        [field]:value
      })

      if(!!errors[field])
      setErrors({
        ...errors,
        [field]:null
      })
    }
  
    const validateForm = () => {
      const {address, dob, gender, mail, name, number, reason, surname} = form
      const newErrors = {}
        if(!dob || dob === '') newErrors.dob = 'Please enter your date of birth'
        if(!gender || gender === 'Select Gender') newErrors.gender = 'Please select gender'
        if(!address || address === '') newErrors.address = 'Please enter your address '
        if(!mail || mail === '') newErrors.mail = 'Please enter your mail'
        if(!name|| name === '') newErrors.name = 'Please enter your name'
        if(!surname || surname === '') newErrors.surname = 'Please enter your surname'
        if(!number || number === '') newErrors.number = 'Please enter your phone number'
        if(!reason || reason === '') newErrors.reason = 'Please enter your reason'

        return newErrors

    }

    const handleSubmit = (e) =>{
      e.preventDefault()

      const formErrors = validateForm()
      if(Object.keys(formErrors).length > 0){
        setErrors(formErrors)
      }else{
        emailjs.sendForm('service_di4caar', 'template_e2zn009', join.current, 'vfIYz4eqhWMQv2r60')
        api.post('/volunteers', {
          name: form.name,
          surname: form.surname,
          mail: form.mail,
          number: form.number,
          address: form.address,
          reason: form.reason,
          gender: form.gender
        })
        .then(res => {
          console.log(res.data);
        })
        handleShow()
      }
    }

  return (
    <div className="Join">
      <NavigationBar />
      <img src={require("../../images/volunteer.jpg")} alt="bg" />

      <div className="join-container">
        <h1>Join Us</h1>
        <p>Thanks for deciding to join us! Help us to grow our team and lets provide quality education to every children we can reach.</p>
      </div>
      <div className="form-container">
        <h3>Registration</h3>
        <Form ref={join}>
          <div className="row">
            <Form.Group className="col" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control 
              type="text" 
              name="join_name"
              placeholder="Your name here"
              value={form.name}
              onChange={(e) => setField('name',e.target.value)}
              isInvalid={!!errors.name} />
               <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="col" controlId="surname">
              <Form.Label>Surname</Form.Label>
              <Form.Control 
              type="text" 
              placeholder="Your surname here"
              name="join_surname" 
              value={form.surname}
              onChange={(e) => setField('surname',e.target.value)}
              isInvalid={!!errors.surname} />
               <Form.Control.Feedback type="invalid">
              {errors.surname}
            </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="col" controlId="dob">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control 
              type="date" 
              name="join_dob" 
              placeholder="Enter the date of birth"
              value={form.dob}
              onChange={(e) => setField('dob',e.target.value)}
              isInvalid={!!errors.dob} />
            </Form.Group>
            <Form.Control.Feedback type="invalid">
              {errors.dob}
            </Form.Control.Feedback>
          </div>

          <div className="row">       
            <Form.Group className="col" controlId="mail">
            <Form.Label>Email address</Form.Label>
              <Form.Control 
              type="email"
              name="join_mail" 
              placeholder="Enter email"
              value={form.mail}
              onChange={(e) => setField('mail',e.target.value)}
              isInvalid={!!errors.mail} />
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
              onChange={(e) => setField('number',e.target.value)}
              isInvalid={!!errors.number} />
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
            onChange={(e) => setField('address',e.target.value)}
            isInvalid={!!errors.address} />
             <Form.Control.Feedback type="invalid">
              {errors.address}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="reason">
            <Form.Label>Why do you wanna be part of us?</Form.Label>
            <Form.Control 
            type="text" 
            placeholder="Explain your reasons"
            value={form.reason}
            onChange={(e) => setField('reason',e.target.value)}
            isInvalid={!!errors.reason} />
             <Form.Control.Feedback type="invalid">
              {errors.reason}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="gender">
          <Form.Label>Gender</Form.Label>
            <Form.Select
            value={form.gender}
            isInvalid={!!errors.gender}
            placeholder='Select Gender'
            onChange={(e) => {
              setField('gender', e.target.value)
            }}>
            <option>Select Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="U">Prefer not to say</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.gender}
            </Form.Control.Feedback>
          </Form.Group>
        
          
          <Button variant="primary" size="lg" onClick={handleSubmit}>
        Register
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
