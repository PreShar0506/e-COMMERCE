// src/pages/Cart.jsx
import React,{ useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";
import axios from 'axios';
import formatPrice from "../utils/formatPrice";
import Button from "../components/common/Button";
 
const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  const API_URL = 'http://localhost:9000/api/v1';
  const user=JSON.parse(sessionStorage.getItem('user'));
      console.log("user",user);
      const loadProduct = async () => {
        const data = await axios.post(`${API_URL}/orders/get/cart`,{user:user.email})//working 
        console.log("data",data.data);
      };
      useEffect(() => {loadProduct(); }, [user.email]);
  const handleCheckout = () => {
    navigate("/checkout");
  };
const handleReview=()=>{
  navigate("/review");
}
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div>
        <h2>Your Cart is Empty</h2>
        <Link to="/">Go to Products</Link>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ color: "#6fcaac" }}>Your Cart</h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          color: "#6fcaac",
          border: "1px solid",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                borderBottom: "1px solid #ddd",
                padding: "10px",
                border: "1px solid",
              }}
            >
              Product
            </th>
            <th
              style={{
                borderBottom: "1px solid #ddd",
                padding: "10px",
                border: "1px solid",
              }}
            >
              Price
            </th>
            <th
              style={{
                borderBottom: "1px solid #ddd",
                padding: "10px",
                border: "1px solid",
              }}
            >
              Quantity
            </th>
            <th
              style={{
                borderBottom: "1px solid #ddd",
                padding: "10px",
                border: "1px solid",
              }}
            >
              Total
            </th>
            <th
              style={{
                borderBottom: "1px solid #ddd",
                padding: "10px",
                border: "1px solid",
              }}
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td
                style={{
                  padding: "20px",
                  border: "1px solid",
                  textAlign: "center",
                }}
              >
                {item.name}
              </td>
              <td
                style={{
                  padding: "20px",
                  border: "1px solid",
                  textAlign: "center",
                }}
              >
                {formatPrice(item.price)}
              </td>
              <td
                style={{
                  padding: "20px",
                  border: "1px solid",
                  textAlign: "center",
                }}
              >
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>//integrate api into it as well
                    updateQuantity(item.id, parseInt(e.target.value))
                  }
                  style={{ width: "60px" }}
                />
              </td>
              <td
                style={{
                  padding: "20px",
                  border: "1px solid",
                  alignItems: "center",
                }}
              >
                {formatPrice(item.price * item.quantity)}
              </td>
              <td style={{ padding: "10px" }}>
                <Button
                  style={{ marginRight: "20px" }}
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </Button>

                {/* <Button
                  style={{ marginRight: "20px" }}
                  onClick={() => saveFromCart(item.id)}
                >
                  Save for later
                </Button> */}
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 style={{ color: "#6fcaac" }}>Total: {formatPrice(totalPrice)}</h3>
     
      <Button
        onClick={clearCart}
        className="button"
        style={{ marginLeft: "20px" }}
      >
        Clear Cart
      </Button>
      <Button onClick={handleReview}
      className="button"
      style={{ marginLeft: "20px" }}
      >Review Cart
      </Button>
    </div>
  );
};

export default Cart;
