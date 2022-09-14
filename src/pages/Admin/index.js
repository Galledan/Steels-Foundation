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
  const [pending, setPending] = useState();
  const [approved, setApproved] = useState();

  const [name, setName] = useState();

  const handlePendingDelete = async (index, e) => {
    await api.delete("/pending/" + index.toString());
    getPending();
    getApproved();
  };

  const handleApprovedDelete = async (index, e) => {
    await api.delete("/approved/" + index.toString());
    getApproved();
    getPending();
  };

  const handleDonationDelete = async (index, e) => {
    await api.delete("/donators/" + index.toString());
    getDonators();
  };

  const totalDonation = () => {
    var td = 0;
    for (let index = 0; index < donators.length; index++) {
      td += parseInt(donators[index].donationAmount);
    }
    return td;
  };

  const getDonators = async () => {
    await api.get("/donators").then((res) => {
      setDonators(res.data);
    });
  };

  const getPending = async () => {
    await api.get("/pending").then((res) => {
      setPending(res.data);
    });
  };

  const getApproved = async () => {
    await api.get("/approved").then((res) => {
      setApproved(res.data);
    });
  };

  useEffect(() => {
    getDonators();
    getPending();
    getApproved();
  }, []);

  const onLogin = () => {
    if (username === "admin" && password === "admin") {
      isLoggedIn(true);
    } else {
      isLoggedIn(false);
    }
  };

  const approveVolunteer = async (index, e) => {
    await api.get("/pending/" + index.toString()).then((res) => {
      api.post("/approved", res.data);
    });
    handlePendingDelete(index, e);
  };

  const unapproveVolunteer = async (index, e) => {
    await api.get("/approved/" + index.toString()).then((res) => {
      api.post("/pending", res.data);
    });
    handleApprovedDelete(index, e);
  };

  const pendingNameFilter = async (name) => {
    await api.get("/pending?name=" + name).then((res) => {
      setPending(res.data);
    });
  };

  const approvedNameFilter = async (name) => {
    await api.get("/approved?name=" + name).then((res) => {
      setApproved(res.data);
    });
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
              <div className="main-container">
                <h1>Total Donation</h1>
                <span>{totalDonation()}</span>
                <h1>Total Pending Volunteers</h1>
                <span>{pending.length}</span>
                <h1>Total Approved Volunteers</h1>
                <span>{approved.length}</span>
              </div>
            </Tab>

            <Tab eventKey="volunteer" title="Volunteers">
              <div className="volunteer-container">
                <div className="pending-table">
                  <h2>Pending</h2>
                  <input onChange={(e) => setName(e.target.value)}></input>
                  <Button onClick={() => pendingNameFilter(name)}>
                    Filter
                  </Button>
                  <Button onClick={() => getPending()}>Clear Filter</Button>
                  <Table striped bordered hover size="sm" responsive>
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
                      {pending &&
                        pending.map((volunteer, i) => (
                          <tr key={i}>
                            <th>{i + 1}</th>
                            <th>{volunteer.name}</th>
                            <th>{volunteer.surname}</th>
                            <th>{volunteer.dob}</th>
                            <th>{volunteer.mail}</th>
                            <th>{volunteer.number}</th>
                            <th className="thaddress">{volunteer.address}</th>
                            <th>{volunteer.job}</th>
                            <th>{volunteer.gender}</th>
                            <th>{volunteer.registerdate}</th>
                            <td>
                              <button
                                onClick={(e) =>
                                  handlePendingDelete(volunteer.id, e)
                                }
                              >
                                Delete
                              </button>
                              <button
                                onClick={(e) =>
                                  approveVolunteer(volunteer.id, e)
                                }
                              >
                                Approve
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </div>

                <div className="approved-table">
                  <h2>Approved</h2>
                  <input onChange={(e) => setName(e.target.value)}></input>
                  <Button onClick={() => approvedNameFilter(name)}>
                    Filter
                  </Button>
                  <Button onClick={() => getApproved()}>Clear Filter</Button>
                  <Table striped bordered hover size="sm" responsive>
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
                      {approved &&
                        approved.map((volunteer, i) => (
                          <tr key={i}>
                            <th>{i + 1}</th>
                            <th>{volunteer.name}</th>
                            <th>{volunteer.surname}</th>
                            <th>{volunteer.dob}</th>
                            <th>{volunteer.mail}</th>
                            <th>{volunteer.number}</th>
                            <th className="thaddress">{volunteer.address}</th>
                            <th>{volunteer.job}</th>
                            <th>{volunteer.gender}</th>
                            <th>{volunteer.registerdate}</th>
                            <td>
                              <button
                                onClick={(e) =>
                                  handleApprovedDelete(volunteer.id, e)
                                }
                              >
                                Delete
                              </button>
                              <button
                                onClick={(e) =>
                                  unapproveVolunteer(volunteer.id, e)
                                }
                              >
                                Pending
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </Tab>

            <Tab eventKey="donation" title="Donations">
              <div className="donator-container">
                <div className="donator-table">
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
                            <th>{i + 1}</th>
                            <th>{donator.name}</th>
                            <th>{donator.surname}</th>
                            <th>{donator.mail}</th>
                            <th>{donator.number}</th>
                            <th>{donator.address}</th>
                            <th>{donator.donationType}</th>
                            <th>{donator.donationAmount}</th>
                            <td>
                              <button
                                onClick={(e) =>
                                  handleDonationDelete(donator.id, e)
                                }
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      )}
    </div>
  );
}

export default Admin;
