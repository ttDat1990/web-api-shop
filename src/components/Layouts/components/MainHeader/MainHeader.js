import classNames from 'classnames/bind';
import styles from './MainHeader.module.scss';
import Dropdown from '~/components/Dropdown/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function MainHeader() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('grid')}>
                <Dropdown
                    placement={'bottom'}
                    content={
                        <div className={cx('dropdown')}>
                            <div className={cx('dropdown-item')}>
                                <div>Men's Clothing</div>
                                <span>
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </span>
                            </div>
                            <div className={cx('dropdown-item')}>
                                <div>Women's Clothing</div>
                                <span>
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </span>
                            </div>

                            <div className={cx('dropdown-item')}>Accessories</div>
                        </div>
                    }
                >
                    <li className={cx('side-nav')}>
                        <div>Shopping By Categories</div>
                        <span>
                            <FontAwesomeIcon icon={faBars} />
                        </span>
                    </li>
                </Dropdown>
                <div className={cx('nav-item-container')}>
                    <a href="/" className={cx('nav-item')}>
                        Home
                    </a>
                    <Dropdown
                        offset={[177, 0]}
                        tooltipWidth="1180px"
                        placement={'bottom'}
                        content={
                            <div className={cx('dropdown-1')}>
                                <div className={cx('dropdown-column')}>
                                    <div className={cx('dropdown-item', 'dropdown-title')}>Shop Page Layouts</div>
                                    <div className={cx('dropdown-item')}>Full Width Layouts</div>
                                    <div className={cx('dropdown-item')}>Left Sidebar</div>
                                    <div className={cx('dropdown-item')}>Right Sidebar</div>
                                    <div className={cx('dropdown-item')}>Products Grid</div>
                                    <div className={cx('dropdown-item')}>Products List</div>
                                    <div className={cx('dropdown-item')}>Infinity Scroll</div>
                                    <div className={cx('dropdown-item')}>Ajax Load More</div>
                                    <div className={cx('dropdown-item')}>Ajax Filter</div>
                                    <div className={cx('dropdown-item')}>Off Canvas Sidebar</div>
                                </div>
                                <div className={cx('dropdown-column')}>
                                    <div className={cx('dropdown-item', 'dropdown-title')}>Products Style</div>
                                    <div className={cx('dropdown-item')}>Products Style 1</div>
                                    <div className={cx('dropdown-item')}>Products Style 2</div>
                                    <div className={cx('dropdown-item')}>Products Style 3</div>
                                    <div className={cx('dropdown-item')}>Products Style 4</div>
                                    <div className={cx('dropdown-item')}>Products Style 5</div>
                                    <div className={cx('dropdown-item')}>Categories Style 1</div>
                                    <div className={cx('dropdown-item')}>Categories Style 2</div>
                                    <div className={cx('dropdown-item')}>Categories Style 3</div>
                                    <div className={cx('dropdown-item')}>Categories Style 4</div>
                                </div>
                                <div className={cx('dropdown-column')}>
                                    <div className={cx('dropdown-item', 'dropdown-title')}>Product Pages</div>
                                    <div className={cx('dropdown-item')}>Thumbnails Left</div>
                                    <div className={cx('dropdown-item')}>Thumbnails Bottom</div>
                                    <div className={cx('dropdown-item')}>Gallery Grid</div>
                                    <div className={cx('dropdown-item')}>Sticky Info</div>
                                    <div className={cx('dropdown-item')}>Gallery Horizontal</div>
                                    <div className={cx('dropdown-item')}>Gallery Center</div>
                                    <div className={cx('dropdown-item')}>Bought Together After</div>
                                    <div className={cx('dropdown-item')}>Summary</div>
                                    <div className={cx('dropdown-item')}>Bought Together In Tab</div>
                                </div>
                                <div className={cx('dropdown-column')}>
                                    <div className={cx('dropdown-item', 'dropdown-title')}>Product Pages</div>
                                    <div className={cx('dropdown-item')}>360 Degree View</div>
                                    <div className={cx('dropdown-item')}>Accordion Style</div>
                                    <div className={cx('dropdown-item')}>Accessories</div>
                                    <div className={cx('dropdown-item')}>Accessories</div>
                                    <div className={cx('dropdown-item')}>Accessories</div>
                                    <div className={cx('dropdown-item')}>Accessories</div>
                                    <div className={cx('dropdown-item')}>Accessories</div>
                                    <div className={cx('dropdown-item')}>Accessories</div>
                                    <div className={cx('dropdown-item')}>Accessories</div>
                                </div>
                                <div className={cx('dropdown-column')}>
                                    <div className={cx('dropdown-item', 'dropdown-title')}>WooCommerce Pages</div>
                                    <div className={cx('dropdown-item')}>Accessories</div>
                                    <div className={cx('dropdown-item')}>Accessories</div>
                                    <div className={cx('dropdown-item')}>Accessories</div>
                                    <div className={cx('dropdown-item')}>Accessories</div>
                                    <div className={cx('dropdown-item')}>Accessories</div>
                                    <div className={cx('dropdown-item')}>Accessories</div>
                                    <div className={cx('dropdown-item')}>Accessories</div>
                                    <div className={cx('dropdown-item')}>Accessories</div>
                                    <div className={cx('dropdown-item')}>Accessories</div>
                                </div>
                            </div>
                        }
                    >
                        <li className={cx('nav-item')}>
                            <div>All Shop</div>
                            <span>
                                <FontAwesomeIcon icon={faChevronDown} />
                            </span>
                        </li>
                    </Dropdown>
                    <a href="/" className={cx('nav-item')}>
                        Shipping
                    </a>
                    <a href="/" className={cx('nav-item')}>
                        Contact Us
                    </a>
                    <a href="/" className={cx('nav-item')}>
                        FeedBack
                    </a>
                </div>
            </div>
        </header>
    );
}

export default MainHeader;
