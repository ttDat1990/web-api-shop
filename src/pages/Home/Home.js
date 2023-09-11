import AllCategories from '~/components/AllCategories';
import AllProducts from '~/components/AllProducts';
import { getAllCategories, getAllProducts, getAllSlides } from '~/components/ApiUrl';
import Slider from '~/components/Slider';
import Title from '~/components/Title';

function Home() {
    return (
        <div className="wrapper">
            <Slider apiUrl={getAllSlides} />
            <AllCategories apiUrl={getAllCategories} />
            <Title>Deals of The Day</Title>
            <AllProducts apiUrl={getAllProducts} limit={5} />
        </div>
    );
}

export default Home;
