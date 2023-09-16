import { useState } from 'react';
import styles from './LoginForm.module.scss';
import classNames from 'classnames/bind';
import { useAuth } from '~/components/AuthContext/AuthContext';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const loginSuccessful = await login(email, password, 'user');

            if (!loginSuccessful) {
                setError('Login error. Please check your username and password.');
            }
        } catch (err) {
            // Xử lý lỗi đăng nhập
        }
    };
    return (
        <div className={cx('container')}>
            <div className={cx('grid')}>
                <div className={cx('login-title')}>
                    <h4>Login</h4>
                    <span>Get access to your</span>
                    <span>Orders, Wishlist and</span>
                    <span>Recommendations.</span>
                </div>
                <form onSubmit={handleLogin} className={cx('login-input')}>
                    <label>Email:</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter Username/Email address"
                        autoComplete="username"
                    />
                    <label>Password:</label>
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

                    <button type="submit">Log in</button>
                    <div className={cx('to-register')}>
                        <div>Don’t have an account? </div>
                        <Link className={cx('link')} to={'/register'}>
                            Sign up
                        </Link>
                    </div>
                    {error && <span className={cx('error')}>{error}</span>}
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
