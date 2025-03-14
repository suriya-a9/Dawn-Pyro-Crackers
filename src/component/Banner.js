"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";

export default function Banner() {
  return (
    <Carousel>
      <Carousel.Item>
        <img src={"/assets/home-banner.webp"} alt="home-banner" />
      </Carousel.Item>
    </Carousel>
  );
}
