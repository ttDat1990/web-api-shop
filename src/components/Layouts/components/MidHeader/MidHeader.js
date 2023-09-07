import React from 'react';
import styles from './MidHeader.module.scss';
import classNames from 'classnames/bind';
import Dropdown from '~/components/Dropdown';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faUser } from '@fortawesome/free-regular-svg-icons';
import { faOpencart } from '@fortawesome/free-brands-svg-icons';
import { faChevronDown, faMagnifyingGlass, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import LoginModal from '~/components/LoginModal';
import { useAuth } from '~/components/AuthContext/AuthContext';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function MidHeader() {
    const { isLoggedIn, logout } = useAuth();
    return (
        <div className={cx('wrapper')}>
            <div className={cx('grid')}>
                <Button to={'/'} className={cx('logo')}>
                    PressMart.
                </Button>
                <div className={cx('search')}>
                    {/* <div className={cx('search-input')}> */}
                    <input type="text" placeholder="Search for Products, categories, sku...." />
                    {/* </div> */}
                    <Dropdown
                        trigger="click"
                        offset={[29, 0]}
                        content={
                            <div className={cx('dropdown')}>
                                <a href="/" className={cx('dropdown-item', 'title-dropdown')}>
                                    All Categories
                                </a>
                                <a href="/" className={cx('dropdown-item', 'title-dropdown')}>
                                    Accessories
                                </a>
                                <a href="/" className={cx('dropdown-item')}>
                                    {' '}
                                    Belts
                                </a>
                                <a href="/" className={cx('dropdown-item')}>
                                    {' '}
                                    Caps and Hats
                                </a>
                                <a href="/" className={cx('dropdown-item')}>
                                    {' '}
                                    Sunglasses
                                </a>
                                <a href="/" className={cx('dropdown-item')}>
                                    {' '}
                                    Wallets
                                </a>
                                <a href="/" className={cx('dropdown-item', 'title-dropdown')}>
                                    Bags and Backpacks
                                </a>
                                <a href="/" className={cx('dropdown-item')}>
                                    {' '}
                                    Backpacks
                                </a>
                                <a href="/" className={cx('dropdown-item')}>
                                    {' '}
                                    Hand Bags
                                </a>
                                <a href="/" className={cx('dropdown-item')}>
                                    {' '}
                                    Laptop Bags
                                </a>
                            </div>
                        }
                    >
                        <div className={cx('search-dropdown')}>
                            All Categories
                            <span>
                                <FontAwesomeIcon icon={faChevronDown} />
                            </span>
                        </div>
                    </Dropdown>
                    <Button className={cx('search-button')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </Button>
                </div>
                <div className={cx('menu')}>
                    {/* <LoginModal
                        triggerButton={
                            <div className={cx('menu-account')}>
                                <FontAwesomeIcon icon={faUser} />
                                <span>Login</span>
                            </div>
                        }
                    ></LoginModal> */}
                    {isLoggedIn ? (
                        <div className={cx('menu-account')} onClick={logout}>
                            <FontAwesomeIcon icon={faSignOutAlt} />
                            <span>Logout</span>
                        </div>
                    ) : (
                        <LoginModal
                            triggerButton={
                                <div className={cx('menu-account')}>
                                    <FontAwesomeIcon icon={faUser} />
                                    <span>Login</span>
                                </div>
                            }
                        />
                    )}
                    <a href="/" className={cx('menu-wishlist')}>
                        <FontAwesomeIcon icon={faHeart} />
                        <span>Wishlist</span>
                    </a>
                    <Link to={'/user/cart'} className={cx('menu-cart')}>
                        <FontAwesomeIcon icon={faOpencart} />
                        <span>Cart</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default MidHeader;
