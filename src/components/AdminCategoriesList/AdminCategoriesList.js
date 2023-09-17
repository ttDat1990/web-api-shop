import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { adminGetAllCategories } from '~/components/ApiUrl';
import classNames from 'classnames/bind';
import styles from './AdminCategoriesList.module.scss';

const cx = classNames.bind(styles);

const AdminCategoriesList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${adminGetAllCategories}`);
                setCategories(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                // Xử lý lỗi nếu cần thiết.
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const handleDeleteCategory = async (categoryId) => {
        try {
            setLoading(true);
            await axios.delete(`${adminGetAllCategories}/${categoryId}`); // Thay đổi URL API nếu cần thiết
            // Sau khi xóa thành công, cập nhật danh sách danh mục bằng cách loại bỏ danh mục đã xóa
            setCategories(categories.filter((category) => category.id !== categoryId));
        } catch (error) {
            console.error(error);
            // Xử lý lỗi nếu cần thiết.
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cx('container')}>
            <h2 className={cx('title')}>List of Categories</h2>
            <div className={cx('search-container')}>
                <input
                    type="text"
                    placeholder="Search by Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={cx('search-input')}
                />
            </div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <table className={cx('table')}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCategories.map((category) => (
                            <tr key={category.id}>
                                <td className={cx('id-column')}>{category.id}</td>
                                <td className={cx('name-column')}>{category.name}</td>
                                <td className={cx('img-column')}>
                                    {category.image_url && (
                                        <img
                                            src={category.image_url}
                                            alt={category.name}
                                            width="100"
                                            className={cx('category-image')}
                                        />
                                    )}
                                </td>
                                <td className={cx('action-container')}>
                                    <Link to={`/admin/categories/update/${category.id}`} className={cx('update-link')}>
                                        Update
                                    </Link>
                                    <button
                                        onClick={() => handleDeleteCategory(category.id)}
                                        className={cx('delete-button')}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminCategoriesList;
