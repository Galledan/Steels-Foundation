import "./home.css";
import NavigationBar from "../../components/NavigationBar";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import api from '../../api/data'

function Home() {

  const [donators,setDonators] = useState()

  useEffect(() => {
    const getDonators = async () => {
      await api.get('/donators')
      .then(res => {
        setDonators(res.data)
      })
    }
    getDonators()
  },)

  return (
    <div className="Home">
      <NavigationBar />

      <div className="carousel">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={require("../../images/students.jpg")}
              alt="students"
            />
            <Carousel.Caption>
              <h1>Support A Child's Education</h1>
              <p>Quality Education is every child's right.</p>
              <Button href="/donate" variant="primary" size="lg">
                Support a Child
              </Button>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src={require("../../images/teachers.jpg")}
              alt="teachers"
            />
            <Carousel.Caption>
              <h1>Join Us to Help</h1>
              <p>Volunteer and help children to get them quality education.</p>
              <Button href="/join" variant="primary" size="lg">
                Join Us
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      <div className="why-text">
        <h1>Why Quality Education is Important?</h1>
        <p>
          Education is the key for succeding in many Sustainable Development
          Goals(SDGs). People can walk away from poverty when they got quality
          education. That's why Education helps decreasing inequality and ensure
          social gender equality. Also helps to have a healthy and sustainable
          life wherever people are. Education also helps to improve clemency and
          build a peaceful society.
        </p>

        <img
          src={require("../../images/student.jpg")}
          alt="std"
          width={800}
          height={530}
        />
      </div>
      <div className="con">
        <div className="supply-container">
          <p>
            Thanks to your donations we provide stationary items, medical
            support, uniforms, nutritious food and etc. to the children who
            cannot afford them
          </p>
          <Button href="/donate" variant="primary" size="lg">
            Donate
          </Button>
        </div>
        <div className="edu-container">
          <p>
            Volunteer for children and be a part of our non-profit foundation.
            Help us to give children a quality education which is their right.
          </p>
          <Button href="/donate" variant="primary" size="lg">
            Join Us
          </Button>
        </div>
        <div className="spo-container">
          <h1>Our partners</h1>
          <a href="https://www.mev.org.tr">
            <img
              src={require("../../images/mev.png")}
              alt="mev"
              width={200}
              height={200}
            />
          </a>
          <a href="https://tegv.org">
            <img
              src={require("../../images/tegv.png")}
              alt="tegv"
              width={300}
              height={200}
            />
          </a>
          <a href="https://www.tev.org.tr/anasayfa/tr">
            <img
              src={require("../../images/tev.png")}
              alt="tev"
              width={200}
              height={200}
            />
          </a>
          <a href="https://www.kizilay.org.tr">
            <img
              src={require("../../images/Türk_Kızılay_logo.png")}
              alt="tk"
              width={140}
              height={200}
            />
          </a>
        </div>
        <div className="don-container">
        <h1>Top Donators</h1>
          {donators && donators.map((donator,i) =>(
            <div className="donatorList">
              <li key={i}>{donator.name} {donator.surname} donated {donator.donationAmount}$</li>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
