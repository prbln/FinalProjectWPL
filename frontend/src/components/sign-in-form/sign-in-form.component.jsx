import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { SignInContainer, ButtonsContainer } from "./sign-in-form.styles";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";

const defaultFormFields = {
  username: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { username, password } = formFields;
  const [displayError, setDisplayError] = useState(false);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const navigate = useNavigate();
  // const signInWithGoogle = async () => {
  //   await signInWithGooglePopup();
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Post API --> "user data"
      // await signInAuthUserWithEmailAndPassword(email, password);
      fetch("http://localhost:8000/signin", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      }).then(async (res) => {
        if (res.status == 200) {
          const data = await res.json();
          setCurrentUser(data);
          navigate("/");
        } else setDisplayError(true);
      });
      resetFormFields();
    } catch (error) {
      console.log("user sign in failed", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="email"
          placeholder="Email"
          required
          onChange={handleChange}
          name="username"
          value={username}
        />

        <FormInput
          placeholder="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        {displayError && (
          <p style={{ color: "red", textAlign: "center" }}>
            <b>Invalid login credentials</b>
          </p>
        )}
        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
        </ButtonsContainer>
        <a href="/signup">Don't have an account? Sign up</a>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
