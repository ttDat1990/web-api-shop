import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUrl, logoutUrl, registerUrl, adminLoginUrl, adminLogoutUrl } from '~/components/ApiUrl';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState();
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Gọi localStorage ở đây để đảm bảo rằng giá trị đã được cập nhật trước khi lưu
        localStorage.setItem('role', role);
    }, [role]);

    const login = async (email, password, userType) => {
        try {
            let url = '';

            if (userType === 'admin') {
                // Đường dẫn đăng nhập cho admin
                url = adminLoginUrl; // Thay đổi thành URL đăng nhập của admin
            } else {
                // Đường dẫn đăng nhập cho người dùng
                url = loginUrl; // Thay đổi thành URL đăng nhập của người dùng
            }
            const response = await axios.post(url, {
                email: email,
                password: password,
            });

            if (response.status === 200) {
                const { userToken, token, user_id } = response.data;

                if (userToken && userType !== 'admin') {
                    localStorage.setItem('userToken', userToken);
                    setRole('user');
                    setUserId(user_id);
                    navigate('/');
                } else {
                    localStorage.setItem('token', token);
                    setRole('admin');
                    navigate('/admin/home');
                }
                setIsLoggedIn(true);

                return true;
            }
        } catch (error) {
            console.error(error);
        }
        return false;
    };

    const logout = async () => {
        try {
            let tokenName = '';
            let currentLogoutUrl = '';
            let redirectPath = '';

            if (role === 'admin') {
                tokenName = 'token'; // Sử dụng token của admin
                currentLogoutUrl = adminLogoutUrl; // Sử dụng URL đăng xuất của admin
                redirectPath = '/admin/login'; // Chuyển hướng admin đến '/admin/login'
            } else {
                tokenName = 'userToken'; // Sử dụng token của người dùng
                currentLogoutUrl = logoutUrl; // Sử dụng URL đăng xuất của người dùng
                redirectPath = '/'; // Chuyển hướng người dùng thông thường đến '/'
            }

            const response = await axios.post(currentLogoutUrl, null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(tokenName)}`,
                },
            });

            if (response.status === 200) {
                setIsLoggedIn(false);
                localStorage.removeItem(tokenName);
                navigate(redirectPath); // Chuyển hướng đến đúng địa chỉ sau khi đăng xuất
            }
        } catch (error) {
            console.error(error);
        }
    };

    const register = async (name, email, password) => {
        try {
            const response = await axios.post(`${registerUrl}`, {
                name,
                email,
                password,
            });

            if (response.status === 201) {
                const userToken = response.data.userToken;
                localStorage.setItem('userToken', userToken);
                navigate('/');
                setIsLoggedIn(true);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, role, userId, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
