import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUrl, logoutUrl, registerUrl, adminLoginUrl } from '~/components/ApiUrl';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState();
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
                const { userToken, token } = response.data;

                if (userToken && userType !== 'admin') {
                    localStorage.setItem('userToken', userToken);
                    setRole('user');
                    navigate('/user/cart');
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
            const response = await axios.post(`${logoutUrl}`, null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                },
            });

            if (response.status === 200) {
                setIsLoggedIn(false);
                localStorage.removeItem('userToken');
                navigate('/');
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
        <AuthContext.Provider value={{ isLoggedIn, role, login, logout, register }}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
