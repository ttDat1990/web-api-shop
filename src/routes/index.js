import Home from '~/pages/Home';
import Cart from '~/pages/Cart';
import Products from '~/pages/Products';
import ProductDetails from '~/pages/ProductDetails';
import ProductsByCategory from '~/components/ProductsByCategory';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/cart', component: Cart },
    { path: '/products', component: Products },
    { path: '/product/:productId', component: ProductDetails },
    { path: '/category/:categoryId', component: ProductsByCategory },
];

const privateRoutes = [];

export { privateRoutes, publicRoutes };
