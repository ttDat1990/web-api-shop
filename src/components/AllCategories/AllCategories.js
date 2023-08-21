import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AllCategories.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function AllCategories({ apiUrl }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios
            .get(apiUrl)
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [apiUrl]);

    const categoryItems = categories.map((category) => (
        <Link key={category.id} to={`/category/${category.id}`} className={cx('wrapper-link')}>
            <div className={cx('category-image')}>
                <img src={category.image_url} alt={category.name} />
            </div>
            <div className={cx('category-title')}>{category.name}</div>
        </Link>
    ));

    return (
        <div className={cx('wrapper')}>
            <div className={cx('grid')}>{categoryItems}</div>
        </div>
    );
}

export default AllCategories;
