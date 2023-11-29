import { useContext, useState } from "react";

import { CartContext } from "../../contexts/cart.context";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from "./checkout.styles";
import Button from "../../components/button/button.component";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";

const Checkout = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    setCartItems,
    cartTotal,
    setCartTotal,
    cartCount,
    setCartCount,
  } = useContext(CartContext);
  console.log(setCartItems);
  const { currentUser } = useContext(UserContext);
  const handleOrderPlaced = () => {
    if (!currentUser) {
      alert("Please log in before placing an order");
      navigate("/signin");
    } else {
      fetch("http://localhost:8000/checkout", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItems),
      }).then(async (res) => {
        if (res.status == 200) {
          navigate("/orderDetails");
        } else {
          const errorMessage = await res.json();
          console.log(errorMessage);
          alert(errorMessage.error);
        }
      });
    }
  };
  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}

      <Total>
        Total: ${cartTotal}
        <Button onClick={(cartItems) => handleOrderPlaced(cartItems)}>
          Place Order
        </Button>
      </Total>
    </CheckoutContainer>
  );
};

export default Checkout;
