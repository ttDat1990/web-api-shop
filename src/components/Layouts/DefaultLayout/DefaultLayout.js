import TopHeader from '~/components/Layouts/components/TopHeader';
import MidHeader from '~/components/Layouts/components/MidHeader';
import MainHeader from '~/components/Layouts/components/MainHeader';
import UserFooter from '~/components/Layouts/components/UserFooter';

function DefaultLayout({ children }) {
    return (
        <div>
            <header className="headers-container">
                <TopHeader />
                <MidHeader />
                <MainHeader />
            </header>
            <div className="container">{children}</div>
            <footer>
                <UserFooter />
            </footer>
        </div>
    );
}

export default DefaultLayout;
