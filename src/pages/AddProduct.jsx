import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct({ onAdd }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", category: "", price: "", stock: "", image: "", description: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newProduct = { ...form, price: parseFloat(form.price), stock: parseInt(form.stock) };
    onAdd(newProduct).then(() => navigate("/products"));
  }

  return (
    <div className="page">
      <div className="form-card">
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Enter product name" required />
          </div>
          <div className="form-group">
            <label>Category</label>
            <input name="category" value={form.category} onChange={handleChange} placeholder="e.g. Electronics" required />
          </div>
          <div className="form-group">
            <label>Price ($)</label>
            <input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} placeholder="0.00" required />
          </div>
          <div className="form-group">
            <label>Stock</label>
            <input name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="0" required />
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input name="image" value={form.image} onChange={handleChange} placeholder="https://..." />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Product description..." />
          </div>
          <button type="submit" className="submit-btn">Add Product</button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;