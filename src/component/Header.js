"use client";

import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUserCircle } from "react-icons/fa";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "@/app/page.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Header() {
  const [customerName, setCustomerName] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({
    mobile_no: "",
    otp: "",
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const customerId = localStorage.getItem("customer_id");
    if (customerId) {
      const customerName = localStorage.getItem("customer_name");
      setCustomerName(customerName);
    }
  }, []);

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
    setShowOtpInput(false);
  };

  const handleChange = (e) => {
    e.preventDefault();

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost/dawn-crackers/public/api/dawnuserlogin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mobile_no: formData.mobile_no }),
        }
      );

      const data = await response.json();
      if (data.status === "success") {
        toast.success("OTP sent successfully!");
        setShowOtpInput(true);
      } else {
        toast.error("Failed to send OTP: " + data.message);
      }
    } catch (error) {
      toast.error("An error occurred: " + error.message);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost/dawn-crackers/public/api/dawnverifyotp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mobile_no: formData.mobile_no,
            otp: formData.otp,
          }),
        }
      );

      const data = await response.json();
      if (data.status === "success") {
        toast.success("Login successful!");
        localStorage.setItem("customer_id", data.customer_id);
        localStorage.setItem("customer_name", data.customer_name);
        setCustomerName(data.customer_name);
        setShowLoginModal(false);
      } else {
        toast.error("Failed to verify OTP: " + data.message);
      }
    } catch (error) {
      toast.error("An error occurred: " + error.message);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost/dawn-crackers/public/api/dawnuserregister",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mobile_no: formData.mobile_no,
          }),
        }
      );

      const data = await response.json();
      if (data.status === "success") {
        toast.success("Registration successful! Kindly Login!");
        setActiveTab("login");
      } else {
        toast.error("Failed to register: " + data.message);
      }
    } catch (error) {
      toast.error("An error occurred: " + error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("customer_id");
    localStorage.removeItem("customer_name");
    setCustomerName(null);
    toast.success("Logged out successfully!");
  };

  return (
    <>
      <ToastContainer />
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand style={{ display: "flex", alignItems: "center" }}>
            <FaUserCircle /> &nbsp;
            {customerName ? (
              <DropdownButton id="dropdown-basic-button" title={customerName}>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </DropdownButton>
            ) : (
              <span
                className="login-span"
                onClick={handleLoginClick}
                style={{ color: "white", cursor: "pointer" }}
              >
                Login
              </span>
            )}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/" className="nav-text">
                Home
              </Nav.Link>
              <Nav.Link href="#about-us" className="nav-text">
                About Us
              </Nav.Link>
              <Nav.Link href="/">
                <img src={"/assets/logo.webp"} alt="logo" />
              </Nav.Link>
              <Nav.Link href="#products" className="nav-text">
                Products
              </Nav.Link>
              <Nav.Link href="#contact-us" className="nav-text">
                Contact Us
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showLoginModal} onHide={handleCloseLoginModal}>
        <Modal.Header closeButton>
          <Modal.Title>Login / Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            id="login-register-tabs"
          >
            <Tab eventKey="login" title="Login">
              <Form
                onSubmit={showOtpInput ? handleOtpSubmit : handleLoginSubmit}
              >
                <Form.Group className="mb-3" controlId="formMobileNumber">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type="number"
                    name="mobile_no"
                    value={formData.mobile_no}
                    onChange={handleChange}
                    placeholder="Enter Mobile Number"
                    required
                  />
                </Form.Group>
                {showOtpInput && (
                  <Form.Group className="mb-3" controlId="formOtp">
                    <Form.Label>OTP</Form.Label>
                    <Form.Control
                      type="number"
                      name="otp"
                      value={formData.otp}
                      onChange={handleChange}
                      placeholder="Enter OTP"
                      required
                    />
                  </Form.Group>
                )}
                <Button variant="primary" type="submit">
                  {showOtpInput ? "Submit OTP" : "Get OTP"}
                </Button>
              </Form>
            </Tab>
            <Tab eventKey="register" title="Register">
              <Form onSubmit={handleRegisterSubmit}>
                <Form.Group
                  className="mb-3"
                  controlId="formMobileNumberRegister"
                >
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type="number"
                    name="mobile_no"
                    value={formData.mobile_no}
                    onChange={handleChange}
                    placeholder="Enter Mobile Number"
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Register
                </Button>
              </Form>
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLoginModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
