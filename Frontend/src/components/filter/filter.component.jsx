import React, { useState } from "react";
import "./filter.styles.css";
const FilterComponent = ({ products, setProducts }) => {
  const [priceRange, setPriceRange] = useState("");
  const [sortBy, setSortBy] = useState("");

  const handlePriceRangeChange = (e) => {
    setPriceRange(e.target.value);
    const filteredProducts = products?.filter(
      (item) => item.price < e.target.value
    );
    if (products) {
      setProducts(filteredProducts);
    }
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
    console.log(e.target.value);
    e.target.value == "price-desc"
      ? setProducts(products.slice().sort((a, b) => b.price - a.price))
      : setProducts(products.slice().sort((a, b) => a.price - b.price));
  };

  return (
    <div className="filter-container">
      {/* <label>Category:</label>
      <select //</div>value={selectedCategory} onChange={handleCategoryChange}>
      >
        <option value="">All</option>
        <option key="Tshirt">Tshirt</option>
        <option key="Shoes">Shoes</option>
        <option key="Bottle">Bottle</option>
        <option key="Bag">Bag</option>
      </select> */}
      <div>
        <label>Price Range:</label>
        <input
          type="range"
          min="0"
          max="30"
          step="1"
          value={priceRange}
          onChange={handlePriceRangeChange}
        />
        <span>${priceRange}</span>
      </div>
      <div>
        <label>Sort By:</label>
        <select value={sortBy} onChange={handleSortByChange}>
          <option value="price-asc">Price Low to High</option>
          <option value="price-desc">Price High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default FilterComponent;
