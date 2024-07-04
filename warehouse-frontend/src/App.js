// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [history, setHistory] = useState([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);

  const getProducts = async () => {
    const response = await axios.get('http://localhost:5000/api/products');
    setProducts(response.data);
  };

  const getHistory = async () => {
    const response = await axios.get('http://localhost:5000/api/products/history');
    setHistory(response.data);
  };

  const receiveProduct = async () => {
    await axios.post('http://localhost:5000/api/products/receive', { name, quantity });
    getProducts();
  };

  const issueProduct = async () => {
    await axios.post('http://localhost:5000/api/products/issue', { name, quantity });
    getProducts();
  };

  useEffect(() => {
    getProducts();
    getHistory();
  }, []);

  return (
    <div className="App">
      <h1>Warehouse Management</h1>
      <div>
        <h2>Receive Product</h2>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        <button onClick={receiveProduct}>Receive</button>
      </div>
      <div>
        <h2>Issue Product</h2>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        <button onClick={issueProduct}>Issue</button>
      </div>
      <div>
        <h2>Products in Warehouse</h2>
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.name} - {product.quantity}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>History</h2>
        <ul>
          {history.map((record) => (
            <li key={record.id}>{record.date} - {record.name} - {record.operation} - {record.quantity}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;