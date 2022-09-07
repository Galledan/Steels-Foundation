import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";

const NavigationBar = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = () => {
    if (i18n.language === "en-US") i18n.changeLanguage("tr");
    else i18n.changeLanguage("en-US");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="xl" fixed="top">
      <Container>
        <Navbar.Brand href="/">
          <img src={require("../../images/logo.png")} alt="logo" width={300} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Nav>
            <Nav.Link href="/donate">{t("Donate")}</Nav.Link>
            <Nav.Link href="/join">{t("Join Us")}</Nav.Link>
            <Button onClick={changeLanguage} variant="outline-light">
              {t("TR")}
            </Button>{" "}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
