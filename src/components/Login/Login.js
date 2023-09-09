import React, { useState } from 'react';
import { useAuth } from '~/components/AuthContext/AuthContext';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const loginSuccessful = await login(email, password, 'admin');
            if (!loginSuccessful) {
                setError('Đăng nhập không thành công. Vui lòng kiểm tra thông tin đăng nhập.');
            }
        } catch (err) {
            setError('Đăng nhập không thành công. Vui lòng kiểm tra thông tin đăng nhập.');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('title')}>Admin Login</div>
                <form className={cx('form')} onSubmit={handleLogin}>
                    <div className={cx('form-input')}>
                        <span>
                            <FontAwesomeIcon icon={faUser} />
                        </span>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter Username/Email address"
                            autoComplete="username"
                        />
                    </div>
                    <div className={cx('form-input')}>
                        <span>
                            <FontAwesomeIcon icon={faLock} />
                        </span>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter Password"
                            autoComplete="current-password"
                        />
                    </div>
                    <div className={cx('login-tip')}>
                        <div>
                            <input type="checkbox" name="remember" />
                            <label htmlFor="remember"> Remember me</label>
                        </div>
                        <a href="/">Lost your password?</a>
                    </div>

                    <button type="submit">Login</button>
                    {error && <span className={cx('error')}>{error}</span>}
                </form>
            </div>
        </div>
    );
}

export default Login;
