import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AllProducts.module.scss';
import classNames from 'classnames/bind';
import ProductItemS1 from '~/components/ProductItemS1';

const cx = classNames.bind(styles);

function AllProducts({ apiUrl }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
            .get(apiUrl)
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [apiUrl]);

    const productItems = products.map((product) => (
        <ProductItemS1
            key={product.id}
            imageUrl={product.image_url}
            name={product.name}
            price={product.price}
            categoryId={product.category_id}
        />
    ));

    return (
        <div className={cx('wrapper')}>
            <div className={cx('grid')}>{productItems}</div>
        </div>
    );
}

export default AllProducts;
