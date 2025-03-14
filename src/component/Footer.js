"use client"

import { FaPhone } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import "@/app/page.module.css"

export default function Footer() {
    return (
        <section className="footer" style={{ backgroundColor: '#b00', color: 'white', padding: '60px 0px' }}>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="footer-image">
                            <img src={"/assets/logo.webp"} alt="logo" style={{ width: '80%', objectFit: 'cover' }} />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="footer-quick-links">
                            <h4 style={{ fontWeight: '600' }}>Contact Us</h4>
                            <ul className="quick-links" style={{ listStyle: 'none', paddingLeft: '0px', marginBottom: '0px' }}>
                                <li style={{ paddingBottom: '11px' }}><a href="/" style={{ textDecoration: 'none', color: 'white', fontWeight: '300' }}>Home</a></li>
                                <li style={{ paddingBottom: '11px' }}><a href="/" style={{ textDecoration: 'none', color: 'white', fontWeight: '300' }}>About Us</a></li>
                                <li style={{ paddingBottom: '11px' }}><a href="/" style={{ textDecoration: 'none', color: 'white', fontWeight: '300' }}>Products</a></li>
                                <li style={{ paddingBottom: '11px' }}><a href="/" style={{ textDecoration: 'none', color: 'white', fontWeight: '300' }}>Contact Us</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="footer-address-details">
                            <h4 style={{ fontWeight: '600' }}>Contact Us</h4>
                            <p style={{ fontWeight: '300' }}>Dawn Pyro Park, 1/281, Meenampatti village, Sattur Road, Sivakasi - 626 189.</p>
                            <p style={{ fontWeight: '300' }}><FaPhone /> +91-97866-83878</p>
                            <p style={{ fontWeight: '300' }}><MdMail /> info@dawncrackers.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}