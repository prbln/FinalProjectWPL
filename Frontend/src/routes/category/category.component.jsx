import { useContext, useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import FilterComponent from "../../components/filter/filter.component";

import ProductCard from "../../components/product-card/product-card.component";

import { CategoriesContext } from "../../contexts/categories.context";

import { CategoryContainer, Title } from "./category.styles";

const Category = () => {
  const { category } = useParams();

  // const { categoriesMap } = useContext(CategoriesContext);

  useEffect(async () => {
    try {
      fetch(`http://localhost:8000/themes/${category}`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          setFilterProducts(data);
          console.log("data", data);
        });
    } catch (error) {
      console.log("user sign in failed", error);
    }
  }, []);

  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState(products);
  // useEffect(() => {
  //   setProducts(categoriesMap[category]);
  // }, [category, categoriesMap]);

  return (
    <Fragment>
      <Title>{category.toUpperCase()}</Title>
      <FilterComponent products={products} setProducts={setFilterProducts} />
      <CategoryContainer>
        {filterProducts &&
          filterProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </CategoryContainer>
    </Fragment>
  );
};

export default Category;
