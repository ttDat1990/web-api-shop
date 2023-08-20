import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './CategoryItemS1.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function CategoryItemS1() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/categories')
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const categoryItems = categories.map((category) => (
        <a key={category.id} href="/" className={cx('wrapper-link')}>
            <div className={cx('category-image')}>
                <img src={category.image_url} alt={category.name} />
            </div>
            <div className={cx('category-title')}>{category.name}</div>
        </a>
    ));

    return (
        <div className={cx('wrapper')}>
            <div className={cx('grid')}>{categoryItems}</div>
        </div>
    );
}

export default CategoryItemS1;
