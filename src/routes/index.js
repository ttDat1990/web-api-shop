import Home from '~/pages/Home';
import Cart from '~/pages/Cart';
import Products from '~/pages/Products';
import ProductDetails from '~/pages/ProductDetails';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/cart', component: Cart },
    { path: '/products', component: Products },
    { path: '/productdetails', component: ProductDetails },
];

const privateRoutes = [];

export { privateRoutes, publicRoutes };
