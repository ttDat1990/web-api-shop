import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AllProducts.module.scss';
import classNames from 'classnames/bind';
import ProductItemS1 from '~/components/ProductItemS1';
import CartModal from '~/components/CartModal';

const cx = classNames.bind(styles);

function AllProducts({ apiUrl, priceCondition, limit }) {
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);

    useEffect(() => {
        let apiURL = apiUrl;

        apiURL += priceCondition ? `?price_condition=${priceCondition}` : '';

        apiURL += limit ? (priceCondition ? `&limit=${limit}` : `?limit=${limit}`) : '';

        axios
            .get(apiURL)
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [apiUrl, priceCondition, limit]);

    const addToCart = (productId) => {
        const productToAdd = products.find((product) => product.id === productId.productId);

        if (!productToAdd) return;

        const existingCartItem = cartItems.find((item) => item.id === productId.productId);
        if (existingCartItem) {
            setCartItems(
                cartItems.map((item) =>
                    item.id === productId.productId ? { ...item, quantity: item.quantity + 1 } : item,
                ),
            );
        } else {
            setCartItems([...cartItems, { ...productToAdd, quantity: 1 }]);
        }
        setIsCartModalOpen(true);
    };
    const removeFromCart = (productId) => {
        setCartItems((prevCartItems) => {
            return prevCartItems.filter((item) => item.id !== productId);
        });
    };

    const updateQuantity = (productId, action) => {
        setCartItems((prevCartItems) => {
            const updatedCartItems = prevCartItems.map((item) => {
                if (item.id === productId) {
                    if (action === 'decrement') {
                        if (item.quantity > 1) {
                            return { ...item, quantity: item.quantity - 1 };
                        } else {
                            // Không trả về gì để xóa sản phẩm này khỏi mảng
                            return null;
                        }
                    } else if (action === 'increment') {
                        return { ...item, quantity: item.quantity + 1 };
                    }
                }
                return item;
            });

            // Loại bỏ sản phẩm có giá trị null (đã bị xóa)
            return updatedCartItems.filter((item) => item !== null);
        });
    };

    const productItems = products.map((product) => (
        <ProductItemS1
            key={product.id}
            imageUrl={product.image_url}
            name={product.name}
            price={product.price}
            categoryName={product.category_name}
            productId={product.id}
            onClickAddToCart={addToCart}
        />
    ));

    console.log(cartItems);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('grid')}>{productItems}</div>
            {isCartModalOpen && (
                <CartModal
                    cartItems={cartItems}
                    onCloseModal={() => setIsCartModalOpen(false)}
                    onRemoveItem={removeFromCart}
                    onUpdateQuantity={updateQuantity}
                />
            )}
        </div>
    );
}

export default AllProducts;
