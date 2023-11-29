import { useContext, useState } from "react";

import { CartContext } from "../../contexts/cart.context";
import Button from "../button/button.component";

import {
  TableRow,
  TableCell,
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from "./inventory-item.styles";
let count = 0;
const InventoryItem = ({ cartItem, lastItem }) => {
  count += 1;
  const {
    _id: id,
    Item_Name: title,
    Item_Image_Url: image,
    Item_Price: price,
    Item_Qty: stock,
  } = cartItem;

  const [newtitle, setNewTitle] = useState(title);
  const [newprice, setNewPrice] = useState(price);
  const [newstock, setNewStock] = useState(stock);
  // update

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleStockChange = (e) => {
    setNewStock(e.target.value);
  };
  const handlePriceChange = (e) => {
    setNewPrice(e.target.value);
  };
  const onSaveChanges = (id, newprice, newstock, newtitle) => {
    console.log(id, newprice, newstock, newtitle);
  };
  const addNewItems = (id, newprice, newstock, newtitle) => {
    console.log(id, newprice, newstock, newtitle);
  };
  return (
    <TableRow>
      <TableCell>{count / 2}</TableCell>
      <TableCell>
        <img src={image} alt={`${title}`} width={"200px"} />
      </TableCell>
      <TableCell>
        <input value={newtitle} onChange={handleTitleChange} />
      </TableCell>
      <TableCell>
        <Quantity>
          <input value={newstock} onChange={handleStockChange} />
        </Quantity>
      </TableCell>

      <TableCell>
        <Quantity>
          <input value={newprice} onChange={handlePriceChange} />
        </Quantity>
      </TableCell>
      <TableCell>
        <RemoveButton>&#10005;</RemoveButton>
      </TableCell>
      <TableCell>
        {lastItem ? (
          <button onClick={() => addNewItems(id, newprice, newstock, newtitle)}>
            Add new item
          </button>
        ) : (
          <button
            onClick={() => onSaveChanges(id, newprice, newstock, newtitle)}
          >
            Save
          </button>
        )}
      </TableCell>
    </TableRow>
    // <CheckoutItemContainer>
    //   <ImageContainer>
    //     <img src={image} alt={`${title}`} />
    //   </ImageContainer>
    //   <BaseSpan> {title} </BaseSpan>
    //   <Quantity>
    //     <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
    //     <Value>{quantity}</Value>
    //     <Arrow onClick={addItemHandler}>&#10095;</Arrow>
    //   </Quantity>
    //   <BaseSpan> {price}</BaseSpan>
    //   <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    //   <Button>Save Changes</Button>
    // </CheckoutItemContainer>
  );
};

export default InventoryItem;
