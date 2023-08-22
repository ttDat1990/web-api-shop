import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const AdminProductsAdd = () => {
    const history = useHistory();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const handleAddProduct = async () => {
        await axios.post('/api/products', { name, price });
        history.push('/products');
    };

    return (
        <div>
            <h2>Add Product</h2>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
            <button onClick={handleAddProduct}>Add Product</button>
        </div>
    );
};

export default AdminProductsAdd;
