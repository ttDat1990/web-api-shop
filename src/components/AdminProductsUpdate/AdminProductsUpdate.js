import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { getAllProducts } from '../ApiUrl';

const AdminProductsUpdate = () => {
    const { id } = useParams();
    const history = useHistory();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const fetchProduct = async () => {
        const response = await axios.get(`${getAllProducts}${id}`);
        setName(response.data.name);
        setPrice(response.data.price);
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    const handleUpdateProduct = async () => {
        await axios.put(`${getAllProducts}${id}`, { name, price });
        history.push('/products');
    };

    return (
        <div>
            <h2>Update Product</h2>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
            <button onClick={handleUpdateProduct}>Update Product</button>
        </div>
    );
};

export default AdminProductsUpdate;
