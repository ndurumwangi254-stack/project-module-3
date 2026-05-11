import { useState, useEffect } from "react";

const BASE_URL = "http://localhost:3001/products";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(BASE_URL)
      .then((r) => r.json())
      .then((data) => { setProducts(data); setLoading(false); });
  }, []);

  function addProduct(newProduct) {
    return fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then((r) => r.json())
      .then((product) => { setProducts((prev) => [...prev, product]); return product; });
  }

  function updateProduct(id, updates) {
    return fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    })
      .then((r) => r.json())
      .then((updated) => {
        setProducts((prev) => prev.map((p) => p.id === id ? updated : p));
        return updated;
      });
  }

  function deleteProduct(id) {
    return fetch(`${BASE_URL}/${id}`, { method: "DELETE" })
      .then(() => setProducts((prev) => prev.filter((p) => p.id !== id)));
  }

  return { products, loading, addProduct, updateProduct, deleteProduct };
}