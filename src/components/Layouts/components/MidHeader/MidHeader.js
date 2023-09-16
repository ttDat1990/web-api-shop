import React from 'react';
import { useState } from 'react';
import styles from './MidHeader.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faUser } from '@fortawesome/free-regular-svg-icons';
import { faOpencart } from '@fortawesome/free-brands-svg-icons';
import { faMagnifyingGlass, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '~/components/AuthContext/AuthContext';
import CartModal from '~/components/CartModal';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function MidHeader() {
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);

    const { isLoggedIn, logout } = useAuth();

    return (
        <div className={cx('wrapper')}>
            <div className={cx('grid')}>
                <Button to={'/'} className={cx('logo')}>
                    PressMart.
                </Button>
                <div className={cx('search')}>
                    <input type="text" placeholder="Search for Products, categories, sku...." />
                    <Button className={cx('search-button')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </Button>
                </div>
                <div className={cx('menu')}>
                    {isLoggedIn ? (
                        <div className={cx('menu-account')} onClick={logout}>
                            <FontAwesomeIcon icon={faSignOutAlt} />
                            <span>Logout</span>
                        </div>
                    ) : (
                        <Link to={'/user/login'} className={cx('menu-account')}>
                            <FontAwesomeIcon icon={faUser} />
                            <span>Login</span>
                        </Link>
                    )}

                    <a href="/" className={cx('menu-wishlist')}>
                        <FontAwesomeIcon icon={faHeart} />
                        <span>Wishlist</span>
                    </a>
                    <div onClick={() => setIsCartModalOpen(true)} className={cx('menu-cart')}>
                        <FontAwesomeIcon icon={faOpencart} />
                        <span>Cart</span>
                    </div>
                    {isCartModalOpen && <CartModal onCloseModal={() => setIsCartModalOpen(false)} />}
                </div>
            </div>
        </div>
    );
}

export default MidHeader;
