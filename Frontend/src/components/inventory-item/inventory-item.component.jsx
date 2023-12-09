import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

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
const InventoryItem = ({ cartItem, index }) => {
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

  const navigate = useNavigate();
  const confirmDelete = () => {
    let text = "Are you sure you want to delete?";
    /* eslint-disable no-restricted-globals */
    return confirm(text);
    /* eslint-enable no-restricted-globals */
  };
  const deleteitem = (e) => {
    if (confirmDelete()) {
      fetch("http://localhost:8000/inventory", {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
        }),
      }).then((res) => {
        if (res.status == 200) {
          navigate("/inventory");
        } else {
          alert("Unable to delete item.");
        }
      });
    }
  };
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
    fetch("http://localhost:8000/inventory", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        Item_Price: newprice,
        Item_Qty: newstock,
        Item_Name: newtitle,
      }),
    }).then(async (res) => {
      if (res.status == 200) {
        alert("Item successfully updated! ");
      } else alert("Unable to update Item");
    });
  };
  const addNewItems = (id, newprice, newstock, newtitle) => {
    // TODO 03. Adding new items inventory
    console.log(id, newprice, newstock, newtitle);
  };
  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
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
        <RemoveButton onClick={() => deleteitem(id)}>&#10005;</RemoveButton>
      </TableCell>
      <TableCell>
        <Button onClick={() => onSaveChanges(id, newprice, newstock, newtitle)}>
          Save
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default InventoryItem;
