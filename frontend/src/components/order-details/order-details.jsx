// OrderDetails.jsx

import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { CartContext } from "../../contexts/cart.context";
import { UserContext } from "../../contexts/user.context";
import Button from "../button/button.component";
import "./order-details.css";

const OrderDetails = ({ orderDetails }) => {
  const { orderID } = useParams();
  const [orderDesc, setOrderDesc] = useState({});
  let currentdate = new Date();
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  let total = 0;

  const { cartItems, cartCount, cartTotal, resetCart } = useContext(CartContext);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/orderDetails/${orderID}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          setOrderDesc(data);
        } else {
          console.error(`Failed to fetch order details. Status: ${response.status}`);
          // Handle the error or show a user-friendly message
        }
      } catch (error) {
        console.error('Failed to fetch order details', error);
      }
    };

    // Call the fetch function when the component mounts
    fetchOrderDetails();
  }, [orderID]); // Include orderID as a dependency


  // Calculate cart total
  Object.values(orderDesc).forEach((value) => {
    total += value.price * value.quantity;
  });
  

  const OrderItem = ({ index, item }) => (
    <div className="order-item">
      <p>
        <strong>
          {index}. {item.product_name}
        </strong>
        | <strong>Price:</strong> ${item.price} | <strong>Quantity:</strong>{" "}
        {item.quantity}
      </p>
    </div>
  );

  const backToHome = () => {
    // Call resetCart to clear the cart
    resetCart();
    navigate('/');
  };

  return (
    <div className="order-details-container">
      <h2>Your Order Details</h2>
      <div className="order-details">
        <p>
          <strong>Name:</strong> {currentUser.user.name}
        </p>
        <p>
          <strong>Products Ordered:</strong>
          {Object.values(orderDesc)?.map((item, index) => (
            <OrderItem index={index+1} item={item} />
          ))}
        </p>
        <p>
          <strong>Total Price: </strong> ${total}
        </p>
        <p>
          <strong>Order Date and Time: </strong>
          {currentdate.toLocaleString()}
        </p>
        <p>
          <strong>Shipping Address:</strong> {currentUser.user.address}
        </p>
      </div>

      <Button onClick={backToHome}>Back to Home</Button>
    </div>
  );
};

export default OrderDetails;
