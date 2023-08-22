import React, { useState } from 'react';
import styles from './MidHeader.module.scss';
import classNames from 'classnames/bind';
import Dropdown from '~/components/Dropdown';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faUser } from '@fortawesome/free-regular-svg-icons';
import { faOpencart } from '@fortawesome/free-brands-svg-icons';
import { faChevronDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import AnimatedModal from '~/components/AnimatedModal/AnimatedModal';

const cx = classNames.bind(styles);

function MidHeader() {
    const [showAccountModal, setShowAccountModal] = useState(false); // Sử dụng useState

    const handleAccountClick = () => {
        setShowAccountModal(true);
        console.log(123);
    };
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
                    <div className={cx('menu-account')} onClick={handleAccountClick}>
                        <FontAwesomeIcon icon={faUser} />
                        <span onClick={handleAccountClick}>My Account</span>
                    </div>
                    <a href="/" className={cx('menu-wishlist')}>
                        <FontAwesomeIcon icon={faHeart} />
                        <span>Wishlist</span>
                    </a>
                    <a href="/" className={cx('menu-cart')}>
                        <FontAwesomeIcon icon={faOpencart} />
                        <span>Cart</span>
                    </a>
                    <AnimatedModal
                        isOpen={showAccountModal}
                        onRequestClose={() => setShowAccountModal(false)}
                        style={{
                            width: 695,
                            height: 272,
                            backgroundColor: 'white',
                        }}
                        className={cx('modal-content')}
                        overlayClassName={cx('modal-overlay')}
                        content={
                            <div className={cx('login-modal-container')}>
                                <div className={cx('modal-title')}>
                                    <h4>Login</h4>
                                    <span>Get access to your</span>
                                    <span>Orders, Wishlist and</span>
                                    <span>Recommendations.</span>
                                </div>
                                <div className={cx('modal-input')}>
                                    <input type="text" placeholder="Enter Username/Email address" />
                                    <input type="password" placeholder="Enter Password" />
                                    <div className={cx('login-tip')}>
                                        <div>
                                            <input type="checkbox" name="remember" />
                                            <label for="remember"> Remember me</label>
                                        </div>
                                        <a href="/">Lost your password?</a>
                                    </div>
                                    <button>Log in</button>
                                </div>
                            </div>
                        }
                    />
                </div>
            </div>
        </div>
    );
}

export default MidHeader;
