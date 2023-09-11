import styles from './Title.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Title({ children }) {
    return (
        <div className={cx('container')}>
            <div className={cx('title')}>{children}</div>
            <div className={cx('empty')}></div>
        </div>
    );
}

export default Title;
