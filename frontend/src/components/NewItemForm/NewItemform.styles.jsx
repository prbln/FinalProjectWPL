import styled from "styled-components";

export const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 450px;
  border: 2px solid #ccc;
  padding: 20px; /* Add some padding to the form */
  border-radius: 8px; /* Add rounded corners to the border */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  h2 {
    margin: 10px 0;
  }
  Button {
    margin-bottom: 10px;
  }
  a:hover {
    text-decoration: underline; /* Underline the text on hover */
  }
`;
