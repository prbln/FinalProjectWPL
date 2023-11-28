import SignInForm from "../../components/sign-in-form/sign-in-form.component";

import { AuthenticationContainer } from "./signin.styles";

const SignIn = () => {
  return (
    <AuthenticationContainer>
      <SignInForm />
    </AuthenticationContainer>
  );
};

export default SignIn;
