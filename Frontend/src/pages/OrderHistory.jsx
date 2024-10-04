
import React, { useEffect,useState} from "react";
import formatPrice from "../utils/formatPrice";
import useCart from "../hooks/useCart";
import { useNavigate } from 'react-router-dom';
import Button from "../components/common/Button";

 import axios from 'axios';
 const API_URL = 'http://localhost:9000/api/v1';

// const OrderHistory = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     loadOrders();
//   }, []);

//   const loadOrders = async () => {
//     try {
//       const user = JSON.parse(sessionStorage.getItem('user'));
//       if (!user || !user.email) {
//         console.error('User not found in session storage');
//         setLoading(false);
//         return;
//       }
//       const userData={user:user.email}
//       const response = await axios.post(`${API_URL}/orders/get/usersorders/history`,  userData);
//       console.log("dataHistory", response.data);
//       setOrders(response.data);
//     } catch (error) {
//       console.error("Error fetching order history:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const pushBack = () => {
//     navigate("/");
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>Previous Orders</h1>
//       <hr />
//       {orders.length === 0 ? (
//         <p>No previous orders found.</p>
//       ) : (
//         orders.map((order) => (
//           <div key={order._id}>
//             <h2>Order ID: {order._id}</h2>
//             {order.orderItems.map((item) => (
//               <div key={item._id}>
//                 <p>Item name: {item.product.name}</p>
//                 <p>Price: {formatPrice(item.product.price)}</p>
//                 <p>Quantity: {item.quantity}</p>
//               </div>
//             ))}
//             <p>Order Date: {new Date(order.dateOrdered).toLocaleDateString()}</p>
//             <hr />
//           </div>
//         ))
//       )}
//       <Button onClick={pushBack}>Back</Button>
//     </div>
//   );
// };


// export default OrderHistory


//const API_URL = 'http://localhost:9000/api/v1';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      if (!user || !user.email) {
        console.error('User not found in session storage');
        setLoading(false);
        return;
      }
      const userData = { user: user.email };
      const response = await axios.post(`${API_URL}/orders/get/usersorders/history`, userData);
      console.log("dataHistory", response.data);//i dont know hoe to extract data over index
      setOrders(response.data.orders);
  
      //setProducts(response.data.products);
      
    } catch (error) {
      console.error("Error fetching order history:", error);
    } finally {
      setLoading(false);
    }
  };

  const pushBack = () => {
    navigate("/");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Previous Orders</h2>
      {orders.length === 0 ? (
        <p>No previous orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
            <h3>Order ID: {order._id}</h3>
            <h4>Items:</h4>
            {order.orderItems.map((item, index) => (
              <div key={index} style={{ marginLeft: "20px" }}>
                <p>Item name: {item.name}</p>
                <p>Price: {formatPrice(item.price)}</p>
                {/* <p>Quantity: {item.quantity}</p> */}
              </div>
            ))}
            <p>Order Date: {new Date(order.dateOrdered).toLocaleDateString()}</p>
          </div>
        ))
      )}
      <Button onClick={pushBack}>Back</Button>
    </div>
  );
};

export default OrderHistory;
