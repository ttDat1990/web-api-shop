import CategoryItemS1 from '~/components/CategoryItemS1/CategoryItemS1';
import ProductItemS1 from '~/components/ProductItemS1/ProductItemS1';
import Slider from '~/components/Slider';

const apiUrl = 'http://127.0.0.1:8000/api/slides';

function Home() {
    return (
        <div className="wrapper">
            <Slider apiUrl={apiUrl} />
            <CategoryItemS1></CategoryItemS1>
            <ProductItemS1></ProductItemS1>
        </div>
    );
}

export default Home;
