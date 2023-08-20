import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ProductItemS1.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function ProductItemS1() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/products')
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const productItems = products.map((product) => (
        <div key={product.id} className={cx('wrapper-card')}>
            <a href="/" className={cx('wrapper-link')}>
                <div className={cx('product-image')}>
                    <img src={product.image_url} alt={product.name} />
                </div>
                <div className={cx('product-category')}>{product.category_id}</div>
                <div className={cx('product-name')}>{product.name}</div>
            </a>
            <div className={cx('wrapper-action')}>
                <div className={cx('product-price')}>$ {product.price}</div>
                <div className={cx('product-button')}>
                    <a className={cx('cart-button')} href="/">
                        Add to cart
                    </a>
                    <a className={cx('wishlist-button')} href="/">
                        <FontAwesomeIcon icon={faHeart} />
                    </a>
                </div>
            </div>
        </div>
    ));

    return (
        <div className={cx('wrapper')}>
            <div className={cx('grid')}>{productItems}</div>
        </div>
    );
}

export default ProductItemS1;
