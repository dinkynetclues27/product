import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css'
const Fetchproduct = () => {

    const [products, setProducts] = useState([]);
    const [editIndex, setEditIndex] = useState(-1);
    const [editedProduct, setEditedProduct] = useState({
      product_name : "",
      sku : "",
      variant_id : "",
      price : "",
      discount_percent : "",
      description : ""   
    });

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedProduct({ ...products[index] });
};

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/productfetch');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedProduct(prevState => ({
        ...prevState,
        [name]: value
    }));
};

const handleCancelEdit = () => {
    setEditIndex(-1);
};

const handleSaveEdit = (product_id) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `http://localhost:4000/productupdate/${product_id}`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log('Product updated successfully');
                fetchProducts();
                setEditIndex(-1);
            } else {
                console.error('Error updating product:', xhr.statusText);
            }

        }
    };
    xhr.send(JSON.stringify(editedProduct ));
};

const handleDelete = (id, idx) => {
  let result = window.confirm(`Delete id: ${id}`);
  console.log(result)
  if (result) {
      const xhr = new XMLHttpRequest();
      xhr.open('DELETE', `http://localhost:4000/productdelete/${id}`, true);
      xhr.onload = () => {
          if (xhr.status === 200) {
              console.log('XHR status:', xhr.status);
              console.log('Product deleted successfully');
              fetchProducts();
             // toast.success('Product deleted successfully')

          } else {
              console.error('Error deleting Product:', xhr.statusText);
              //toast.error("error")
          }
      };
      xhr.send();
  } else {
      alert("Deletion cancelled");
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
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product,idx) => (
                    <tr key={idx}>
                        <td>{product.product_name}</td>
                        <td>{product.sku}</td>
                        <td>{product.variant_id}</td>
                        <td>{product.price}</td>
                        <td>{product.discount_percent}</td>
                        <td>{product.description}</td>
                        <td>{product.category_name}</td>
                        <td>{product.discounted_price}</td>
                        <td>
                          <button onClick={() => handleEdit(idx)}>Edit</button>
                        </td>
                        <td>
                          <button onClick={() => handleDelete(product.product_id, idx)}>Delete</button>
                        </td>
                      
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    {editIndex !== -1 && (
                <div className="popup">
                    <h2>Edit Product</h2>
                    <input type="text" name="product_name" value={editedProduct.product_name} onChange={handleInputChange} placeholder="Product Name" />
                    <input type="text" name="sku" value={editedProduct.sku} onChange={handleInputChange} placeholder="Sku" />
                    <input type="text" name="variant_id" value={editedProduct.variant_id} onChange={handleInputChange} placeholder="Variant Id" />
                    <input type="text" name="price" value={editedProduct.price} onChange={handleInputChange} placeholder="Price" />
                    <input type="text" name="discount_percent" value={editedProduct.discount_percent} onChange={handleInputChange} placeholder="Discount Percent" />
                    <input type="text" name="description" value={editedProduct.description} onChange={handleInputChange} placeholder="Description" />
                    <input type="text" name="category_name" value={editedProduct.category_name} onChange={handleInputChange} placeholder="Category Name" />
                    
                    <button onClick={() => handleSaveEdit(products[editIndex].product_id)}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                </div>
            )}
</div>
  
  );
};

export default Fetchproduct;