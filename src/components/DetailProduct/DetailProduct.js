import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './DetailProduct.module.scss';
import classNames from 'classnames/bind';
import { getDetailsProductsById } from '~/components/ApiUrl';

const cx = classNames.bind(styles);

function DetailProduct() {
    const { productId } = useParams();
    const [product, setProduct] = useState([]);

    useEffect(() => {
        axios
            .get(`${getDetailsProductsById}${productId}`)
            .then((response) => {
                setProduct(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [productId]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('grid')}>
                <div className={cx('product-image')}>
                    <img src={product.image_url} alt={product.name} />
                </div>
                <div className={cx('product-info')}>
                    <div className={cx('product-name')}>{product.name}</div>
                    <div className={cx('product-price')}>$ {product.price}</div>
                    <div className={cx('product-highlight')}>
                        <div className={cx('highlight-title')}>Highlights:</div>
                        <div className={cx('highlight-detail')}>
                            <ul>
                                <li>Two-way zip closure.</li>
                                <li>Top carry handle; padded, adjustable shoulder straps.</li>
                                <li>Flat base with protective feet for stability.</li>
                                <li>Nylon with leather trim.</li>
                                <li>Designer Laptopbags.</li>
                            </ul>
                        </div>
                    </div>
                    <div className={cx('product-action')}>
                        <button className={cx('product-add')}>Add to cart</button>
                        <button className={cx('product-buy')}>Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailProduct;
