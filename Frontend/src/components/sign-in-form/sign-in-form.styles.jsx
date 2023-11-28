import styled from "styled-components";

export const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  border: 2px solid #ccc;
  padding: 20px; /* Add some padding to the form */
  border-radius: 8px; /* Add rounded corners to the border */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  h2 {
    margin: 10px 0;
  }
  a:hover {
    text-decoration: underline; /* Underline the text on hover */
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;
