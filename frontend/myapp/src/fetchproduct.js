import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Fetchproduct = () => {

    const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/productfetch');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div className="container mt-5">
    <h1>Products</h1>
    <div className="table-responsive mt-3">
        <table className="table">
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>SKU</th>
                    <th>Variant ID</th>
                    <th>Price</th>
                    <th>Discount Percent</th>
                    <th>Description</th>
                    <th>Category Name</th>
                    <th>Discounted Price</th>
                </tr>
            </thead>
            <tbody>
                {products.map(product => (
                    <tr key={product.product_id}>
                        <td>{product.product_name}</td>
                        <td>{product.sku}</td>
                        <td>{product.variant_id}</td>
                        <td>{product.price}</td>
                        <td>{product.discount_percent}</td>
                        <td>{product.description}</td>
                        <td>{product.category_name}</td>
                        <td>{product.discounted_price}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>
  );
};

export default Fetchproduct;