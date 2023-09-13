import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers/cartSlice'; // Đảm bảo import reducer của giỏ hàng

const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
});

export default store;
