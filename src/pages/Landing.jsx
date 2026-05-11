import React from "react";
import { Link } from "react-router-dom";

function Landing({ products }) {
  const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
  const avgPrice = products.length
    ? (products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2)
    : 0;

  return (
    <div className="page">
      <div className="hero">
        <h1>Welcome to <span>Admin Portal</span></h1>
        <p>Manage your products, track inventory, and grow your store — all in one place.</p>
        <Link to="/products" className="hero-btn">View Products</Link>
      </div>
      <div className="stats">
        <div className="stat-card">
          <h2>{products.length}</h2>
          <p>Total Products</p>
        </div>
        <div className="stat-card">
          <h2>{totalStock}</h2>
          <p>Items in Stock</p>
        </div>
        <div className="stat-card">
          <h2>${avgPrice}</h2>
          <p>Average Price</p>
        </div>
      </div>
    </div>
  );
}

export default Landing;