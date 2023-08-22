import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './ProductsByCategory.module.scss';
import classNames from 'classnames/bind';
import ProductItemS1 from '~/components/ProductItemS1';
import { getAllProductsByCategory } from '~/components/ApiUrl';

const cx = classNames.bind(styles);

function ProductsByCategory() {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
            .get(`${getAllProductsByCategory}${categoryId}`)
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [categoryId]);

    const productItems = products.map((product) => (
        <ProductItemS1
            key={product.id}
            imageUrl={product.image_url}
            name={product.name}
            price={product.price}
            categoryName={product.category_name}
            productId={product.id}
        />
    ));

    return (
        <div className={cx('wrapper')}>
            <div className={cx('grid')}>{productItems}</div>
        </div>
    );
}

export default ProductsByCategory;
