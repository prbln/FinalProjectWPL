import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { useNavigate } from "react-router-dom";

import { SignUpContainer } from "./sign-up-form.styles";

const defaultFormFields = {
  name: "",
  username: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [strongPass, setStorngPass] = useState(true);
  const { name, username, password, confirmPassword, address, phone } =
    formFields;
  const navigate = useNavigate();
  const resetFormFields = () => {
    setFormFields(defaultFormFields);

    setStorngPass(true);
  };
  const isStrongPassword = (password) => {
    // Define the rules for a strong password
    const minLength = 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialCharacters = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(
      password
    );

    // Check if the password meets all criteria
    const isStrong =
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialCharacters;

    return isStrong;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }

    if (!isStrongPassword(password)) {
      setStorngPass(!strongPass);
    } else {
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
        if (res.status == 200) {
          const orderId = await res.json();
          alert("Account Successfully Created!");
          navigate(`/signin`);
        }
        if (res.status == 409) {
          const err = await res.json();
          alert(err);
          resetFormFields();
        }
      });
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
          pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
          title="Enter a valid email address"
        />
        <FormInput
          placeholder="Phone Number"
          type="tel"
          required
          onChange={handleChange}
          name="phone"
          value={phone}
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
        {!strongPass && (
          <p style={{ color: "red" }}>
            Password is not string enough. Password should be - <br /> Atleast 6
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
        <Button type="submit" onClick={(e) => handleSubmit(e)}>
          Sign Up
        </Button>
        <a href="/signin">Already have an account? Sign In here. </a>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
