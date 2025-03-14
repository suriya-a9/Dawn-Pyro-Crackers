"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useState, useEffect } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import "@/app/page.module.css";

export default function DayCrackers() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost/dawn-crackers/public/api/productlist",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched products:", data.results);

        if (data && Array.isArray(data.results)) {
          const uniqueProducts = [];
          const productIds = new Set();

          data.results.forEach((product) => {
            if (!productIds.has(product.id)) {
              productIds.add(product.id);
              uniqueProducts.push(product);
            }
          });

          setProducts(uniqueProducts.slice(0, 8));
          setLoading(false);
        } else {
          console.error("Invalid API response format:", data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <><p>Loading...</p></>
  }

  return (
    <section className="night-crackers-section">
      <div className="container">
        <div className="row align-items-center justify-content-between">
          <div className="col night-crackers-head d-flex justify-content-center align-items-center">
            <img src={"/assets/heading.gif"} alt="gif" />
            <h2 className="mx-3">Day Fireworks</h2>
            <img src={"/assets/heading.gif"} alt="gif" />
          </div>
          <div className="col-auto see-all">
            <a href="/">
              See all <MdOutlineKeyboardArrowRight />
            </a>
          </div>
        </div>
        <div className="row">
          {products.map((product, index) => (
            <div className="col-md-3" key={product.id || `product-${index}`}>
              <div className="cracker-list">
                <Zoom>
                  <img
                    src={
                      product.image.startsWith("http")
                        ? product.image
                        : `http://localhost/dawn-crackers/public/image/product/${product.image}`
                    }
                    alt={product.title}
                  />
                </Zoom>
                <div className="crackers-caption">
                  <h4>{product.title}</h4>
                  <div className="rating">
                    <img src={"/assets/rating-star.webp"} alt="rating" />
                    <img src={"/assets/rating-star.webp"} alt="rating" />
                    <img src={"/assets/rating-star.webp"} alt="rating" />
                    <img src={"/assets/rating-star.webp"} alt="rating" />
                    <img src={"/assets/rating-star.webp"} alt="rating" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
