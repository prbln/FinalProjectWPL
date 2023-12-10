import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import {
  ProductCartContainer,
  Footer,
  Name,
  Price,
} from "./product-card.styles";

const ProductCard = ({ product }) => {
  const {
    Item_Name: name,
    Item_Price: price,
    Item_Image_Url: imageUrl,
  } = product;
  const newCartObj = {
    name: product.Item_Name,
    imageUrl: product.Item_Image_Url,
    description: product.Description,
    price: product.Item_Price,
    quantity: product.Item_Qty,
    id: product._id,
  };

  const { addItemToCart } = useContext(CartContext);

  const addProductToCart = () => addItemToCart(newCartObj);

  return (
    <ProductCartContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to cart
      </Button>
    </ProductCartContainer>
  );
};

export default ProductCard;
