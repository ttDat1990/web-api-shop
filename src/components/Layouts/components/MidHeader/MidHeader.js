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
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function MidHeader() {
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { isLoggedIn, login, logout } = useAuth();
    const navigate = useNavigate();

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const loginSuccessful = await login(email, password, 'user');

            if (!loginSuccessful) {
                setError('Đăng nhập không thành công. Vui lòng kiểm tra thông tin đăng nhập.');
            } else {
                setShowModal(false);
            }
        } catch (err) {
            // Xử lý lỗi đăng nhập
        }
    };

    const handleCartClick = () => {
        if (isLoggedIn) {
            navigate('/user/cart');
        } else {
            toggleModal();
        }
    };

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
                        <div onClick={isLoggedIn ? logout : toggleModal} className={cx('menu-account')}>
                            <FontAwesomeIcon icon={faUser} />
                            <span>Login</span>
                        </div>
                    )}
                    {showModal && (
                        <div className={cx('modal')}>
                            <div className={cx('modal-content')}>
                                <span className={cx('close')} onClick={toggleModal}>
                                    &times;
                                </span>
                                <div className={cx('login-modal-container')}>
                                    <div className={cx('modal-title')}>
                                        <h4>Login</h4>
                                        <span>Get access to your</span>
                                        <span>Orders, Wishlist and</span>
                                        <span>Recommendations.</span>
                                    </div>
                                    <form onSubmit={handleLogin} className={cx('modal-input')}>
                                        <input
                                            type="text"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            placeholder="Enter Username/Email address"
                                            autoComplete="username"
                                        />
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            placeholder="Enter Password"
                                            autoComplete="current-password"
                                        />
                                        <div className={cx('login-tip')}>
                                            <div>
                                                <input type="checkbox" name="remember" />
                                                <label htmlFor="remember"> Remember me</label>
                                            </div>
                                            <a href="/">Lost your password?</a>
                                        </div>
                                        {error && <span className={cx('error')}>{error}</span>}
                                        <button type="submit">Log in</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                    <a href="/" className={cx('menu-wishlist')}>
                        <FontAwesomeIcon icon={faHeart} />
                        <span>Wishlist</span>
                    </a>
                    <div onClick={handleCartClick} className={cx('menu-cart')}>
                        <FontAwesomeIcon icon={faOpencart} />
                        <span>Cart</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MidHeader;
