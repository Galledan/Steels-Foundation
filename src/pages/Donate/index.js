import React, { useState } from "react";
import NavigationBar from "../../components/NavigationBar";
import Footer from '../../components/Footer'
import "./donate.css";
import Payment from "./Payment";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

function Donate() {
  const [radioValue, setRadioValue] = useState("1");
  const radios = [
    { name: "Give Monthly", value: "1" },
    { name: "Give Once", value: "2" },
  ];
  return (
    <div className="Donate">
      <NavigationBar />
      <div className="options-side">
        <img
          src={require("../../images/students3.jpg")}
          height="1000px"
          alt=""
        />

        <div className="texts">
          <h1>You are about to change a child's life!</h1>
          <p>Please select a donate type</p>
          <ButtonGroup>
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant={idx % 2 ? "outline-primary" : "outline-primary"}
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

      <div className="payment-side">
        <div className="payment-container">
          <Payment />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Donate;
