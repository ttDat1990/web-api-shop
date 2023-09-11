import classNames from 'classnames/bind';
import styles from './CartModal.module.scss';

const cx = classNames.bind(styles);

function CartModal({ cartItems, onCloseModal, onRemoveItem, onUpdateQuantity }) {
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
                                    <button onClick={() => onUpdateQuantity(item.id, 'decrement')}>-</button>
                                    <div className={cx('item-quantity')}>{item.quantity}</div>
                                    <button onClick={() => onUpdateQuantity(item.id, 'increment')}>+</button>
                                    <span className={cx('remove-item')} onClick={() => onRemoveItem(item.id)}>
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
