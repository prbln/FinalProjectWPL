import { useNavigate } from "react-router-dom";
import {
  BackgroundImage,
  Body,
  DirectoryItemContainer,
} from "./directory-item.styles";

const DirectoryItem = ({ category: categories }) => {
  const navigate = useNavigate();
  const { image, title } = categories;
  return (
    <DirectoryItemContainer>
      <BackgroundImage imageUrl={image} />
      <Body onClick={(e) => navigate(`/shop/hats`)}>
        <h2>{title.substring(0, 15)}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
