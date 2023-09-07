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

    const [searchName, setSearchName] = useState('');
    // const [searchPrice, setSearchPrice] = useState('');
    // const [searchCategory, setSearchCategory] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // Biến tạm thời để theo dõi trang sau khi tìm kiếm
    const [tempCurrentPage, setTempCurrentPage] = useState(1);
    const [searchCurrentPage, setSearchCurrentPage] = useState(1);

    const fetchProducts = useCallback(async () => {
        console.log('call fetchProducts');
        console.log(tempCurrentPage);
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

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleDeleteProduct = async (productId) => {
        await axios.delete(`${adminDeleteProducts}${productId}`);
        fetchProducts();
    };

    const handleUpdateProduct = async (productId) => {
        await axios.delete(`${adminDeleteProducts}${productId}`);
        fetchProducts();
    };

    const handlePageChange = (newPage) => {
        console.log(searchName);
        if (!searchName) {
            //&& !searchPrice && !searchCategory
            console.log(tempCurrentPage);
            setTempCurrentPage(newPage);
            setCurrentPage(newPage);
        } else {
            console.log(searchCurrentPage);
            setSearchCurrentPage(newPage);
            setCurrentPage(newPage);
            console.log(searchCurrentPage);
        }
    };

    const goToFirstPage = () => {
        handlePageChange(1);
    };

    const goToLastPage = () => {
        handlePageChange(totalPages);
    };

    const handleSearchName = useCallback(async () => {
        console.log('call handleSearchName');
        if (searchName && searchName !== '') {
            try {
                const response = await axios.get(
                    `${getAllProductsPaginate}?page=${searchCurrentPage}&perPage=${productsPerPage}&name=${searchName}`,
                );
                setSearchResults(response.data.data);
                setTotalPages(Math.ceil(response.data.total / productsPerPage));
            } catch (error) {
                console.error(error);
            }
        } else {
            fetchProducts();
        }
    }, [searchCurrentPage, productsPerPage, searchName, fetchProducts]);

    useEffect(() => {
        handleSearchName();
    }, [handleSearchName]);

    // const handleSearchPrice = async () => {
    //     try {
    //         const response = await axios.get(
    //             `${getAllProductsPaginate}?page=1&perPage=${productsPerPage}&price=${searchPrice}`,
    //         );
    //         setSearchResults(response.data.data);
    //         setTotalPages(Math.ceil(response.data.total / productsPerPage));
    //         setCurrentPage(1);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // const handleSearchCategory = async () => {
    //     try {
    //         const response = await axios.get(
    //             `${getAllProductsPaginate}?page=1&perPage=${productsPerPage}&category=${searchCategory}`,
    //         );
    //         setSearchResults(response.data.data);
    //         setTotalPages(Math.ceil(response.data.total / productsPerPage));
    //         setTempCurrentPage(1); // Cập nhật tempCurrentPage khi tìm kiếm
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    const handleSearchNameChange = (e) => {
        setSearchName(e.target.value);
    };

    // const handleSearchPriceChange = (e) => {
    //     setSearchPrice(e.target.value);
    // };

    // const handleSearchCategoryChange = (e) => {
    //     setSearchCategory(e.target.value);
    // };

    return (
        <div className={cx('container')}>
            <div className={cx('title')}>List of All Products</div>
            <div className={cx('search-container')}>
                <input type="text" placeholder="Search by Name" value={searchName} onChange={handleSearchNameChange} />
                <button onClick={handleSearchName}>Search Name</button>
            </div>

            <div className={cx('search-container')}>
                <input
                    type="number"
                    placeholder="Search by Price"
                    // value={searchPrice}
                    // onChange={handleSearchPriceChange}
                />
                {/* <button onClick={handleSearchPrice}>Search Price</button> */}
            </div>

            <div className={cx('search-container')}>
                <input
                    type="text"
                    placeholder="Search by Category"
                    // value={searchCategory}
                    // onChange={handleSearchCategoryChange}
                />
                {/* <button onClick={handleSearchCategory}>Search Category</button> */}
            </div>
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
        </div>
    );
};

export default AdminProductsList;
