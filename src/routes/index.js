import Home from '~/pages/Home';
import Cart from '~/pages/Cart';
import Admin from '~/pages/Admin';
import Products from '~/pages/Products';
import AdminLogin from '~/pages/AdminLogin';
import Forbidden from '~/pages/Forbidden';
import ProductDetails from '~/pages/ProductDetails';
import UserLogin from '~/pages/UserLogin';
import AdminProductAdd from '~/pages/AdminProductAdd/AdminProductAdd';
import AdminProductList from '~/pages/AdminProductList/AdminProductList';
import ProductsByCategory from '~/components/ProductsByCategory';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/products', component: Products },
    { path: '/category/:categoryId', component: ProductsByCategory },
    { path: '/products/:productId', component: ProductDetails },
    { path: '/admin/login', component: AdminLogin, layout: null },
    { path: '/user/login', component: UserLogin, layout: null },
    { path: '/forbidden', component: Forbidden, layout: null },
];

const adminRoutes = [
    { path: '/home', component: Admin },
    { path: '/addProduct', component: AdminProductAdd },
    { path: '/listProduct', component: AdminProductList },
];

const userRoutes = [{ path: '/cart', component: Cart }];

export { adminRoutes, userRoutes, publicRoutes };
