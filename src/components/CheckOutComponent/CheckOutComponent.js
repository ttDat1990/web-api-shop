import classNames from 'classnames/bind';
import styles from './CheckOutComponent.module.scss';
import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useAuth } from '~/components/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCartItemQuantity, clearCart } from '~/reducers/cartSlice';
import { orderUrl, orderDetailsUrl } from '~/components/ApiUrl';

const cx = classNames.bind(styles);

function CheckOutComponent() {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    const { userId } = useAuth();
    const navigate = useNavigate();

    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

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
        const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        return totalPrice.toFixed(2);
    };

    const handleCheckout = async () => {
        const order = {
            user_id: userId,
            fullname: fullName,
            address: address,
            phone: phoneNumber,
        };

        try {
            const response = await axios.post(`${orderUrl}`, order);
            const orderId = response.data.order.id;
            for (const cartItem of cartItems) {
                const orderDetail = {
                    order_id: orderId,
                    product_id: cartItem.id,
                    quantity: cartItem.quantity,
                    price: cartItem.price,
                };

                await axios.post(`${orderDetailsUrl}`, orderDetail);
            }
            dispatch(clearCart());
            navigate('/');
        } catch (error) {
            console.error('Checkout Error: ', error);
        }
    };

    return (
        <div className={cx('container')}>
            <div className={cx('customer-info')}>
                <div>Billing details</div>
                <label>Full name:</label>
                <input
                    type="text"
                    placeholder="Enter full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
                <label>Address:</label>
                <input
                    type="text"
                    placeholder="Enter address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <label>Phone number:</label>
                <input
                    type="text"
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
            </div>
            <div className={cx('order-detail')}>
                <div className={cx('cart-header')}>Your order</div>
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
                                </div>
                            </div>
                            <div className={cx('item-price')}>${item.price}</div>
                        </div>
                    ))}
                </div>
                <div className={cx('subtotal')}>
                    <div>Subtotal</div>
                    <span>$ {handleTotalPrice()}</span>
                </div>
                <div className={cx('discount')}>
                    <div>Discount</div>
                    <span>0%</span>
                </div>
                <div className={cx('total')}>
                    <div>Total</div>
                    <span>$ {handleTotalPrice()}</span>
                </div>
                <div className={cx('order')}>
                    <div>
                        Your personal data will be used to process your order, support your experience throughout this
                        website, and for other purposes described in our privacy policy.
                    </div>
                    <button onClick={handleCheckout}>Place order</button>
                </div>
            </div>
        </div>
    );
}

export default CheckOutComponent;
