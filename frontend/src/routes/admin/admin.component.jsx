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
import { useNavigate } from "react-router-dom";
import Unauthorised from "../../components/Unauthorised/unauthorised";
import { UserContext } from "../../contexts/user.context";

const Admin = () => {
  const [categories, setcategories] = useState([]);
  const [newItem, setNewItem] = useState(false);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const isadmin = currentUser?.admin;
  const navigate = useNavigate();

  useEffect(() => {
    const getAllThemes = async () => {
      const data = await fetch("http://localhost:8000/allproducts")
        .then((res) => res.json())
        .then((themes) => {
          setcategories(themes);
        });
    };
    getAllThemes();
  }, []);

  const addnewItem = () => {
    navigate("/addNewItem");
  };
  return (
    <>
      {currentUser?.user.admin ? (
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
            {categories.map((cartItem, ind) => (
              <InventoryItem
                key={cartItem.id}
                cartItem={cartItem}
                index={ind}
              />
            ))}
          </TableBody>
          <Button onClick={addnewItem}>Add New Item</Button>
        </AdminTable>
      ) : (
        <Unauthorised />
      )}
    </>
  );
};

export default Admin;
