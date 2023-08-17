import styles from './TopHeader.module.scss';
import classNames from 'classnames/bind';
import Dropdown from '~/components/Dropdown';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function TopHeader() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('grid')}>
                <ul className={cx('top-header-start')}>
                    <li className={cx('contact-email')}>
                        <FontAwesomeIcon icon={faEnvelope} />
                        <div>support@pressmart.com</div>
                    </li>
                    <li className={cx('contact-phone')}>
                        <FontAwesomeIcon icon={faPhone} />
                        <div>+(123) 4567 890</div>
                    </li>
                </ul>
                <ul className={cx('top-header-end')}>
                    <li className={cx('welcome')}>Welcome to Our Store!</li>

                    <Dropdown
                        content={
                            <>
                                <Button className={cx('dropdown-item')}>Vietnamese</Button>
                                <Button className={cx('dropdown-item')}>English</Button>
                            </>
                        }
                    >
                        <li className={cx('languages')}>
                            Languages
                            <span>
                                <FontAwesomeIcon icon={faChevronDown} />
                            </span>
                        </li>
                    </Dropdown>

                    <Dropdown
                        content={
                            <>
                                <Button className={cx('dropdown-item')}>VND (VN)</Button>
                                <Button className={cx('dropdown-item')}>$ (US)</Button>
                                <Button className={cx('dropdown-item')}>$ (Euro)</Button>
                            </>
                        }
                    >
                        <li className={cx('money-unit')}>
                            Currency unit{' '}
                            <span>
                                <FontAwesomeIcon icon={faChevronDown} />
                            </span>
                        </li>
                    </Dropdown>
                </ul>
            </div>
        </div>
    );
}

export default TopHeader;
