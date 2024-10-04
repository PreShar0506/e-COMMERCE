// src/components/Header.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";

const Header = () => {
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const isLoggedIn = sessionStorage.getItem('user') !== null;
  //console.log(isLoggedIn,"gjweh")
  const handleLogout = () => {
    // Clear the session storage
    sessionStorage.removeItem('user');
};
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart ({cartCount})</Link>
        <Link to="/OrderHistory">Order History</Link>
        {/* <Link to="/login">Login</Link> */}
     
        {isLoggedIn ? (
                <Link to="/" onClick={handleLogout}>Logout</Link>
            ) : (
                <Link to="/login">Login</Link>
            )}
      </nav>
    </header>
  );
};

export default Header;
