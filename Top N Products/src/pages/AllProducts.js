import React, { useState, useEffect } from "react";
import { fetchProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import ProductFilter from "../components/ProductFilter";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    company: "",
    minPrice: 0,
    maxPrice: 10000,
    refresh: false,
  });

  useEffect(() => {
    if (filters.refresh) {
      const fetchAndSetProducts = async () => {
        const data = await fetchProducts(
          filters.company,
          filters.category,
          10,
          filters.minPrice,
          filters.maxPrice
        );
        setProducts(data);
      };
      fetchAndSetProducts();
    }
  }, [filters]);

  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div>
      <ProductFilter onFilterChange={handleFilterChange} />
      <div>
        {products.map((product) => (
          <ProductCard
            key={`${product.company}-${product.productName}`}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
