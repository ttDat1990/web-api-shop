import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../ApiUrl';

const AdminProductsList = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const response = await axios.get(`${getAllProducts}`);
        setProducts(response.data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDeleteProduct = async (productId) => {
        await axios.delete(`${getAllProducts}${productId}`);
        fetchProducts();
    };

    return (
        <div>
            <h2>Product List</h2>
            <Link to="/products/add">Add Product</Link>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - {product.price}
                        <Link to={`/products/${product.id}/update`}>Edit</Link>
                        <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminProductsList;
