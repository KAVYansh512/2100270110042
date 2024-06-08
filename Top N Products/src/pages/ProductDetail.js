import React from "react";
import { useParams } from "react-router-dom";

const ProductDetail = ({ products }) => {
  const { productId } = useParams();
  const product = products.find((p) => p.productName === productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1>{product.productName}</h1>
      <p>Company: {product.company}</p>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price}</p>
      <p>Rating: {product.rating}</p>
      <p>Discount: {product.discount}%</p>
      <p>Availability: {product.availability}</p>
    </div>
  );
};

export default ProductDetail;
