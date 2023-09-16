import classNames from 'classnames/bind';
import styles from './UserFooter.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPhone, faPrint } from '@fortawesome/free-solid-svg-icons';
import { faClock, faEnvelope } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function UserFooter() {
    return (
        <>
            <div>
                <div className={cx('footer-title1')}>
                    <h4> Subscribe to Our Newsletter</h4>
                    <p> Subscribe today and get special offers, coupons and news.</p>
                </div>
            </div>
            <div className={cx('footer')}>
                <div className={cx('footer-contact')}>
                    <div className={cx('footer-contact1')}>
                        <a href="/" className={cx('footer-title')}>
                            PRESSMART
                        </a>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. luctus nec ullamcorper mattis.</p>
                        <ul>
                            <li>
                                <FontAwesomeIcon icon={faHome} />
                                <a href="/">115 Eighth Avenue North, New York City</a>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faPhone} />
                                <a href="/">1-661-395-1234</a>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faPrint} />
                                <a href="/">1-661-395-1234</a>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faEnvelope} />
                                <a href="/">support@pressmart.com</a>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faClock} />
                                <a href="/">Mon - Fri / 9:00 AM - 6:00 PM</a>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('footer-contact2')}>
                        <h2>Information</h2>
                        <ul>
                            <li>
                                <a href="/">About us</a>
                            </li>
                            <li>
                                <a href="/">Store Location</a>
                            </li>
                            <li>
                                <a href="/">Contact us</a>
                            </li>
                            <li>
                                <a href="/">Shipping & Delivery</a>
                            </li>
                            <li>
                                <a href="/">Latest News</a>
                            </li>
                            <li>
                                <a href="/">Our Sitemap</a>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('footer-contact2')}>
                        <h2>Our Service</h2>
                        <ul>
                            <li>
                                <a href="/">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="/">Terms of Sale</a>
                            </li>
                            <li>
                                <a href="/">Customer Service</a>
                            </li>
                            <li>
                                <a href="/">Delivery Information</a>
                            </li>
                            <li>
                                <a href="/">Payments</a>
                            </li>
                            <li>
                                <a href="/">Saved Cards</a>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('footer-contact2')}>
                        <h2>My Account</h2>
                        <ul>
                            <li>
                                <a href="/">My Account</a>
                            </li>
                            <li>
                                <a href="/">My Shop</a>
                            </li>
                            <li>
                                <a href="/">My Cart</a>
                            </li>
                            <li>
                                <a href="/">Checkout</a>
                            </li>
                            <li>
                                <a href="/">My Wishlist</a>
                            </li>
                            <li>
                                <a href="/">Tracking Order</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={cx('footer-infor')}>
                    <div className={cx('copyright')}>
                        <p>© 2023 presslayouts.com. All Rights Reserved.</p>
                    </div>
                    <div className={cx('payfee')}>
                        <img src="./assets/image/payments-method.png" alt="" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserFooter;
