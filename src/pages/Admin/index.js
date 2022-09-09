import React, { useEffect, useState } from "react";
import "./admin.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import api from "../../api/data";

function Admin() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [loggedIn, isLoggedIn] = useState(false);

  const [donators, setDonators] = useState();
  const [volunteers, setVolunteers] = useState();

  const handleVolunteerDelete =  async (index,e) => {
    await api.delete('/volunteers/'+ index.toString())
}

  const totalDonation = () => {
    var td = 0;
    for (let index = 0; index < donators.length; index++) {
       td += parseInt(donators[index].donationAmount);
     }
     return td
  }

  useEffect(() => {
    const getDonators = async () => {
      await api.get("/donators").then((res) => {
        setDonators(res.data);
      });
    };
    getDonators();

    const getVolunteers = async () => {
      await api.get("/volunteers").then((res) => {
        setVolunteers(res.data);
      });
    };
    getVolunteers();
  }, []);
  

  const onLogin = () => {
    if (username === "admin" && password === "admin") {
      isLoggedIn(true);
    } else {
      isLoggedIn(false);
    }
  };

  return (
    <div className="Admin">
      {!loggedIn && (
        <div className="login-container">
          <div className="login-form">
            <img
              src={require("../../images/logo.png")}
              alt="logo"
              width={500}
            />
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your admin username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="formBasicCheckbox"
              ></Form.Group>
              <Button variant="primary" onClick={onLogin}>
                Login
              </Button>
            </Form>
          </div>
        </div>
      )}
      {loggedIn && (
        <div className="panel">
          <Tabs
            defaultActiveKey="main"
            id="fill-tab-example"
            className="mb-3"
            fill
          >
            <Tab eventKey="main" title="Main">
              <h1>Total Donation</h1>
              <span>{totalDonation()}</span>
            </Tab>

            <Tab eventKey="volunteer" title="Volunteers">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Date of Birth</th>
                    <th>Mail</th>
                    <th>Phone Number</th>
                    <th>Address</th>
                    <th>Job</th>
                    <th>Gender</th>
                    <th>Register Date</th>
                  </tr>
                </thead>
                <tbody>
                {volunteers &&
                volunteers.map((volunteer, i) => (
                  <tr key={i}>
                    <th>{i+1}</th>
                    <th>{volunteer.name}</th>
                    <th>{volunteer.surname}</th>
                    <th>{volunteer.dob}</th>
                    <th>{volunteer.mail}</th>
                    <th>{volunteer.number}</th>
                    <th>{volunteer.address}</th>
                    <th>{volunteer.job}</th>
                    <th>{volunteer.gender}</th>
                    <th>{volunteer.registerdate}</th>
                    <td><button onClick={e => handleVolunteerDelete(volunteer.id,e)}>Delete</button></td>
                  </tr>
                ))}
                </tbody>

              </Table>
            </Tab>

            <Tab eventKey="donation" title="Donations">
            <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Mail</th>
                    <th>Phone Number</th>
                    <th>Address</th>
                    <th>Donation Type</th>
                    <th>Donation Amount</th>
                  </tr>
                </thead>
                <tbody>
                {donators &&
                donators.map((donator, i) => (
                  <tr key={i}>
                    <th>{i+1}</th>
                    <th>{donator.name}</th>
                    <th>{donator.surname}</th>
                    <th>{donator.mail}</th>
                    <th>{donator.number}</th>
                    <th>{donator.address}</th>
                    <th>{donator.donationType}</th>
                    <th>{donator.donationAmount}</th>
                  </tr>
                ))}
                </tbody>

              </Table>
            </Tab>
          </Tabs>
        </div>
      )}
    </div>
  );
}

export default Admin;