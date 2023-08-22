import TopHeader from '~/components/Layouts/components/TopHeader';
import MidHeader from '~/components/Layouts/components/MidHeader';
import MainHeader from '~/components/Layouts/components/MainHeader';

const categoriesApiUrl = 'http://127.0.0.1:8000/api/categories';

function DefaultLayout({ children }) {
    return (
        <div>
            <header className="headers-container">
                <TopHeader />
                <MidHeader />
                <MainHeader apiUrl={categoriesApiUrl} />
            </header>
            <div className="container">{children}</div>
        </div>
    );
}

export default DefaultLayout;
