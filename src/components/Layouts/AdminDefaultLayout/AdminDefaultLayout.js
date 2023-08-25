import AdminSidebar from '../components/AdminSidebar/AdminSidebar';
import classNames from 'classnames/bind';
import styles from './AdminDefaultLayout.module.scss';

const cx = classNames.bind(styles);

function AdminDefaultLayout({ children }) {
    return (
        <div className={cx('container')}>
            <header className={cx('sidebar')}>
                <AdminSidebar />
            </header>
            <div className={cx('content')}>{children}</div>
        </div>
    );
}

export default AdminDefaultLayout;
