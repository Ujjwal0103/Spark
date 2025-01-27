import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import ProductList from "../utils/ProductList/ProductList";
import ProductAPI from "../../../api/ProductAPI";
const Product = () => {
  const state = useContext(GlobalState);
  const [products] = state.productAPI.products;
  const [isAdmin] = state.userAPI.isAdmin;
  return (
    <div className="products">
      {products.map((product) => {
        return (
          <ProductList key={product._id} product={product} isAdmin={isAdmin} />
        );
      })}
    </div>
  );
};

export default Product;
