"use client";

import { useState, useEffect } from "react";
import Banner from "@/component/Banner";
import Header from "@/component/Header";
import ProductList from "@/app/about/page";
import Footer from "@/component/Footer";


export default function quickorder() {
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
      {currentStep >= 3 && <ProductList />}
      {currentStep >= 5 && <Footer />}
    </>
  );
}