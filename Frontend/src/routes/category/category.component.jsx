import { useContext, useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import FilterComponent from "../../components/filter/filter.component";

import ProductCard from "../../components/product-card/product-card.component";

import { CategoriesContext } from "../../contexts/categories.context";

import { CategoryContainer, Title } from "./category.styles";


const Category = () => {
  const { category } = useParams();
  // const { categoriesMap } = useContext(CategoriesContext);
  useEffect((category)=>{
    try {
      fetch(`http://localhost:8000/themes/${category.id}`)
        .then((res) => console.log(res.json()))
        .then((statusCode) => console.log(statusCode))
    } catch (error) {
      console.log("user sign in failed", error);
    }
  },[])

  const [products, setProducts] = useState(categoriesMap[category]);
  const [filterProducts, setFilterProducts] = useState(products);
  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <Title>{category.toUpperCase()}</Title>
      <FilterComponent
        products={categoriesMap[category]}
        setProducts={setProducts}
      />
      <CategoryContainer>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CategoryContainer>
    </Fragment>
  );
};

export default Category;
