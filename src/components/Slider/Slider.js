import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import classNames from 'classnames/bind';
import styles from './Slider.module.scss'

const cx = classNames.bind(styles);

const spanStyle = {
    padding: '20px',
    background: '#efefef',
    color: '#000000'
}

const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
}
const slideImages = [
    {
        url: 'https://pressmart.presslayouts.com/wp-content/uploads/2022/07/home-2-slider-1.png',
        caption: 'Slide 1'
    },
    {
        url: 'https://pressmart.presslayouts.com/wp-content/uploads/2022/07/home-2-slider-1.png',
        caption: 'Slide 2'
    },
    {
        url: 'https://pressmart.presslayouts.com/wp-content/uploads/2022/07/home-2-slider-1.png',
        caption: 'Slide 3'
    },
];

function Slider() {
    return (
        <div className="slide-container">
            <Slide>
                {slideImages.map((slideImage, index) => (
                    <div key={index} className={cx('wrapper')}>
                        <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }} className={cx('slide-1')}>
                            <span style={spanStyle}>{slideImage.caption}</span>
                        </div>
                        <div className={cx('title-1')}>
                            Title
                        </div>
                    </div>
                ))}
            </Slide>
        </div>
    )
}

export default Slider;
