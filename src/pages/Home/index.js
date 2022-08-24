import "./home.css";
import NavigationBar from "../../components/NavigationBar";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Footer from "../../components/Footer"

function Home() {
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
      </div>
      <div className="cards-container">
        <h1>What We Do?</h1>

        <div id="cards" className="row">
          <Card className="text-center" style={{ width: "18rem" }}>
            <Card.Img 
            variant="top" 
            src={require("../../images/students2.jpg")}
             />
            <Card.Body>
              <Card.Title>School Supplies</Card.Title>
              <Card.Text>
                Giving stationery items to the children who lacks having it to study.
              </Card.Text>
              <Button href="/donate" variant="primary">Donate</Button>
            </Card.Body>
          </Card>

          <Card className="text-center" style={{ width: "18rem" }}>
            <Card.Img 
            variant="top" 
            src={require("../../images/teachers2.jpg")} 
            />
            <Card.Body>
              <Card.Title>Free Education</Card.Title>
              <Card.Text>
                Our voluntarily teachers gives education to the children who cannot afford schools.
              </Card.Text>
              <Button href="/join" variant="primary">Join Us</Button>
            </Card.Body>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
