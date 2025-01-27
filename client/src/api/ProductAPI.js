import React, { useEffect, useState } from "react"; //useEffect is a React hook used to perform side effects (like data fetching) in function components.
import axios from "axios"; //axios is a popular library for making HTTP requests.

const ProductAPI = () => {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const res = await axios.get("http://localhost:4000/api/products/");
    console.log(res.data);
    setProducts(res.data.products);
  };
  useEffect(() => {
    getProducts();
  }, []);
  return {
    products: [products, setProducts],
  };
};

export default ProductAPI;
