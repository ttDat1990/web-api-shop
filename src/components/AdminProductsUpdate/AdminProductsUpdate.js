import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { getAllProducts, adminGetAllCategories } from '~/components/ApiUrl'; // Đảm bảo bạn có URL API cập nhật sản phẩm
import styles from './AdminProductsUpdate.module.scss'; // Tạo một stylesheet riêng cho component cập nhật sản phẩm

const cx = classNames.bind(styles);

const AdminProductsUpdate = () => {
    const { id } = useParams();

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
    const [newImage, setNewImage] = useState(null);

    useEffect(() => {
        // Lấy dữ liệu sản phẩm từ API bằng axios sử dụng `id` từ URL
        axios
            .get(`${getAllProducts}/${id}`)
            .then((response) => {
                const productData = response.data; // Sản phẩm được trả về từ API
                // Cập nhật state formData với dữ liệu sản phẩm
                setFormData({
                    name: productData.name,
                    description: productData.description,
                    price: productData.price,
                    category_id: productData.category_id,
                    image: null, // Điều này có thể cần sửa đổi tùy vào cách bạn xử lý ảnh
                    image_url: productData.image_url,
                });
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
        axios
            .get(`${adminGetAllCategories}`)
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setNewImage(URL.createObjectURL(e.target.files[0]));
            setFormData({ ...formData, image: e.target.files[0] });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.price || !formData.category_id) {
            console.error('Please fill in all required fields.');
            return;
        }

        const form = new FormData();
        form.append('name', formData.name);
        form.append('description', formData.description);
        form.append('price', formData.price);
        form.append('category_id', formData.category_id);
        if (formData.image) {
            form.append('image', formData.image);
        }

        try {
            const response = await axios.post(`${getAllProducts}/${id}`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.message === 'Product updated successfully') {
                setShowToast(true);
                setFadeState('fade-in');

                setTimeout(() => {
                    setShowToast(false);
                    setFadeState('none');
                }, 2000);
            }
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
                <div className={cx('title')}>Update Product</div>
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

                <div className={cx('cate-img-container')}>
                    <div>
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
                            <select
                                id="category"
                                name="category_id"
                                value={formData.category_id}
                                onChange={handleInputChange}
                            >
                                <option value="">Select a category</option>
                                {categoryOptions}
                            </select>
                        </div>

                        <div className={cx('image')}>
                            <div>Image</div>
                            <label htmlFor="image">Choose Product Image</label>
                            <input type="file" accept="image/*" id="image" name="image" onChange={handleImageChange} />
                        </div>
                    </div>
                    <div>
                        {newImage && <img src={newImage} alt={formData.name} width="100" />}
                        {!newImage && formData.image_url && (
                            <img src={formData.image_url} alt={formData.name} width="100" />
                        )}
                    </div>
                </div>

                <button type="submit">Update</button>
            </div>
            {showToast && (
                <div
                    className={cx('toast', {
                        'fade-in': showToast && fadeState === 'fade-in',
                        'fade-out': fadeState === 'fade-out',
                    })}
                >
                    Product updated successfully!
                </div>
            )}
        </form>
    );
};

export default AdminProductsUpdate;
