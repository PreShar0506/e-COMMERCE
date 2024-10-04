// src/context/CartContext.jsx
import React, { createContext, useState} from "react";
import axios from 'axios';
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const initialCart = JSON.parse(localStorage.getItem("cart")) || [];
  const [cartItems, setCartItems] = useState(initialCart);
  


  const addToCart = async (product, quantity = 1) => {
const API_URL = 'http://localhost:9000/api/v1';
const user=JSON.parse(sessionStorage.getItem('user'));
      console.log("user",user);
  
try {
  const updatedCart = await new Promise((resolve) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      let newCart;
      if (existing) {
        newCart = prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newCart = [...prevItems, { ...product, quantity }];
      }
      resolve(newCart);
      return newCart;
    });
  });

  // Prepare the data for the API call
  const { image, ...productWithoutImage } = product;
  const updatedItem = updatedCart.find(item => item.id === product.id);
  const itemQuantity = updatedItem ? updatedItem.quantity : quantity;
  const totalPrice = itemQuantity * product.price;

  const cartItems ={
    product: product.id,
    quantity: itemQuantity,
    name: product.name,
    price: product.price,
    totalPrice: totalPrice,  // Add the calculated total price
    user: user.email
  };
  console.log("cartItems",cartItems);

  const response = await axios.post(`${API_URL}/orders/cart`, cartItems );
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  return response.data;
} catch (error) {
  console.error("Error adding to cart:", error);
  throw error;
}
};

 
  
  const removeFromCart = async (productId) => {
    const API_URL = 'http://localhost:9000/api/v1';
    console.log("pid",productId);
    const user=JSON.parse(sessionStorage.getItem('user'));
    console.log("user",user.email);
    const body={user:user.email};
    console.log("bo",body);
    try {
      //First, update the local state
      const updatedCart = await new Promise((resolve) => {
        setCartItems((prevItems) => {
          const newCart = prevItems.filter((item) => item.id !== productId);
          resolve(newCart);
          return newCart;
        });
      });
        console.log("updatedcart", updatedCart);
             
      if(cartItems.length > 0){
        const res = await axios.post(`${API_URL}/orders/deletecart/${productId}`, body);
        console.log("Delete response:", res.data);
      }
      // Update localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      } catch (error) {
      console.error("Error removing item from cart:", error);
      // Handle the error appropriately (e.g., show an error message to the user)
    }
  };
  const clearCart = async () => {
    const API_URL = 'http://localhost:9000/api/v1';
    const user = JSON.parse(sessionStorage.getItem('user'));
    const body = { user: user.email };

    try {
        const res = await axios.post(`${API_URL}/orders/delete/cart/all`, body);
        console.log("data ", res.data);
        if (res.data.success) {
            setCartItems([]); // Clear the cart items in state
            localStorage.removeItem("cart"); // Clear the cart in local storage
        } else {
            console.error("Error:", res.data.message);
        }
    } catch (error) {
        console.error("Error deleting cart items:", error.response?.data || error.message);
    }
};



  const updateQuantity = (productId, quantity) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
