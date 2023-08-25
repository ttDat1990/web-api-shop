import classNames from 'classnames/bind';
import styles from './SidebarItem.module.scss';

const cx = classNames.bind(styles);

const SidebarItem = ({ title, children, isOpen, onToggle }) => {
    return (
        <div className={cx('sidebar-item', { open: isOpen })}>
            <div className={cx('item-title')} onClick={onToggle}>
                {title}
            </div>
            {isOpen && <div className={cx('dropdown-content')}>{children}</div>}
        </div>
    );
};

export default SidebarItem;
