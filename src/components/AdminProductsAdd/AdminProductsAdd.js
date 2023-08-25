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
    const [showToast, setShowToast] = useState(false);
    const [fadeState, setFadeState] = useState('none');

    //get categories list
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

    //send formdata and receive response
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
            // show toast
            if (response.data.message === 'Product created successfully') {
                setShowToast(true);
                setFadeState('fade-in');

                setTimeout(() => {
                    setFadeState('fade-out');
                }, 5000);
            }
            console.log(response.data);

            //reset form
            setName('');
            setPrice('');
            setCategoryId('');
            setImage(null);
        } catch (error) {
            console.error(error);
        }
    };

    //animation for hide/show toast
    useEffect(() => {
        let fadeOutTimer;

        if (fadeState === 'fade-out') {
            fadeOutTimer = setTimeout(() => {
                setShowToast(false);
                setFadeState('none');
            }, 700);
        }

        return () => {
            clearTimeout(fadeOutTimer);
        };
    }, [fadeState]);

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
