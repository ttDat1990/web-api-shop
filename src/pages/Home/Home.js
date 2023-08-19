import CategoryItemS1 from '~/components/CategoryItemS1/CategoryItemS1';
import ProductItemS1 from '~/components/ProductItemS1/ProductItemS1';
import Slider from '~/components/Slider';

function Home() {

    return (
        <div className="wrapper">
            <Slider></Slider>
            <CategoryItemS1></CategoryItemS1>
            <ProductItemS1></ProductItemS1>
        </div>
    );
}

export default Home;
