import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const productToAdd = action.payload;
            const existingCartItem = state.cartItems.find((item) => item.id === productToAdd.id);
            if (existingCartItem) {
                existingCartItem.quantity += 1;
            } else {
                state.cartItems.push({ ...productToAdd, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            const productId = action.payload;
            state.cartItems = state.cartItems.filter((item) => item.id !== productId);
        },
        updateCartItemQuantity: (state, action) => {
            const { productId, quantity } = action.payload;
            const cartItem = state.cartItems.find((item) => item.id === productId);
            if (cartItem) {
                cartItem.quantity = quantity;
            }
        },
        clearCart: (state) => {
            state.cartItems = [];
        },
    },
});

export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
