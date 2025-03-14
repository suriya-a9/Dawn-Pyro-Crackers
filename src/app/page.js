"use client"

import "bootstrap/dist/css/bootstrap.min.css";
import ModalPopup from "@/component/ModalPopup";
import Header from "@/component/Header";
import Banner from "@/component/Banner";
import NightCrackers from "@/component/NightCrackers";
import DayCrackers from "@/component/DayCrackers";
import Footer from "@/component/Footer";
import "@/app/page.module.css";
// import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Header />
      <Banner />
      <NightCrackers />
      <DayCrackers />
      <Footer />
      <ModalPopup />
      {/* <Link to="/quickorder"> */}
      <div className="floating-icon" style={{ position: 'fixed', bottom: '10%', right: '3%', display: 'flex', alignItems: 'center', justifyContent: 'start', width: '18%', borderRadius: '0px' }}>
        <div className="floating-gif" style={{ width: '32%', borderRadius: '50px', zIndex: '666' }}>
          <a href="/quickorder"><img src={"/assets/diwali-diwali-crackers.gif"} alt="gif" style={{ width: '89%' }} /></a>
        </div>
        <div className="floating-text" style={{ background: '#b00', marginLeft: '-20px', borderRadius: '3px', marginTop: '5px' }}>
          <a href="/quickorder" style={{ textDecoration: 'none' }}><p style={{ fontSize: '20px', color: 'white', padding: '8px 30px', marginBottom: '0px', fontWeight: '600' }}>Quick Order</p></a>
        </div>
      </div>
      {/* </Link> */}
    </>
  );
}
