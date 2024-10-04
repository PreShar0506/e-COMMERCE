// src/pages/ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {fetchImages} from "../services/api";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import formatPrice from "../utils/formatPrice";
import useCart from "../hooks/useCart";
import Button from "../components/common/Button";

const ProductDetails = () => {
  const navigate=useNavigate();
  const API_URL = 'http://localhost:9000/api/v1'
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const loadProduct = async () => {
    const data = await axios.get(`${API_URL}/products/${id}`)
    const images = await fetchImages();
    console.log(images);
    const i = images.find(image =>image.name === data.data.name);
console.log(i);
    const productWithImage = {
      ...data.data,
      image: i ? i.image : null,
  };
  console.log(productWithImage);
    setProduct(productWithImage);
    setLoading(false);
  };

 
  

  if (loading) {
    return <p>Loading product...</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    navigate("/");
  };

  return (
    <div style={{ display: "flex", gap: "150px" }}>
      {/* Left side: Image gallery */}
      <div style={{ flex: 1 }}>
        <img
          src={selectedImage}
          alt={product.name}
          style={{
            borderRadius: "10px",
            width: "100%",
            height: "400px",
            objectFit: "cover",
            marginBottom: "20px",
          }}
        />
        <div style={{ display: "flex", gap: "10px", overflowX: "auto" }}>
          {product.image.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => setSelectedImage(img)}
              style={{
                cursor: "pointer",
                borderRadius: "5px",
                width: "80px",
                height: "80px",
                objectFit: "cover",
                border: selectedImage === img ? "2px solid blue" : "2px solid transparent",
              }}
            />
          ))}
        </div>
      </div>

      {/* Right side: Product details and reviews */}
      <div style={{ flex: 2, display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Product details */}
        <div>
          <h2>{product.name}</h2>
          <h3 style={{ marginTop: 0 }}>Rating: {product.rating} / 5</h3>
          {/* <p>{formatPrice(product.price)}</p> */}
          <p>{product.price}</p>
          <p>{product.description}</p>
          <Button variant="contained" onClick={handleAddToCart}>Add to Cart</Button>
        </div>

        {/* Customer reviews */}
        {/* <div style={{ marginTop: "40px" }}>
          <h3>Customer Reviews</h3>
          {product.reviews.length > 0 ? (
            <div style={{ maxHeight: "200px", overflowY: "auto", paddingRight: "10px" }}>
              {product.reviews.map((review) => (
                <div key={review.id} style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}>
                  <strong>{review.user}</strong>
                  <p style={{ margin: 0 }}>{review.comment}</p>
                  <span style={{ fontSize: "12px", color: "gray" }}>Rating: {review.rating} / 5</span>
                </div>
              ))}
            </div>
          ) : (
            <p>No reviews yet.</p>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default ProductDetails;
