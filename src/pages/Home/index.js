import "./home.css";
import NavigationBar from "../../components/NavigationBar";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import api from "../../api/data";
import { useTranslation } from "react-i18next";

function Home() {
  const [donators, setDonators] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    const getDonators = async () => {
      await api.get("/donators").then((res) => {
        setDonators(res.data);
      });
    };
    getDonators();
  }, []);

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
              <h1>{t("Support A Child's Education")}</h1>
              <p>{t("Quality Education is every child's right.")}</p>
              <Button href="/donate" variant="primary" size="lg">
                {t("Support a Child")}
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
              <h1>{t("Join Us to Help")}</h1>
              <p>
                {t(
                  "Volunteer and help children to get them quality education."
                )}
              </p>
              <Button href="/join" variant="primary" size="lg">
                {t("Join Us")}
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      <div className="sdg-container">
        <h1>{t("What is 'Sustainable Development Goals' Project?")}</h1>
        <p>
        {t("The Sustainable Development Goals are a call for action by all countries – poor, rich and middle-income – to promote prosperity while protecting the planet. They recognize that ending poverty must go hand-in-hand with strategies that build economic growth and address a range of social needs including education, health, social protection, and job opportunities, while tackling climate change and environmental protection. More important than ever, the goals provide a critical framework for COVID-19 recovery.")}
        </p>
        <img
          src={require("../../images/sdg.png")}
          alt="sdg"
        />
      </div>
      <div className="why-text">
        <h1>{t("Why Quality Education is Important?")}</h1>
        <p>
          {t(
            "Education is the key for succeding in many Sustainable Development Goals(SDGs). People can walk away from poverty when they got quality education. That's why Education helps decreasing inequality and ensure social gender equality. Also helps to have a healthy and sustainable life wherever people are. Education also helps to improve clemency and build a peaceful society."
          )}
        </p>

        <img
          src={require("../../images/student.jpg")}
          alt="std"
        />
      </div>
      <div className="con">
        <div className="supply-container">
          <p>
            {t(
              "Thanks to your donations we provide stationary items, medicalsupport, uniforms, nutritious food and etc. to the children who cannot afford them"
            )}
          </p>
          <Button href="/donate" variant="primary" size="lg">
            {t("Donate")}
          </Button>
        </div>
        <div className="edu-container">
          <p>
            {t(
              "Volunteer for children and be a part of our non-profit foundation. Help us to give children a quality education which is their right."
            )}
          </p>
          <Button href="/donate" variant="primary" size="lg">
            {t("Join Us")}
          </Button>
        </div>
        <div className="spo-container">
          <h1>{t("Our partners")}</h1>
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
          <h1>{t("Latest Donations")}</h1>
          <div className="donatorList">
            <ul>
              {donators &&
                donators.slice(-5).map((donator, i) => (
                  <li key={i}>
                    {donator.name} {donator.surname} {t("donated")}{" "}
                    {donator.donationAmount}$
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
