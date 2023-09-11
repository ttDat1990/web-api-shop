import React from 'react';
import styles from './ProductItemS1.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ProductItemS1({ productId, imageUrl, name, categoryName, price, onClickAddToCart }) {
    const handleAddToCart = () => {
        // Chuyển thông tin sản phẩm cần thêm vào giỏ hàng khi nhấn nút "Add to cart"
        const product = {
            productId,
            name,
            price,
            quantity: 1, // Bạn có thể đặt số lượng mặc định là 1
        };
        onClickAddToCart(product);
        console.log(product);
    };

    return (
        <div className={cx('wrapper-card')}>
            <Link to={`/products/${productId}`} href="/" className={cx('wrapper-link')}>
                <div className={cx('product-image')}>
                    <img src={imageUrl} alt={name} />
                </div>
                <div className={cx('product-category')}>{categoryName}</div>
                <div className={cx('product-name')}>{name}</div>
            </Link>
            <div className={cx('wrapper-action')}>
                <div className={cx('product-price')}>$ {price}</div>
                <div className={cx('product-button')}>
                    <button className={cx('cart-button')} onClick={handleAddToCart}>
                        Add to cart
                    </button>
                    <Link className={cx('wishlist-button')} href="/">
                        <FontAwesomeIcon icon={faHeart} />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ProductItemS1;
