// src/pages/Checkout.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";
import Input from "../components/common/Input";
import formatPrice from "../utils/formatPrice";
import Button from "../components/common/Button";
import { validateEmail } from "../utils/validators"; // Removed unused import
import axios from 'axios';
import {loadStripe} from '@stripe/stripe-js';
const API_URL = 'http://localhost:9000/api/v1';
const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [disabled, setDisabled] = useState(true);
  //console.log("cart items",cartItems)
  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,0);

  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure name and value
    setForm({ ...form, [name]: value }); // Update state based on name
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required.";
    if (!form.email) {
      newErrors.email = "Email is required.";
    } else if (!validateEmail(form.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!form.address) newErrors.address = "Address is required.";
    return newErrors;
  };
  
const makePayment = async () => {
  const user=JSON.parse(sessionStorage.getItem('user'));//we are getting the cart items over here
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log('cart items---',cartItems)
      // In a real app, you'd process the order here
      const body={orderItems:cartItems ,
        name:form.name,
        email:form.email,
        address:form.address,
        totalPrice,
        user:user.email
      }
      console.log("body",body);
      const response = await axios.post(`${API_URL}/orders/finalorder`,body);
      console.log('order response',response.data);
      setDisabled(false);
      clearCart();
    }
  console.log('cart items', cartItems)
  console.log("form",form);
  localStorage.removeItem('checkout');
  localStorage.setItem('checkout', JSON.stringify(form));
  const stripe = await loadStripe("pk_test_51Q5XF9C8E2sTJPvJynRNjnK5mPncF9r8tLZ1JNqdED2jSzQZ2edbvR6da2ES7S7BHoPkbYOWDWX1tNH7Z3FBSbky009wdiTjFC");
    const body = {
      products:cartItems
    }
  const headers = {
    "Content-Type" : "application/json"
  }
  const response = await fetch(`${API_URL}/orders/create-checkout-session`,{
      method : "POST",
      headers : headers,
      body : JSON.stringify(body)
  })
  const session = await response.json();
  const result = await stripe.redirectToCheckout({
    sessionId : session.id
  })

  if (result.error) {
    console.error('Stripe redirect error:', result.error.message);
  }
    
}

const handleSubmit = async() => {
//can i call make payment here check

    //e.preventDefault();
    
  };

  // if (orderPlaced) {
  //   return (
  //     <div>
  //       <h2>Thank You for Your Purchase!</h2>
  //       <p>Your order has been placed successfully.</p>
  //       <Button onClick={() => navigate("/")}>Continue Shopping</Button>
  //     </div>
  //   );
  // }

  // if (cartItems.length === 0) {
  //   return (
  //     <div>
  //       <h2>Your Cart is Empty</h2>
  //       <Button onClick={() => navigate("/")}>Go to Products</Button>
  //     </div>
  //   );
  // }

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h2>Checkout</h2>
      <h3 style={{ color: "#6fcaac" }}>Total: {formatPrice(totalPrice)}</h3>
      <form >
        <Input
          label="Name"
          name="name" // Ensure name prop is passed
          value={form.name}
          onChange={handleChange}
          placeholder="Your full name"
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        <Input
          label="Email"
          name="email" // Ensure name prop is passed
          value={form.email}
          onChange={handleChange}
          type="email"
          placeholder="you@example.com"
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        <Input
          label="Address"
          name="address" // Ensure name prop is passed
          value={form.address}
          onChange={handleChange}
          placeholder="Your shipping address"
        />
        {errors.address && <p style={{ color: "red" }}>{errors.address}</p>}
        <button type="button" className="button" onClick={makePayment}>Proceeed to pay</button>
        {/* <Button type="button" onClick={handleSubmit}>Save</Button> */}

      </form>
    </div>
  );
};

export default Checkout;
