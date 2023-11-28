import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

import { AuthenticationContainer } from "./signup.styles";

const SignUp = () => {
  return (
    <AuthenticationContainer>
      <SignUpForm />
    </AuthenticationContainer>
  );
};

export default SignUp;
