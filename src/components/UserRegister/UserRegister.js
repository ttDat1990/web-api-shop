import React, { useState } from 'react';
import { useAuth } from '~/components/AuthContext/AuthContext';
import { Link } from 'react-router-dom';
import styles from './UserRegister.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const UserRegister = () => {
    const { register } = useAuth();
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { name, email, password } = formData;
            const registerSuccessful = await register(name, email, password);
            if (!registerSuccessful) {
                setError('Register error. Please check your informations again.');
            }
        } catch (error) {
            console.error('Registration failed:', error);
            setError('Register error. Please check your informations again.');
        }
    };

    return (
        <div className={cx('container')}>
            <div className={cx('grid')}>
                <div className={cx('register-title')}>
                    <h4>Register</h4>
                    <span>Get access to your</span>
                    <span>Orders, Wishlist and</span>
                    <span>Recommendations.</span>
                </div>
                <form onSubmit={handleSubmit} className={cx('register-input')}>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your Name"
                    />
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your Name"
                    />
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Enter your Name"
                    />

                    <button type="submit">Register</button>
                    <div className={cx('to-register')}>
                        <div>Already have an account? </div>
                        <Link className={cx('link')} to={'/user/login'}>
                            Log in
                        </Link>
                    </div>
                    {error && <span className={cx('error')}>{error}</span>}
                </form>
            </div>
        </div>
    );
};

export default UserRegister;
