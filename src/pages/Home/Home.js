import AllCategories from '~/components/AllCategories';
import AllProducts from '~/components/AllProducts';
import Slider from '~/components/Slider';

const slidesApiUrl = 'http://127.0.0.1:8000/api/slides';
const productsApiUrl = 'http://127.0.0.1:8000/api/products';
const categoriesApiUrl = 'http://127.0.0.1:8000/api/categories';

function Home() {
    return (
        <div className="wrapper">
            <Slider apiUrl={slidesApiUrl} />
            <AllCategories apiUrl={categoriesApiUrl} />
            <AllProducts apiUrl={productsApiUrl} />
        </div>
    );
}

export default Home;
