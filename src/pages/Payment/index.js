import { useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import "./payment.css";
import Button from "react-bootstrap/Button";
import NavigationBar from "../../components/NavigationBar";
import Modal from "react-bootstrap/Modal"
import {useTranslation} from 'react-i18next';

function Payment() {
  const [number, setNumber] = useState("");

  const [name, setName] = useState("");

  const [expiry, setExpiry] = useState("");

  const [cvc, setCvc] = useState("");

  const [focus, setFocus] = useState("");

  const { t} = useTranslation();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    

  const validatePayment = () => {
    const textReg = new RegExp(/[a-zA-Z]/)
    const numReg = new RegExp(/[0-9]/)
    const creditReg = new RegExp(/^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)
    const expReg = new RegExp(/^(0[1-9]|1[0-2])\/?([0-9]{2})/)
    if (!name || name === '') return false
    if(!textReg.test(name)) return false
    if (!number || number === '') return false
    if(!creditReg.test(number)) return false
    if (!expiry || expiry === '') return false
    if(!expReg.test(expiry)) return false
    if (!cvc || cvc === '') return false
    if(!numReg.test(cvc)) return false
    else return true
    
  }


  const onSubmit = () => {
    handleShow()
  }
 

  return (
    <div className="Payment">
      <NavigationBar/>
      <div className="payment-container">
        <Cards
          number={number}
          name={name}
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
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            onFocus={(e) => setFocus(e.target.name)}
          />
          <input
            type="text"
            name="name"
            placeholder={t("Full Name")}
            value={name}
            onChange={(e) => setName(e.target.value)}
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
        <Button onClick={onSubmit} variant="primary" type="submit" disabled={!validatePayment()}>{t("Pay")}</Button>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thanks for your donation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please do not forget the share this foundation with your friends! <a href="localhost:3000">Steels Foundation</a></Modal.Body>
      </Modal>
      </div>
      <div className="text-container">
        <h1>{t("Thanks for your donation!")}</h1>
        <p>
        {t("You can be sure this money will be used to change a life of a child.")}
        </p>
      </div>
    </div>
  );
}

export default Payment;
