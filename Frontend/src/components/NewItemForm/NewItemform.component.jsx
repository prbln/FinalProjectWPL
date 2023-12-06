import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { useNavigate } from "react-router-dom";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import { SignUpContainer } from "./NewItemform.styles";

const defaultFormFields = {
  imgUrl: "",
  itemQuant: "",
  price: "",
  category: "",
};

const NewItemForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { imgUrl, itemQuant, price, theme, itemName, itemDesc } = formFields;
  const navigate = useNavigate();
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch("http://localhost:8000/addNewItem", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formFields),
    }).then(async (res) => {
      if (res.status == 200) {
        alert("Item Added Successfully!");
        navigate(`/inventory`);
      }
      if (res.status == 409) {
        const err = await res.json();
        alert(err);
        resetFormFields();
      }
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <SignUpContainer>
      <h2>Add new Item</h2>
      <form>
        <FormInput
          type="text"
          required
          onChange={handleChange}
          placeholder="Item Name"
          name="itemName"
          value={itemName}
        />
        <FormInput
          type="text"
          required
          onChange={handleChange}
          placeholder="Item Description"
          name="itemDesc"
          value={itemDesc}
        />
        <FormInput
          type="text"
          required
          onChange={handleChange}
          placeholder="Image Url"
          name="imgUrl"
          value={imgUrl}
        />
        <FormInput
          type="text"
          required
          onChange={handleChange}
          placeholder="Item Quantity"
          name="itemQuant"
          value={itemQuant}
        />
        <FormInput
          type="text"
          required
          onChange={handleChange}
          placeholder="Price"
          name="price"
          value={price}
        />

        <select name="Theme" value={theme} onChange={handleChange} required>
          <option value="" disabled>
            Select a Theme
          </option>
          {["Spiderman", "Friends", "Naruto", "Kung Fu Panda", "Batman"].map(
            (option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            )
          )}
        </select>
        <Button type="submit" onClick={(e) => handleSubmit(e)}>
          Save to inventory
        </Button>
      </form>
    </SignUpContainer>
  );
};

export default NewItemForm;
