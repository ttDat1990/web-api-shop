import Home from '~/pages/Home';
import Cart from '~/pages/Cart';
import Products from '~/pages/Products';
import ProductDetails from '~/pages/ProductDetails';
import ProductsByCategory from '~/components/ProductsByCategory';
import Admin from '~/pages/Admin';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/cart', component: Cart },
    { path: '/products', component: Products },
    { path: '/product/:productId', component: ProductDetails },
    { path: '/category/:categoryId', component: ProductsByCategory },
    { path: '/products/:productId', component: ProductDetails },
];

const privateRoutes = [{ path: '/admin', component: Admin }];

export { privateRoutes, publicRoutes };
