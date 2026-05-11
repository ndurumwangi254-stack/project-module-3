import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Landing from "../pages/Landing";
import Products from "../pages/Products";
import AddProduct from "../pages/AddProduct";
import ProductDetail from "../pages/ProductDetail";
import { useProducts } from "../hooks/useProducts";

function App() {
  const productData = useProducts();

  return (
    <>
      <nav>
        <NavLink to="/" className="logo">AdminPortal</NavLink>
        <ul>
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/products">Products</NavLink></li>
          <li><NavLink to="/add">Add Product</NavLink></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Landing products={productData.products} />} />
        <Route path="/products" element={<Products {...productData} />} />
        <Route path="/products/:id" element={<ProductDetail {...productData} />} />
        <Route path="/add" element={<AddProduct onAdd={productData.addProduct} />} />
      </Routes>
    </>
  );
}

export default App;