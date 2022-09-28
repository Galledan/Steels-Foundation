import React, { useEffect, useState } from "react";
import "./admin.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import api from "../../api/data";
import Piechart from "../../components/PieChart";
import Barchart from "../../components/BarChart";
import { v4 as uuid } from "uuid";
function Admin() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [adminname, setAdminname] = useState();
  const [adminpassword, setAdminPassword] = useState();
  const [loggedIn, isLoggedIn] = useState(false);

  const [donators, setDonators] = useState();
  const [pending, setPending] = useState();
  const [approved, setApproved] = useState();
  const [admin, setAdmin] = useState();

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

  const handleAdminDelete = async (index, e) => {
    await api.delete("/admin/" + index.toString());
    getAdmin();
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

  const getAdmin = async () => {
    await api.get("/admin").then((res) => {
      setAdmin(res.data);
    });
  };

  const monthlyDonation = () => {
    var md = 0;
    for (let index = 0; index < donators.length; index++) {
      if (donators[index].donationType === "Monthly")
        md += parseInt(donators[index].donationAmount);
    }
    return md;
  };

  const educationJob = () => {
    var j = 0;
    for (let index = 0; index < approved.length; index++) {
      if (approved[index].job === "Educational") j += 1;
    }
    return j;
  };

  const medicalJob = () => {
    var j = 0;
    for (let index = 0; index < approved.length; index++) {
      if (approved[index].job === "Medical") j += 1;
    }
    return j;
  };

  const socialJob = () => {
    var j = 0;
    for (let index = 0; index < approved.length; index++) {
      if (approved[index].job === "Social Work") j += 1;
    }
    return j;
  };

  const fundJob = () => {
    var j = 0;
    for (let index = 0; index < approved.length; index++) {
      if (approved[index].job === "Fundraiser") j += 1;
    }
    return j;
  };

  const otherJob = () => {
    var j = 0;
    for (let index = 0; index < approved.length; index++) {
      if (approved[index].job === "Other") j += 1;
    }
    return j;
  };

  const onceDonation = () => {
    var od = 0;
    for (let index = 0; index < donators.length; index++) {
      if (donators[index].donationType === "Once")
        od += parseInt(donators[index].donationAmount);
    }
    return od;
  };

  useEffect(() => {
    getDonators();
    getPending();
    getApproved();
    getAdmin();
  }, []);

  const onLogin = async () => {
    await api
      .get("/admin?username=" + username)
      .then((res) => {
        if (
          username === res.data[0].username &&
          password === res.data[0].password
        )
          isLoggedIn(true);
      })
      .catch(console.log("invalid input"));
  };

  const onLogout = () => {
    isLoggedIn(false)
  }

  const addAdmin = async () => {
    await api.post("/admin", {
      id: uuid(),
      username: adminname,
      password: adminpassword,
    });
    getAdmin()
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
              <Button variant="success" onClick={onLogin}>
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
                <div className="admin-user">
                <h3 className="welcome-text">Welcome {username}</h3>
                <Button className="logout" variant="success" onClick={onLogout}>Log Out</Button>
                </div>
                <div className="total donation">
                  <p>Total Donation Revenue</p>
                  <span>{onceDonation() + monthlyDonation()} $</span>
                </div>
                <div className="total pending-volunteers">
                  <p>Total Pending Volunteers</p>
                  <span>{pending.length}</span>
                </div>

                <div className="total approved-volunteers">
                  <p>Total Approved Volunteers</p>
                  <span>{approved.length}</span>
                </div>
                <div className="piechart">
                  <Piechart once={onceDonation()} monthly={monthlyDonation()} />
                </div>
                <div className="barchart">
                  <Barchart
                    education={educationJob()}
                    medical={medicalJob()}
                    social={socialJob()}
                    fund={fundJob()}
                    other={otherJob()}
                  />
                </div>
                <div className="newAdmin">
                  <div className="adminForm">
                    <h3>Add Admin</h3>
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="This will be your admin name"
                          value={adminname}
                          onChange={(e) => setAdminname(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          value={adminpassword}
                          onChange={(e) => setAdminPassword(e.target.value)}
                        />
                      </Form.Group>
                      <Button variant="success" onClick={addAdmin}>
                        Add Admin
                      </Button>
                    </Form>
                  </div>
                  <div className="adminList">
                    <Table striped bordered hover size="sm" responsive>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Username</th>
                          <th>Password</th>
                        </tr>
                      </thead>
                      <tbody>
                        {admin &&
                          admin.map((member, i) => (
                            <tr key={i}>
                              <th>{i + 1}</th>
                              <th>{member.username}</th>
                              <th>{member.password}</th>
                              <td>
                                <Button
                                variant="success"
                                  onClick={(e) =>
                                    handleAdminDelete(member.id, e)
                                  }
                                >
                                  Delete
                                </Button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>
            </Tab>

            <Tab eventKey="volunteer" title="Volunteers">
              <div className="volunteer-container">
                <div className="pending-table">
                  <h2>Pending</h2>
                  <input onChange={(e) => setName(e.target.value)}></input>
                  <Button variant="success" onClick={() => pendingNameFilter(name)}>
                    Filter
                  </Button>
                  <Button variant="success" onClick={() => getPending()}>Clear Filter</Button>
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
                              <Button
                              variant="success"
                                onClick={(e) =>
                                  handlePendingDelete(volunteer.id, e)
                                }
                              >
                                Delete
                              </Button>
                              <Button
                              variant="success"
                                onClick={(e) =>
                                  approveVolunteer(volunteer.id, e)
                                }
                              >
                                Approve
                              </Button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </div>

                <div className="approved-table">
                  <h2>Approved</h2>
                  <input onChange={(e) => setName(e.target.value)}></input>
                  <Button variant="success"onClick={() => approvedNameFilter(name)}>
                    Filter
                  </Button>
                  <Button variant="success" onClick={() => getApproved()}>Clear Filter</Button>
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
                              <Button
                              variant="success"
                                onClick={(e) =>
                                  handleApprovedDelete(volunteer.id, e)
                                }
                              >
                                Delete
                              </Button>
                              <Button
                              variant="success"
                                onClick={(e) =>
                                  unapproveVolunteer(volunteer.id, e)
                                }
                              >
                                Pending
                              </Button>
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
                  <Table striped bordered hover size="sm" responsive>
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
                        <th>Donation Date</th>
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
                            <th>{donator.donateDate}</th>
                            <td>
                              <Button
                              variant="success"
                                onClick={(e) =>
                                  handleDonationDelete(donator.id, e)
                                }
                              >
                                Delete
                              </Button>
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
