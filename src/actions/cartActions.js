export const addToCart = (product) => ({
    type: 'ADD_TO_CART',
    payload: product,
});

export const removeFromCart = (productId) => ({
    type: 'REMOVE_FROM_CART',
    payload: productId,
});

export const updateCartItemQuantity = (productId, quantity) => ({
    type: 'UPDATE_CART_ITEM_QUANTITY',
    payload: { id: productId, quantity },
});
