import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ProductDetail({ products, updateProduct, deleteProduct }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(id));
  const [editing, setEditing] = useState(false);
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  if (!product) return <div className="page"><p>Product not found.</p></div>;

  function handleEdit() {
    setPrice(product.price);
    setStock(product.stock);
    setEditing(true);
  }

  function handleSave() {
    updateProduct(product.id, { price: parseFloat(price), stock: parseInt(stock) });
    setEditing(false);
  }

  function handleDelete() {
    deleteProduct(product.id);
    navigate("/products");
  }

  return (
    <div className="page">
      <button className="back-btn" onClick={() => navigate("/products")}>← Back to Products</button>
      <div className="product-detail">
        <img src={product.image || "https://via.placeholder.com/300"} alt={product.name} />
        <h1>{product.name}</h1>
        <span className="category">{product.category}</span>
        <p style={{margin: "16px 0", color: "#666"}}>{product.description}</p>

        {editing ? (
          <>
            <div className="form-group">
              <label>Price ($)</label>
              <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Stock</label>
              <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
            </div>
            <div style={{display:"flex", gap:12, marginTop:16}}>
              <button className="btn-save" onClick={handleSave}>Save</button>
              <button className="btn-cancel" onClick={() => setEditing(false)}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            <p style={{fontSize: 28, fontWeight: 700, color: "#e94560", margin: "16px 0"}}>${product.price}</p>
            <p style={{color: "#888", marginBottom: 20}}>Stock: {product.stock}</p>
            <div style={{display:"flex", gap:12}}>
              <button className="btn-edit" onClick={handleEdit}>Edit Product</button>
              <button className="btn-delete" onClick={handleDelete}>Delete Product</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;