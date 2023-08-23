import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import { addProduct, getAllCategories } from '~/components/ApiUrl';
import styles from './AdminProductsAdd.module.scss';

const cx = classNames.bind(styles);

const AdminProductsAdd = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category_id, setCategoryId] = useState('');
    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios
            .get(`${getAllCategories}`)
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('category_id', category_id);
        formData.append('image', image);

        try {
            const response = await axios.post(`${addProduct}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            // Reset form fields after successful submission
            setName('');
            setPrice('');
            setCategoryId('');
            setImage(null);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={cx('container')}>
                <div className={cx('title')}>Add new Product</div>
                <div className={cx('name')}>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name of Product"
                    />
                </div>

                <div className={cx('price')}>
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Price of Product"
                    />
                </div>
                <div className={cx('category')}>
                    <label htmlFor="category">Category</label>
                    <select id="category" value={category_id} onChange={(e) => setCategoryId(e.target.value)}>
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={`${category.id}`}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={cx('image')}>
                    <div>Image</div>
                    <label htmlFor="image">Choose Product Image</label>
                    <input type="file" accept="image/*" id="image" onChange={(e) => setImage(e.target.files[0])} />
                </div>

                <button type="submit">Submit</button>
            </div>
        </form>
    );
};

export default AdminProductsAdd;
