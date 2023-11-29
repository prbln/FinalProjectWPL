// OrderDetails.jsx

import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../../contexts/cart.context";
import { UserContext } from "../../contexts/user.context";
import Button from "../button/button.component";
import "./order-details.css";

const OrderDetails = ({ orderDetails }) => {
  const { orderID } = useParams();
  let currentdate = new Date();
  console.log(currentdate.toLocaleString(), "Date");
  const { currentUser } = useContext(UserContext);

  console.log(orderID, "params");
  // TODO 01. Commont this line below instead of taking items from cart context, query from table, orderId is accessible in above variable

  const { cartItems, cartCount, cartTotal } = useContext(CartContext);

  const OrderItem = ({ index, item }) => (
    <div className="order-item">
      <p>
        <strong>
          {index}. {item.name}
        </strong>
        | <strong>Price:</strong> ${item.price} | <strong>Quantity:</strong>{" "}
        {item.quantity}
      </p>
    </div>
  );

  return (
    <div className="order-details-container">
      <h2>Your Order Details</h2>
      <div className="order-details">
        <p>
          <strong>Name:</strong> {currentUser.user.name}
        </p>
        <p>
          <strong>Products Ordered:</strong>
          {cartItems.map((item, index) => (
            <OrderItem index={index + 1} item={item} />
          ))}
        </p>
        <p>
          <strong>Total Price: </strong>${cartTotal}
        </p>
        <p>
          <strong>Order Date and Time: </strong>
          {currentdate.toLocaleString()}
        </p>
        <p>
          <strong>Shipping Address:</strong> {currentUser.user.address}
        </p>
      </div>

      <Button>Print Recipt</Button>
    </div>
  );
};

export default OrderDetails;
