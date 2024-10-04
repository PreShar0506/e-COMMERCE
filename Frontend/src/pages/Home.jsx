// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { fetchImages } from "../services/api";
import ProductCard from "../components/ProductCard";
import axios from 'axios'

const Home = () => {
  const API_URL = 'http://localhost:9000/api/v1'
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);   
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

  const loadProducts = async () => {
    const images = await fetchImages();
    //console.log(images);
    const productList = await axios.get(`${API_URL}/products`)
    //console.log(productList);

    const mergedProductList = productList.data.map(product => {
      const productImage = images.find(image => image.name === product.name);
      return {
          ...product,
          image: productImage ? productImage.image : null,
      };
    });
    //console.log(mergedProductList);
      setLoading(false);
      setProducts(mergedProductList);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Products</h1>
        <input className="button"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ padding: "10px 15px" }}
          />
        <select onChange={handleCategoryChange} value={selectedCategory} className="button">
          <option value="All">All</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Unisex">Unisex</option>
        </select>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
