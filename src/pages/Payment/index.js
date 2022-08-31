import { useState, useRef, useEffect } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import "./payment.css";
import Button from "react-bootstrap/Button";
import NavigationBar from "../../components/NavigationBar";

function Payment() {
  const [number, setNumber] = useState("");

  const [name, setName] = useState("");

  const [expiry, setExpiry] = useState("");

  const [cvc, setCvc] = useState("");

  const [focus, setFocus] = useState("");

  const firstRender = useRef(true)
   
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
        <form>
          <input
            type="tel"
            name="number"
            maxLength={16}
            placeholder="Card Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            onFocus={(e) => setFocus(e.target.name)}
            ref={ref}
          />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={(e) => setFocus(e.target.name)}
          />
          <input
            type="tel"
            name="expiry"
            maxLength={5}
            placeholder="MM/YY"
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
        <Button variant="primary" type="submit">Pay</Button>
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
