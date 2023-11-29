import React, { useState } from "react";
import "./filter.styles.css";
const FilterComponent = ({ products, setProducts }) => {
  const [priceRange, setPriceRange] = useState("");
  const [sortBy, setSortBy] = useState("");

  const handlePriceRangeChange = (e) => {
    setPriceRange(e.target.value);
    const filteredProducts = products?.filter(
      (item) => item.Item_Price < e.target.value
    );
    if (products) {
      setProducts(filteredProducts);
    }
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
    e.target.value == "price-desc"
      ? setProducts(
          products.slice().sort((a, b) => b.Item_Price - a.Item_Price)
        )
      : setProducts(
          products.slice().sort((a, b) => a.Item_Price - b.Item_Price)
        );
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
          max="200"
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
