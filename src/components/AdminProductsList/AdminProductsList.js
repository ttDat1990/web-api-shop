import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { adminDeleteProducts, getAllProductsPaginate, getAllCategories } from '~/components/ApiUrl';
import styles from './AdminProductsList.module.scss';

const cx = classNames.bind(styles);

const AdminProductsList = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [notFoundError, setNotFoundError] = useState(false);
    const [searchName, setSearchName] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const params = {
                page: currentPage,
                perPage: productsPerPage,
                name: searchName.trim() !== '' ? searchName : undefined,
                category: category !== '' ? category : undefined,
            };
            const response = await axios.get(`${getAllProductsPaginate}`, { params });
            if (response.data.message) {
                setNotFoundError(true);
                setProducts([]);
            } else {
                setNotFoundError(false);
                setProducts(response.data.data);
                setTotalPages(Math.ceil(response.data.total / productsPerPage));
            }
        } catch (error) {
            console.error(error);
            // Handle the error and provide user feedback if needed.
        } finally {
            setLoading(false);
        }
    }, [productsPerPage, searchName, currentPage, category]);

    const handleDeleteProduct = async (productId) => {
        try {
            setLoading(true);
            await axios.delete(`${adminDeleteProducts}${productId}`);
            // Remove the deleted product from the list without making a new request
            setProducts(products.filter((product) => product.id !== productId));
        } catch (error) {
            console.error(error);
            // Handle the error and provide user feedback if needed.
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateProduct = (product) => {
        navigate(`/admin/update/${product.id}`);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await axios.get(`${getAllCategories}`);
                setCategories(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchCategories();
    }, []);

    const handleSearchNameChange = (e) => {
        setSearchName(e.target.value);
        setCurrentPage(1);
        fetchData(); // Gọi lại fetchData khi có thay đổi tìm kiếm
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        setCurrentPage(1);
    };

    return (
        <div className={cx('container')}>
            <div className={cx('title')}>List of All Products</div>
            <div className={cx('search-container')}>
                <input type="text" placeholder="Search by Name" value={searchName} onChange={handleSearchNameChange} />
                <select value={category} onChange={handleCategoryChange}>
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            {loading ? (
                <div>Loading...</div>
            ) : notFoundError ? (
                <div className={cx('error-message')}>Product not found.</div>
            ) : (
                <>
                    <table className={cx('table')}>
                        <thead>
                            <tr>
                                <th className={cx('name-column')}>Name</th>
                                <th className={cx('des-column')}>Description</th>
                                <th className={cx('price-column')}>Price</th>
                                <th className={cx('cate-column')}>Category</th>
                                <th className={cx('img-column')}>Image</th>
                                <th className={cx('action-column')}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category.name}</td>
                                    <td>
                                        <img src={product.image_url} alt={product.name} width="100" />
                                    </td>
                                    <td className={cx('action-container')}>
                                        <div onClick={() => handleDeleteProduct(product.id)}>Delete</div>
                                        <div onClick={() => handleUpdateProduct(product)}>Update</div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {totalPages > 1 && (
                        <div className={cx('pagination-nav')}>
                            <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
                                To First Page
                            </button>
                            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                                Previous Page
                            </button>
                            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    disabled={page === currentPage}
                                >
                                    {page}
                                </button>
                            ))}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Next Page
                            </button>
                            <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
                                To Last Page
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AdminProductsList;
