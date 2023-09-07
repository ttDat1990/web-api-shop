import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './LoginModal.module.scss';
import { useAuth } from '~/components/AuthContext/AuthContext';

const cx = classNames.bind(styles);

const LoginModal = ({ triggerButton }) => {
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { isLoggedIn, login, logout } = useAuth();

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

    return (
        <div>
            <div onClick={isLoggedIn ? logout : toggleModal}>{triggerButton}</div>

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
                                />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="Enter Password"
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
        </div>
    );
};

export default LoginModal;
