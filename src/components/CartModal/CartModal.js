import classNames from 'classnames/bind';
import styles from './CartModal.module.scss';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCartItemQuantity } from '~/reducers/cartSlice';

const cx = classNames.bind(styles);

function CartModal({ onCloseModal }) {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();

    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId)); // Gửi action removeFromCart để xóa sản phẩm khỏi giỏ hàng
    };

    const updateQuantityHandler = (productId, action) => {
        const cartItem = cartItems.find((item) => item.id === productId);

        if (cartItem) {
            let newQuantity = cartItem.quantity;
            if (action === 'decrement' && newQuantity > 1) {
                newQuantity -= 1;
            } else if (action === 'increment') {
                newQuantity += 1;
            } else if (action === 'decrement' && newQuantity === 1) {
                dispatch(removeFromCart(productId));
            }

            dispatch(updateCartItemQuantity({ productId, quantity: newQuantity })); // Gửi action updateCartItemQuantity để cập nhật số lượng sản phẩm trong giỏ hàng
        }
    };
    const handleTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };
    return (
        <div className={cx('overlay')} onClick={onCloseModal}>
            <div className={cx('cart-modal')} onClick={(e) => e.stopPropagation()}>
                <div className={cx('cart-header')}>
                    <div>Shopping Cart</div>
                    <span onClick={onCloseModal}>&times;</span>
                </div>
                <div className={cx('cart-items')}>
                    {cartItems.map((item) => (
                        <div key={item.id} className={cx('cart-item')}>
                            <div className={cx('item-image')}>
                                <img src={item.image_url} alt={item.name} />
                            </div>
                            <div className={cx('item-info')}>
                                <div className={cx('item-name')}>{item.name}</div>

                                <div className={cx('item-actions')}>
                                    <button onClick={() => updateQuantityHandler(item.id, 'decrement')}>-</button>
                                    <div className={cx('item-quantity')}>{item.quantity}</div>
                                    <button onClick={() => updateQuantityHandler(item.id, 'increment')}>+</button>
                                    <span className={cx('remove-item')} onClick={() => removeFromCartHandler(item.id)}>
                                        &times;
                                    </span>
                                </div>
                                <div className={cx('item-price')}>
                                    {item.quantity} x ${item.price}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={cx('checkout-info')}>
                <div className={cx('total-price')}>
                    <div>Subtotal Price:</div>
                    <span>$ {handleTotalPrice()}</span>
                </div>
                <button>Checkout</button>
            </div>
        </div>
    );
}

export default CartModal;
