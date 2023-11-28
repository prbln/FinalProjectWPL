import { useContext, useEffect, useState } from "react";

import { CartContext } from "../../contexts/cart.context";

import {
  AdminTable,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  Total,
} from "./admin.styles";
import InventoryItem from "../../components/inventory-item/inventory-item.component";
import Button from "../../components/button/button.component";

const Admin = () => {
  const [categories, setcategories] = useState([]);
  const [newItem, setNewItem] = useState(false);
  useEffect(() => {
    const getAllThemes = async () => {
      const data = await fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((themes) => {
          themes.push({
            id: themes.length + 1,
            title: "New Item Title",
            price: "New Item price",
            category: "New Item category",
            description: "New Item description",
            image: "...",
          });
          setcategories(themes);
        });
    };
    getAllThemes();
  }, []);
  return (
    <>
      <AdminTable>
        <TableHeader>
          <TableRow>
            <TableCell>Index</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Edit Description</TableCell>
            <TableCell>Edit Quantity</TableCell>
            <TableCell>Edit Price</TableCell>
            <TableCell>Delete</TableCell>
            <TableCell>Save Changes</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((cartItem) => (
            <InventoryItem
              key={cartItem.id}
              cartItem={cartItem}
              lastItem={categories.length == cartItem.id ? true : false}
            />
          ))}
        </TableBody>
      </AdminTable>
    </>
  );
};

export default Admin;
