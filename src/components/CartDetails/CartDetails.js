import classNames from 'classnames/bind';
import styles from './CartDetails.module.scss';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCartItemQuantity } from '~/reducers/cartSlice';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function CartDetails() {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();

    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
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

            dispatch(updateCartItemQuantity({ productId, quantity: newQuantity }));
        }
    };
    const handleTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div className={cx('container')}>
            <div className={cx('cart-container')}>
                <table className={cx('cart-table')}>
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item) => (
                            <tr key={item.id} className={cx('cart-item')}>
                                <td>
                                    <span className={cx('remove-item')} onClick={() => removeFromCartHandler(item.id)}>
                                        &times;
                                    </span>
                                </td>
                                <td>
                                    <div className={cx('item-image')}>
                                        <img src={item.image_url} alt={item.name} />
                                    </div>
                                </td>
                                <td>
                                    <div className={cx('item-name')}>{item.name}</div>
                                </td>
                                <td>
                                    <div className={cx('item-price')}>${item.price}</div>
                                </td>
                                <td>
                                    <div className={cx('item-actions')}>
                                        <button onClick={() => updateQuantityHandler(item.id, 'decrement')}>-</button>
                                        <span className={cx('item-quantity')}>{item.quantity}</span>
                                        <button onClick={() => updateQuantityHandler(item.id, 'increment')}>+</button>
                                    </div>
                                </td>
                                <td>
                                    <div className={cx('item-price')}>${item.price * item.quantity}</div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={cx('cart-total')}>
                <div className={cx('check-out')}>
                    <div className={cx('title')}>Cart totals</div>
                    <div className={cx('subtotal')}>
                        <div>Subtotal</div>
                        <span>$ {handleTotalPrice()}</span>
                    </div>
                    <div className={cx('discount')}>
                        <div>Discount</div>
                        <span>0.00</span>
                    </div>
                    <div className={cx('total')}>
                        <div>Total</div>
                        <span>{handleTotalPrice()}</span>
                    </div>

                    <Link to={'/user/checkout'} className={cx('checkout-button')}>
                        Proceed to Checkout
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CartDetails;
