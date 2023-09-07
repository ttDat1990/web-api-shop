import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import { adminDeleteProducts, getAllProductsPaginate } from '~/components/ApiUrl';
import styles from './AdminProductsList.module.scss';

const cx = classNames.bind(styles);

const AdminProductsList = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [notFoundError, setNotFoundError] = useState(false);
    const [searchName, setSearchName] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [tempCurrentPage, setTempCurrentPage] = useState(1);
    const [searchCurrentPage, setSearchCurrentPage] = useState(1);

    const fetchProducts = useCallback(async () => {
        try {
            const response = await axios.get(
                `${getAllProductsPaginate}?page=${tempCurrentPage}&perPage=${productsPerPage}`,
            );
            setProducts(response.data.data);
            setTotalPages(response.data.last_page);
        } catch (error) {
            console.error(error);
        }
    }, [tempCurrentPage, productsPerPage]);

    const handleDeleteProduct = async (productId) => {
        await axios.delete(`${adminDeleteProducts}${productId}`);
        fetchProducts();
    };

    const handleUpdateProduct = async (productId) => {
        await axios.delete(`${adminDeleteProducts}${productId}`);
        fetchProducts();
    };

    const handlePageChange = (newPage) => {
        if (!searchName || searchName === '') {
            setTempCurrentPage(newPage);
            setCurrentPage(newPage);
            setSearchCurrentPage(newPage);
        } else {
            setSearchCurrentPage(newPage);
            setCurrentPage(newPage);
        }
    };

    const goToFirstPage = () => {
        handlePageChange(1);
    };

    const goToLastPage = () => {
        handlePageChange(totalPages);
    };

    const handleSearchName = useCallback(async () => {
        try {
            if (searchName.trim() !== '') {
                const response = await axios.get(
                    `${getAllProductsPaginate}?page=${searchCurrentPage}&perPage=${productsPerPage}&name=${searchName}`,
                );
                if (response.data.message) {
                    setNotFoundError(true);
                    setSearchResults([]);
                    setProducts([]);
                } else {
                    setNotFoundError(false);
                    setSearchResults(response.data.data);
                    setTotalPages(Math.ceil(response.data.total / productsPerPage));
                }
            } else {
                setNotFoundError(false);
                setSearchCurrentPage(1);
                const response = await axios.get(
                    `${getAllProductsPaginate}?page=${searchCurrentPage}&perPage=${productsPerPage}`,
                );
                setSearchResults(response.data.data);
                setTotalPages(response.data.last_page);
            }
        } catch (error) {
            console.error(error);
        }
    }, [searchCurrentPage, productsPerPage, searchName]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    useEffect(() => {
        handleSearchName();
    }, [handleSearchName]);

    const handleSearchNameChange = (e) => {
        setSearchName(e.target.value);
        setCurrentPage(1);
    };

    return (
        <div className={cx('container')}>
            <div className={cx('title')}>List of All Products</div>
            <div className={cx('search-container')}>
                <input type="text" placeholder="Search by Name" value={searchName} onChange={handleSearchNameChange} />
            </div>
            {notFoundError && <div className={cx('error-message')}>Không tìm thấy sản phẩm.</div>}
            {!notFoundError && (
                <table className={cx('table')}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(searchResults.length > 0 ? searchResults : products).map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td>{product.category.name}</td>
                                <td>
                                    <img src={product.image_url} alt={product.name} width="100" />
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                                    <button onClick={() => handleUpdateProduct(product.id)}>Update</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {!notFoundError && (
                <div className={cx('pagination-nav')}>
                    <button onClick={goToFirstPage} disabled={currentPage === 1}>
                        To First Page
                    </button>
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        Previous Page
                    </button>
                    <div>
                        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                            <button key={page} onClick={() => handlePageChange(page)} disabled={page === currentPage}>
                                {page}
                            </button>
                        ))}
                    </div>
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        Next Page
                    </button>
                    <button onClick={goToLastPage} disabled={currentPage === totalPages}>
                        To Last Page
                    </button>
                </div>
            )}
        </div>
    );
};

export default AdminProductsList;
