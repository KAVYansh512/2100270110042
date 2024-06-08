import React from "react";
import { TextField, Button } from "@mui/material";

const ProductFilter = ({ onFilterChange }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <div>
      <TextField
        label="Category"
        name="category"
        onChange={handleFilterChange}
      />
      <TextField label="Company" name="company" onChange={handleFilterChange} />
      <TextField
        label="Min Price"
        name="minPrice"
        type="number"
        onChange={handleFilterChange}
      />
      <TextField
        label="Max Price"
        name="maxPrice"
        type="number"
        onChange={handleFilterChange}
      />
      <Button
        variant="contained"
        onClick={() => onFilterChange("refresh", true)}
      >
        Apply
      </Button>
    </div>
  );
};

export default ProductFilter;
