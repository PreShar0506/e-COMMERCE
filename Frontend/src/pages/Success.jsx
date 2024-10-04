import React, { useEffect } from 'react'
import useCart from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Success = () => {
  const API_URL = 'http://localhost:9000/api/v1';
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,0);
    const form = JSON.parse(localStorage.getItem('checkout'));
  return (
    <div>Success</div>
  )
}

export default Success