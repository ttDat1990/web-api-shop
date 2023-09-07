import React, { useState } from 'react';
import { useAuth } from '~/components/AuthContext/AuthContext';

function UserLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await login(email, password, 'user');
            if (await login(email, password, 'user')) {
            }
        } catch (err) {
            setError('Đăng nhập không thành công. Vui lòng kiểm tra thông tin đăng nhập.');
        }
    };

    return (
        <form onSubmit={handleLogin}>
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
            <div>
                <div>
                    <input type="checkbox" name="remember" />
                    <label htmlFor="remember"> Remember me</label>
                </div>
                <a href="/">Lost your password?</a>
            </div>
            {error && <span>{error}</span>}
            <button type="submit">Log in</button>
        </form>
    );
}

export default UserLogin;
