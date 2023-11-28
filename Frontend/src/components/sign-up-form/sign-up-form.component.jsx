import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import { SignUpContainer } from "./sign-up-form.styles";

const defaultFormFields = {
  name: "",
  username: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { name, username, password, confirmPassword, address, pnumber } =
    formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form action="http://localhost:8000/signup" method="post">
        <FormInput
          type="text"
          required
          onChange={handleChange}
          placeholder="Name"
          name="name"
          value={name}
        />

        <FormInput
          placeholder="Email"
          type="email"
          required
          onChange={handleChange}
          name="username"
          value={username}
          pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
          title="Enter a valid email address"
        />
        <FormInput
          placeholder="Phone Number"
          type="tel"
          required
          onChange={handleChange}
          name="phone"
          value={pnumber}
          pattern="^[0-9]+$"
          title="Numbers only"
        />
        <FormInput
          placeholder="Address"
          type="text"
          required
          onChange={handleChange}
          name="address"
          value={address}
          pattern="^[a-zA-Z0-9, \-]+$"
          title="No special characters allowed (white spaces, commas, hyphen(-) are allowed)"
        />
        <FormInput
          placeholder="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <FormInput
          placeholder="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit">Sign Up</Button>
        <a href="/signin">Already have an account? Sign In here. </a>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
