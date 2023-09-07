import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '~/components/AuthContext/AuthContext';

const RequireAuth = ({ children, requiredRole }) => {
    const { isLoggedIn, role } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Kiểm tra xem người dùng đã đăng nhập hay chưa
        if (!isLoggedIn && requiredRole === 'user') {
            // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập hoặc trang khác tùy bạn muốn
            navigate('/user/login'); // Đổi đường dẫn thành đường dẫn trang đăng nhập của bạn
        } else if (isLoggedIn && requiredRole && role !== requiredRole) {
            // Kiểm tra vai trò của người dùng và chuyển hướng nếu không phù hợp
            navigate('/forbidden'); // Đổi đường dẫn thành đường dẫn trang không được phép của bạn
        } else if (!isLoggedIn && requiredRole === 'admin') {
            navigate('/admin/login');
        }
    }, [isLoggedIn, role, requiredRole, navigate]);

    // Nếu người dùng đã đăng nhập và có vai trò phù hợp, hiển thị nội dung con
    return <>{children}</>;
};

export default RequireAuth;
