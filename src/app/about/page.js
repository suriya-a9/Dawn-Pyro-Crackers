"use client";

import React, { useState, useEffect, useRef } from "react";
import { getProducts } from "@/app/lib/getProducts";
import Zoom from "react-medium-image-zoom";
import { FaRegTrashAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-medium-image-zoom/dist/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import "./about.css";
import "@/app/page.module.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [cart, setCart] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [showNewAddressInput, setShowNewAddressInput] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    customer_name: "",
    address: "",
    new_address: "",
    mail: "",
    phone_number: "",
    location: "",
  });

  const checkoutRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      const uniqueProducts = products.filter(
        (product, index, self) =>
          index === self.findIndex((p) => p.id === product.id)
      );

      setProducts(uniqueProducts);
      setQuantities(
        uniqueProducts.reduce((acc, product) => {
          acc[product.id] = "";
          return acc;
        }, {})
      );
      setLoading(false);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchAddresses = async () => {
      const customerId = localStorage.getItem("customer_id");
      if (customerId) {
        const response = await fetch(
          "http://localhost/dawn-crackers/public/api/addresslist",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ customer_id: customerId }),
          }
        );
        const data = await response.json();
        if (data.status === "success") {
          setAddresses(data.results);
          console.log(setAddresses);
        } else {
          toast.error("Failed to fetch addresses: " + data.message);
        }
      }
    };

    fetchAddresses();
  }, []);

  const handleQuantityChange = (productId, value) => {
    setQuantities((prevQuantities) => {
      const newQuantities = {
        ...prevQuantities,
        [productId]: value,
      };

      const updatedCart = products
        .filter((product) => newQuantities[product.id] > 0)
        .map((product) => ({
          ...product,
          quantity: newQuantities[product.id],
          total: product.final_price * newQuantities[product.id],
        }));

      setCart(updatedCart);

      return newQuantities;
    });
  };

  const handleRemoveFromCart = (productId) => {
    setQuantities((prevQuantities) => {
      const newQuantities = {
        ...prevQuantities,
        [productId]: 0,
      };

      const updatedCart = products
        .filter((product) => newQuantities[product.id] > 0)
        .map((product) => ({
          ...product,
          quantity: newQuantities[product.id],
          total: product.final_price * newQuantities[product.id],
        }));

      setCart(updatedCart);

      return newQuantities;
    });
  };

  const handleCustomerDetailsChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { value } = e.target;
    if (value === "add_new") {
      setShowNewAddressInput(true);
      setCustomerDetails((prevDetails) => ({
        ...prevDetails,
        address: "",
        new_address: "",
      }));
    } else {
      setShowNewAddressInput(false);
      setCustomerDetails((prevDetails) => ({
        ...prevDetails,
        address: value,
        new_address: "",
      }));
    }
  };

  const handleCheckout = async () => {
    const customerId = localStorage.getItem("customer_id");
    if (!customerId) {
      toast.error("Please log in to place an order.");
      return;
    }

    setPlacingOrder(true);
    const {
      customer_name,
      address,
      new_address,
      mail,
      phone_number,
      location,
    } = customerDetails;

    const response = await fetch(
      "http://localhost/dawn-crackers/public/api/dawnOrderCheckout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_name,
          address,
          new_address,
          mail,
          phone_number,
          location,
          products: cart,
          customer_id: customerId,
        }),
      }
    );

    const data = await response.json();
    setTimeout(() => {
      setPlacingOrder(false);
      if (data.status === "success") {
        toast.success("Order placed successfully!");
        setCart([]);
        setQuantities(
          products.reduce((acc, product) => {
            acc[product.id] = 0;
            return acc;
          }, {})
        );
        setCustomerDetails({
          customer_name: "",
          address: "",
          new_address: "",
          mail: "",
          phone_number: "",
          location: "",
        });
        localStorage.setItem("customer_name", customer_name);
      } else {
        toast.error("Failed to place order: " + data.message);
      }
    }, 3000);
  };

  const handleConfirmOrderClick = () => {
    if (checkoutRef.current) {
      checkoutRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const totalPrice = cart.reduce((acc, product) => acc + product.total, 0);

  if (loading) {
    return (
      <>
        <img src={"/assets/order-loading.gif"} alt="loading" />
      </>
    );
  }

  return (
    <>
      <ToastContainer />
      {placingOrder && (
        <div className="loading-overlay">
          <img src={"/assets/order-loading.gif"} alt="loading" />
        </div>
      )}
      <section className="quickorder-section" style={{ padding: '45px 0px' }}>
        <div className="container">
          <div className="row">
            <h2 className="quickorder-heading">Quick Order Form</h2>
            <p className="quickorder-heading-para">
              We don't sell or ship to cities where crackers are banned
            </p>
          </div>
          <div className="row">
            <div className="col-md-8">
              <Table id="product-list" striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Image</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>
                        <Zoom>
                          <img
                            src={product.image}
                            alt={product.title}
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "cover",
                            }}
                            loading="lazy"
                          />
                        </Zoom>
                      </td>
                      <td className="table-product-name">{product.title}</td>
                      <td>&#x20b9;{product.final_price}</td>
                      <td>
                        <input
                          type="number"
                          className="quantity-field"
                          value={quantities[product.id]}
                          min="1"
                          onChange={(e) =>
                            handleQuantityChange(
                              product.id,
                              parseInt(e.target.value)
                            )
                          }
                        />
                      </td>
                      <td>
                        &#x20b9;
                        {(product.final_price * quantities[product.id]).toFixed(
                          2
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <div className="col-md-4">
              <h4 className="order-summary-title">Order Summary</h4>
              {cart.length > 0 ? (
                <>
                  <ul id="cart-list" className="list-group">
                    {cart.map((product) => (
                      <li
                        key={product.id}
                        className="list-group-item cart-item"
                      >
                        <FaRegTrashAlt
                          onClick={() => handleRemoveFromCart(product.id)}
                        />
                        <Zoom>
                          <img
                            src={product.image}
                            alt={product.title}
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "cover",
                              marginRight: "10px",
                            }}
                            loading="lazy"
                          />
                        </Zoom>
                        <div>x{product.quantity}</div>{" "}
                        <div>{product.title}</div> -{" "}
                        <div>&#x20b9;{product.total.toFixed(2)}</div>
                      </li>
                    ))}
                  </ul>
                  <hr className="cart-hr"></hr>
                  <div className="cart-total">
                    <div>Total Price:</div>{" "}
                    <div>&#x20b9;{totalPrice.toFixed(2)}</div>
                  </div>
                  <button
                    className="btn btn-primary checkout-button"
                    onClick={handleConfirmOrderClick}
                  >
                    Confirm Order
                  </button>
                </>
              ) : (
                <div>Cart empty</div>
              )}
            </div>
          </div>
        </div>
      </section>
      {cart.length > 0 && (
        <section
          className="quickorder-checkout"
          id="checkout"
          ref={checkoutRef}
        >
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="cart-list">
                  <h4>Customer Details</h4>
                  <form>
                    <div className="form-group">
                      <label htmlFor="customer_name">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="customer_name"
                        name="customer_name"
                        value={customerDetails.customer_name}
                        onChange={handleCustomerDetailsChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="address">Address</label>
                      <select
                        className="form-control"
                        id="address"
                        name="address"
                        value={customerDetails.address}
                        onChange={handleAddressChange}
                        required
                      >
                        <option value="">Select Address</option>
                        {addresses.map((address) => (
                          <option
                            key={address.address_id}
                            value={address.address_id}
                          >
                            {address.address}
                          </option>
                        ))}
                        <option value="add_new">Add Address</option>
                      </select>
                      {showNewAddressInput && (
                        <input
                          type="text"
                          className="form-control mt-2"
                          id="new_address"
                          name="new_address"
                          value={customerDetails.new_address}
                          onChange={handleCustomerDetailsChange}
                          placeholder="Enter New Address"
                          required
                        />
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="mail">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="mail"
                        name="mail"
                        value={customerDetails.mail}
                        onChange={handleCustomerDetailsChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone_number">Phone Number</label>
                      <input
                        type="text"
                        className="form-control"
                        id="phone_number"
                        name="phone_number"
                        value={customerDetails.phone_number}
                        onChange={handleCustomerDetailsChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="location">Location</label>
                      <input
                        type="text"
                        className="form-control"
                        id="location"
                        name="location"
                        value={customerDetails.location}
                        onChange={handleCustomerDetailsChange}
                        required
                      />
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-md-6">
                <div className="cart-price-listing">
                  <h4>Order Summary</h4>
                  <ul className="list-group">
                    {cart.map((product) => (
                      <li
                        key={product.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <div>{product.title}</div>
                        <div>x{product.quantity}</div>
                        <div>&#x20b9;{product.total.toFixed(2)}</div>
                      </li>
                    ))}
                  </ul>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <div>Subtotal:</div>
                    <div>&#x20b9;{totalPrice.toFixed(2)}</div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div>Total:</div>
                    <div>&#x20b9;{totalPrice.toFixed(2)}</div>
                  </div>
                  <button
                    className="btn btn-primary mt-3 checkout-button"
                    onClick={handleCheckout}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ProductList;
