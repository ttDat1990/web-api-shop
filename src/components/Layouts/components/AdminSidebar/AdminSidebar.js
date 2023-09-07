import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './AdminSidebar.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const AdminSidebar = () => {
    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

    const toggleDropdown = (index) => {
        setOpenDropdownIndex(index === openDropdownIndex ? null : index);
    };

    return (
        <div className={cx('sidebar')}>
            <div className={cx('sidebar-item')}>
                <Link to={'/admin/home'} className={cx('item-title')}>
                    Home
                </Link>
            </div>
            <div className={cx('sidebar-item')}>
                <div className={cx('item-title')} onClick={() => toggleDropdown(1)}>
                    Product
                </div>
                {openDropdownIndex === 1 && (
                    <div className={cx('dropdown-content')}>
                        <Link to={'/admin/addProduct'}>Add new Product</Link>
                        <Link to={'/admin/listProduct'}>List of Products</Link>
                    </div>
                )}
            </div>
            <div className={cx('sidebar-item')}>
                <div className={cx('item-title')} onClick={() => toggleDropdown(2)}>
                    Category
                </div>
                {openDropdownIndex === 2 && (
                    <div className={cx('dropdown-content')}>
                        <a href="/">Add new Category</a>
                        <a href="/">List of Category</a>
                    </div>
                )}
            </div>
            <div className={cx('sidebar-item')}>
                <div className={cx('item-title')}>Another Item</div>
            </div>
        </div>
    );
};

export default AdminSidebar;
