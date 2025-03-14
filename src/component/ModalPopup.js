"use client";

import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../app/page.module.css";

const districts = [
  "Ariyalur",
  "Chengalpattu",
  "Chennai",
  "Coimbatore",
  "Cuddalore",
  "Dharmapuri",
  "Dindigul",
  "Erode",
  "Kallakurichi",
  "Kanchipuram",
  "Kanyakumari",
  "Karur",
  "Krishnagiri",
  "Madurai",
  "Nagapattinam",
  "Namakkal",
  "Nilgiris",
  "Perambalur",
  "Pudukkottai",
  "Ramanathapuram",
  "Ranipet",
  "Salem",
  "Sivaganga",
  "Tenkasi",
  "Thanjavur",
  "Theni",
  "Thoothukudi",
  "Tiruchirappalli",
  "Tirunelveli",
  "Tirupattur",
  "Tiruppur",
  "Tiruvallur",
  "Tiruvannamalai",
  "Tiruvarur",
  "Vellore",
  "Viluppuram",
  "Virudhunagar",
];

export default function ModalPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [pincode, setPincode] = useState("");

  useEffect(() => {
    const popupShown = localStorage.getItem("popupShown");

    if (!popupShown) {
      const timer = setTimeout(() => {
        setShowPopup(true);
        localStorage.setItem("popupShown", "true");
      }, 1000);

      return () => clearTimeout(timer);
    }

    const handleBeforeUnload = () => {
      localStorage.removeItem("popupShown");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedDistrict !== "Madurai") {
      toast.error("No delivery to your district");
    } else {
      console.log("Selected District:", selectedDistrict);
      console.log("Pincode:", pincode);
      handleClosePopup();
    }
  };

  return (
    <div className={styles.page}>
      <ToastContainer />
      <Modal
        show={showPopup}
        onHide={handleClosePopup}
        backdrop="static"
        dialogClassName={styles.fullscreenModal}
      >
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <img
                  src={"/assets/popup-banner.webp"}
                  alt="popup-banner"
                  style={{ width: "100%", height: "400px", objectFit: "cover" }}
                />
              </div>
              <div className="col-md-6">
                <div className="popup-content" style={{ padding: "45px" }}>
                  <h2>Select your location</h2>
                  <p>
                    Select your Location and Enter your Pincode, So we could let
                    you know if we can deliver to that location
                  </p>
                  <Form onSubmit={handleSubmit} className="modal-location-form">
                    <Form.Group
                      controlId="formDistrict"
                      style={{ marginBottom: "15px", borderRadius: "3px" }}
                    >
                      <Form.Control
                        as="select"
                        value={selectedDistrict}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                        required
                      >
                        <option value="">Select a district</option>
                        {districts.map((district) => (
                          <option key={district} value={district}>
                            {district}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group
                      controlId="formPincode"
                      style={{ borderRadius: "3px", marginBottom: "15px" }}
                    >
                      <Form.Control
                        type="text"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="Enter Pincode"
                        required
                      />
                    </Form.Group>
                    <Button
                      variant="primary"
                      type="submit"
                      className="popup-location-submit"
                      style={{
                        width: "100%",
                        color: "white",
                        fontWeight: "500",
                        textTransform: "capitalize",
                        backgroundColor: "red",
                        border: "none",
                        borderRadius: "3px",
                      }}
                    >
                      Submit
                    </Button>
                    <p
                      className="terms-para"
                      style={{
                        textAlign: "center",
                        color: "red",
                        fontWeight: "200",
                        paddingTop: "15px",
                      }}
                    >
                      Terms & Conditions applied
                    </p>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
