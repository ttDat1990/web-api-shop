import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import thư viện axios
import styles from './Slider.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Slider = ({ apiUrl, animationDuration = 5000 }) => {
    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        axios
            .get(apiUrl)
            .then((response) => {
                setImages(response.data);
            })
            .catch((error) => {
                console.error('Error fetching images:', error);
            });
    }, [apiUrl]);

    //mỗi khi re-render sẽ setindex tăng lên 1 đén hính típ theo
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, animationDuration);

        return () => {
            clearInterval(interval);
        };
    }, [currentIndex, animationDuration, images.length]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('slideshow')}>
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={cx(
                            'slide',
                            { active: index === currentIndex && index / 2 === 0 },
                            { slide1: index / 2 !== 0 },
                            { active1: index === currentIndex && index / 2 !== 0 },
                        )}
                        style={{ backgroundImage: `url(${image.image_url})` }}
                    >
                        <div
                            className={cx(
                                { title: index === currentIndex && index / 2 === 0 },
                                { title1: index === currentIndex && index / 2 !== 0 },
                            )}
                        >
                            <div className={cx('title-sale')}>Summer Sale</div>
                            <div className={cx('title-category')}>COLLECTIONS</div>
                            <div className={cx('sale-off')}>UPTO 65% OFF</div>
                            <div className={cx('button-wrapper')}>
                                <button className={cx('shop-now')}>Shop Now</button>
                                <button className={cx('read-more')}>Read More</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Slider;
