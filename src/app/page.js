"use client";

import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ModalPopup from "@/component/ModalPopup";
import Header from "@/component/Header";
import Banner from "@/component/Banner";
import NightCrackers from "@/component/NightCrackers";
import DayCrackers from "@/component/DayCrackers";
import Footer from "@/component/Footer";
import "@/app/page.module.css";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (currentStep < 6) {
      const timer = setTimeout(() => setCurrentStep(currentStep + 1), 2000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  return (
    <>
      {currentStep >= 1 && <Header />}
      {currentStep >= 2 && <Banner />}
      {currentStep >= 3 && <NightCrackers />}
      {currentStep >= 4 && <DayCrackers />}
      {currentStep >= 5 && <Footer />}
      {currentStep >= 6 && <ModalPopup />}
    </>
  );
}
