import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTranslation } from "react-i18next";
import "./navbar.css"

const NavigationBar = () => {
  const { t, i18n } = useTranslation();

  const changeLanguageTr = () => {
    i18n.changeLanguage("tr");
  };

  const changeLanguageEn = () => {
    i18n.changeLanguage("en");
  };

  return (
    <Navbar bg="dark" expand='sm' variant="dark" fixed="top">
      <Container>
        <Navbar.Brand href="/">
<<<<<<< HEAD
          <img className="logo" src={require("../../images/logo.png")} alt="logo" width={300} />
=======
          <img src={require("../../images/logo.png")} alt="logo" width={300} />
>>>>>>> 13692cbba9e36ef66fccecf3d0119046e5656052
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Nav>
            <Nav.Link href="/donate">{t("Donate")}</Nav.Link>
            <Nav.Link href="/join">{t("Join Us")}</Nav.Link>
            <NavDropdown title={<i class="fas fa-globe"></i>} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={changeLanguageTr}><img src={require("../../images/trlogo.png")} height={15} width={20} alt="trlogo"/> Türkçe</NavDropdown.Item>
              <NavDropdown.Item onClick={changeLanguageEn}><img src={require("../../images/englogo.png")} height={15} width={20} alt="englogo"/> English</NavDropdown.Item>
              </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
