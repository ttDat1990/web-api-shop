import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './AllProducts.module.scss';
import ProductItemS1 from '~/components/ProductItemS1';
import CartModal from '~/components/CartModal';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '~/reducers/cartSlice';

const cx = classNames.bind(styles);

function AllProducts({ apiUrl, cateUrl, limit, perPage, allProducts, paginate, filter = true }) {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchName, setSearchName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [notFoundError, setNotFoundError] = useState(false);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [under100, setUnder100] = useState(false);
    const [between100and200, setBetween100and200] = useState(false);
    const [noPriceFilter, setNoPriceFilter] = useState(true);
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);

    useEffect(() => {
        axios
            .get(cateUrl)
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    }, [cateUrl]);

    useEffect(() => {
        setLoading(true);
        let apiURL = apiUrl;
        const params = {
            priceCondition: under100 ? 'under_100' : between100and200 ? 'between_100_and_200' : 'all',
            limit: limit,
            perPage: perPage,
            category_id: selectedCategory,
            page: currentPage,
            paginate: paginate,
        };

        if (paginate) {
            params.name = searchName;
            params.allProducts = allProducts;
        }

        axios
            .get(apiURL, { params })
            .then((response) => {
                if (paginate) {
                    setProducts(response.data.data);
                    setTotalPages(response.data.last_page);
                    setCurrentPage(response.data.current_page);
                } else {
                    setProducts(response.data);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setNotFoundError(true);
                setLoading(false);
            });
    }, [
        apiUrl,
        limit,
        perPage,
        selectedCategory,
        searchName,
        under100,
        between100and200,
        allProducts,
        currentPage,
        paginate,
    ]);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleCategoryChange = (e) => {
        setCurrentPage(1);
        setSelectedCategory(e.target.value);
    };

    const handleCheckboxChange = (e) => {
        const { name } = e.target;
        setCurrentPage(1);
        if (name === 'under100') {
            setUnder100(true);
            setBetween100and200(false);
            setNoPriceFilter(false);
        } else if (name === 'between100and200') {
            setUnder100(false);
            setBetween100and200(true);
            setNoPriceFilter(false);
        } else if (name === 'noPriceFilter') {
            setUnder100(false);
            setBetween100and200(false);
            setNoPriceFilter(true);
        }
    };

    const addToCartHandler = (productId) => {
        const productToAdd = products.find((product) => product.id === productId.productId);

        if (!productToAdd) return;

        dispatch(addToCart(productToAdd)); // Gửi action addToCart để thêm sản phẩm vào giỏ hàng
        setIsCartModalOpen(true);
    };
    const productItems = products ? (
        products.map((product) => (
            <ProductItemS1
                key={product.id}
                imageUrl={product.image_url}
                name={product.name}
                price={product.price}
                categoryName={product.category_name}
                productId={product.id}
                onClickAddToCart={addToCartHandler}
            />
        ))
    ) : notFoundError ? (
        <div className={cx('error')}>Error fetching data.</div>
    ) : (
        <div className={cx('error')}>Not found any Product.</div>
    );

    console.log(cartItems);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('grid')}>
                {filter && (
                    <div className={cx('filters-wrapper')}>
                        <div className={cx('filters')}>
                            <div className={cx('filters-title')}>Search Products by Name</div>
                            <input
                                type="text"
                                placeholder="Search by Name"
                                value={searchName}
                                onChange={(e) => {
                                    setCurrentPage(1);
                                    setSearchName(e.target.value);
                                }}
                            />
                            <div className={cx('filters-title')}>Search Products by Category</div>
                            <select value={selectedCategory} onChange={handleCategoryChange}>
                                <option value="">All Categories</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            <div className={cx('filters-title')}>Search Products by Prices</div>
                            <div className={cx('price-filter')}>
                                <div>
                                    <input
                                        type="checkbox"
                                        name="noPriceFilter"
                                        id="noPriceFilter"
                                        checked={noPriceFilter}
                                        onChange={handleCheckboxChange}
                                    />
                                    <label htmlFor="noPriceFilter">All Prices</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        name="under100"
                                        id="under100"
                                        checked={under100}
                                        onChange={handleCheckboxChange}
                                    />
                                    <label htmlFor="under100">$0.00 - $100.00</label>
                                </div>

                                <div>
                                    <input
                                        type="checkbox"
                                        name="between100and200"
                                        id="between100and200"
                                        checked={between100and200}
                                        onChange={handleCheckboxChange}
                                    />
                                    <label htmlFor="between100and200">$100.00 - $200.00</label>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {loading ? (
                    <div className={cx('loading-container')}>
                        <div className={cx('loading')}></div>
                    </div>
                ) : productItems.length > 0 ? (
                    <div className={cx('content-container')}>
                        <div className={cx('content')}>{productItems}</div>
                        {totalPages > 1 && (
                            <div className={cx('pagination')}>
                                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                                    Previous
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
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <p>Not found any Product</p>
                )}
                {isCartModalOpen && <CartModal onCloseModal={() => setIsCartModalOpen(false)} />}
            </div>
        </div>
    );
}

export default AllProducts;
