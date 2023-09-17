import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './AdminSidebar.module.scss';
import { Link } from 'react-router-dom';
import { useAuth } from '~/components/AuthContext/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBox,
    faHouse,
    faRectangleList,
    faSignOutAlt,
    faSquarePlus,
    faTable,
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const AdminSidebar = () => {
    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
    const { logout } = useAuth();

    const toggleDropdown = (index) => {
        setOpenDropdownIndex(index === openDropdownIndex ? null : index);
    };

    return (
        <div className={cx('sidebar')}>
            <div className={cx('sidebar-item')}>
                <Link to={'/admin/home'} className={cx('item-title')}>
                    <FontAwesomeIcon icon={faHouse} />
                    <span> Home</span>
                </Link>
            </div>
            <div className={cx('sidebar-item')}>
                <div className={cx('item-title')} onClick={() => toggleDropdown(1)}>
                    <FontAwesomeIcon icon={faTable} />
                    <span>Product</span>
                </div>
                {openDropdownIndex === 1 && (
                    <div className={cx('dropdown-content')}>
                        <Link to={'/admin/addProduct'}>
                            <FontAwesomeIcon icon={faSquarePlus} />
                            <span>Add new Product</span>
                        </Link>
                        <Link to={'/admin/listProduct'}>
                            <FontAwesomeIcon icon={faRectangleList} />
                            <span>List of Products</span>
                        </Link>
                    </div>
                )}
            </div>
            <div className={cx('sidebar-item')}>
                <div className={cx('item-title')} onClick={() => toggleDropdown(2)}>
                    <FontAwesomeIcon icon={faBox} />
                    <span>Category</span>
                </div>
                {openDropdownIndex === 2 && (
                    <div className={cx('dropdown-content')}>
                        <a href="/">
                            <FontAwesomeIcon icon={faSquarePlus} />
                            <span>Add new Category</span>
                        </a>
                        <Link to={'/admin/listCategory'}>
                            <FontAwesomeIcon icon={faRectangleList} />
                            <span>List of Category</span>
                        </Link>
                    </div>
                )}
            </div>
            <div className={cx('sidebar-item')} onClick={logout}>
                <div className={cx('item-title')}>
                    <>
                        <FontAwesomeIcon icon={faSignOutAlt} />
                    </>
                    <span>Log out</span>
                </div>
            </div>
        </div>
    );
};

export default AdminSidebar;
