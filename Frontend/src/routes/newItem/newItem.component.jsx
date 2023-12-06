import NewItemForm from "../../components/NewItemForm/NewItemform.component";
import { AuthenticationContainer } from "./newItem.styles";

const NewItem = () => {
  return (
    <AuthenticationContainer>
      <NewItemForm />
    </AuthenticationContainer>
  );
};

export default NewItem;
