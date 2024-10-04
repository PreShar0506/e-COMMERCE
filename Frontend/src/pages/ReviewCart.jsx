import axios from 'axios';
import React, { useEffect,useState} from "react";
import formatPrice from "../utils/formatPrice";
import useCart from "../hooks/useCart";
import { useNavigate } from 'react-router-dom';
import Button from "../components/common/Button";
const ReviewCart = () => {
  const API_URL = 'http://localhost:9000/api/v1';
    const { cartItems} = useCart();
    //const [cart,setcart]=useState([]);
    const totalPrice = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,0);

      const user=JSON.parse(sessionStorage.getItem('user'));
      console.log("user",user);
      const navigate = useNavigate();
      const handleCheckout = () => {
        if(user !== null)
        navigate("/checkout");
    else
    navigate("/login")
      };
    
    return (
    <div>
    <div>
    <h1>Invoice</h1>
    <hr></hr>
    {cartItems.map((item) => ( // i amm not able to use data.data .item to retrieve from database 
           <div key={item.id}> 
           <p>Item name  : {item.name}</p>  
           <p>Price: {formatPrice(item.price)}</p>
           <p>Quantity : {item.quantity}</p>    
           {/* <p>Total price : {formatPrice(item.price * item.quantity)}</p>  
           <p>Quantity : {item.quantity}</p>   */}
           <hr/>
            </div>
        ))}
<h5 style={{ color: "#6fcaac" }}>Total: {formatPrice(totalPrice)}</h5>
    </div>   
    <Button onClick={handleCheckout}>Proceed to Checkout</Button> 
    </div>

  )
}

export default ReviewCart