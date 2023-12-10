import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { SignUpContainer } from "./sign-up-form.styles";

const defaultFormFields = {
  name: "",
  username: "",
  password: "",
  confirmPassword: "",
  address: "",
  phone: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [strongPass, setStrongPass] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [validPhone, setValidPhone] = useState(true);
  const [validAddress, setValidAddress] = useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const { name, username, password, confirmPassword, address, phone } = formFields;
  const navigate = useNavigate();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
    setStrongPass(true);
    setValidEmail(true);
    setValidPhone(true);
    setValidAddress(true);
    setPasswordsMatch(true);
  };

  const isStrongPassword = (password) => {
    const minLength = 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialCharacters = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);

    const isStrong =
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialCharacters;

    return isStrong;
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPhoneValid = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const isAddressValid = (address) => {
    const addRegex=/^[@~#a-zA-Z0-9, \-]+$/;
    return addRegex.test(address);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return ;
    }

    if (!isStrongPassword(password)) {
      setStrongPass(false);
      return;
    }

    if (!isEmailValid(username)) {
      setValidEmail(false);
      return;
    }

    if (!isPhoneValid(phone)) {
      setValidPhone(false);
      return;
    }

    if (!isAddressValid(address)) {
      setValidAddress(false);
      return;
    }

    // Continue with the existing submit logic
    fetch("http://localhost:8000/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        username: username,
        phone: phone,
        password: password,
        confirmPassword: confirmPassword,
        address: address,
      }),
    }).then(async (res) => {
      if (res.status === 200) {
        const orderId = await res.json();
        alert("Account Successfully Created!");
        navigate(`/signin`);
      } else if (res.status === 409) {
        const err = await res.json();
        alert(err.error.message);
        resetFormFields();
      }
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });

    if (name === "username") {
      setValidEmail(true);
    } else if (name === "phone") {
      setValidPhone(true);
    } else if (name === "address") {
      setValidAddress(true);
    }
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form>
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
        />
        {!validEmail && (
          <p style={{ color: "red" }}>Please enter a valid email address.</p>
        )}

        <FormInput
          placeholder="Phone Number"
          type="tel"
          required
          onChange={handleChange}
          name="phone"
          value={phone}
        />
        {!validPhone && (
          <p style={{ color: "red" }}>Please enter a valid phone number.(Numbers Only)</p>
        )}

        <FormInput
          placeholder="Address"
          type="text"
          required
          onChange={handleChange}
          name="address"
          value={address}
        />
        {!validAddress && (
          <p style={{ color: "red" }}>Please enter a valid address.(Special characters not allowed. Allowed characters whitespace,comma,hyphen(-))</p>
        )}

        <FormInput
          placeholder="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        {!strongPass && (
          <p style={{ color: "red" }}>
            Password is not strong enough. Password should be - <br /> At least 6
            characters long <br /> Contain at least one uppercase letter <br />
            Contain at least one lowercase letter <br /> Contain at least one
            digit <br /> Contain at least one special character
          </p>
        )}

        <FormInput
          placeholder="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

      {!passwordsMatch && (
                <p style={{ color: "red" }}>
                  Passwords Don't Match.
                </p>
              )}

        <Button type="submit" onClick={(e) => handleSubmit(e)}>
          Sign Up
        </Button>
        <a href="/signin">Already have an account? Sign In here. </a>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
