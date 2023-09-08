import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import { adminAddProduct, adminGetAllCategories } from '~/components/ApiUrl';
import styles from './AdminProductsAdd.module.scss';

const cx = classNames.bind(styles);

const AdminProductsAdd = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category_id: '',
        image: null,
    });
    const [categories, setCategories] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [fadeState, setFadeState] = useState('none');

    useEffect(() => {
        axios
            .get(`${adminGetAllCategories}`)
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append('name', formData.name);
        form.append('description', formData.description);
        form.append('price', formData.price);
        form.append('category_id', formData.category_id);
        form.append('image', formData.image);

        try {
            const response = await axios.post(`${adminAddProduct}`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.message === 'Product created successfully') {
                setShowToast(true);
                setFadeState('fade-in');

                setTimeout(() => {
                    setShowToast(false);
                    setFadeState('none');
                }, 2000);
            }

            setFormData({
                name: '',
                description: '',
                price: '',
                category_id: '',
                image: null,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const categoryOptions = useMemo(() => {
        return categories.map((category) => (
            <option key={category.id} value={category.id}>
                {category.name}
            </option>
        ));
    }, [categories]);

    return (
        <form onSubmit={handleSubmit}>
            <div className={cx('container')}>
                <div className={cx('title')}>Add new Product</div>
                <div className={cx('name')}>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Name of Product"
                    />
                </div>
                <div className={cx('description')}>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Description of Product"
                    />
                </div>

                <div className={cx('price')}>
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="Price of Product"
                    />
                </div>
                <div className={cx('category')}>
                    <label htmlFor="category">Category</label>
                    <select id="category" name="category_id" value={formData.category_id} onChange={handleInputChange}>
                        <option value="">Select a category</option>
                        {categoryOptions}
                    </select>
                </div>

                <div className={cx('image')}>
                    <div>Image</div>
                    <label htmlFor="image">Choose Product Image</label>
                    <input type="file" accept="image/*" id="image" name="image" onChange={handleImageChange} />
                </div>

                <button type="submit">Submit</button>
            </div>
            {showToast && (
                <div
                    className={cx('toast', {
                        'fade-in': showToast && fadeState === 'fade-in',
                        'fade-out': fadeState === 'fade-out',
                    })}
                >
                    Product created successfully!
                </div>
            )}
        </form>
    );
};

export default AdminProductsAdd;
