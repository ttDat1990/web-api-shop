import styles from './ProductItemS1.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ProductItemS1({ productId, key, imageUrl, name, categoryName, price }) {
    return (
        <div key={key} className={cx('wrapper-card')}>
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
                    <Link className={cx('cart-button')} href="/">
                        Add to cart
                    </Link>
                    <Link className={cx('wishlist-button')} href="/">
                        <FontAwesomeIcon icon={faHeart} />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ProductItemS1;
