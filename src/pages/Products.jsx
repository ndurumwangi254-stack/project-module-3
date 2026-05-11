import React, { useState } from "react";
import { Link } from "react-router-dom";

function EditModal({ product, onSave, onClose }) {
  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(product.stock);

  function handleSave() {
    onSave(product.id, { price: parseFloat(price), stock: parseInt(stock) });
    onClose();
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Edit: {product.name}</h3>
        <div className="form-group">
          <label>Price ($)</label>
          <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Stock</label>
          <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
        </div>
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-save" onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}

function Products({ products, updateProduct, deleteProduct }) {
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <div className="toolbar">
        <input
          className="search-input"
          placeholder="Search products by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link to="/add" className="add-btn">+ Add Product</Link>
      </div>

      <div className="products-grid">
        {filtered.map((product) => (
          <div className="product-card" key={product.id} data-testid="product-card">
            <img src={product.image || "https://via.placeholder.com/150"} alt={product.name} />
            <div className="product-info">
              <span className="category">{product.category}</span>
              <h3>{product.name}</h3>
              <div className="price">${product.price}</div>
              <p style={{fontSize: 13, color: "#888", marginBottom: 12}}>Stock: {product.stock}</p>
              <div className="product-actions">
                <Link to={`/products/${product.id}`} className="btn-edit" style={{textAlign:"center", textDecoration:"none"}}>View</Link>
                <button className="btn-edit" onClick={() => setEditingProduct(product)}>Edit</button>
                <button className="btn-delete" onClick={() => deleteProduct(product.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingProduct && (
        <EditModal
          product={editingProduct}
          onSave={updateProduct}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </div>
  );
}

export default Products;