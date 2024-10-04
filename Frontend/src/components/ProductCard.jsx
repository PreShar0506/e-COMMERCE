// src/components/ProductCard.jsx
import React from "react";
import { Link ,useNavigate} from "react-router-dom";
import formatPrice from "../utils/formatPrice";
import useCart from "../hooks/useCart";
import Button from "./common/Button";

const ProductCard = ({ product }) => {
const navigate=useNavigate();
 // console.log('------------------------------>',product)
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    navigate("/");
    };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img src={product.image[0]} alt={product.name} />
        <h3>{product.name}</h3>
      </Link>
      <p>{formatPrice(product.price)}</p>
      <Button onClick={handleAddToCart}>Add to Cart</Button>
    </div>
  );
};

export default ProductCard;
