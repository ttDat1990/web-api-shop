import AllProducts from '~/components/AllProducts';
import { getAllProducts } from '~/components/ApiUrl';

function Products() {
    return (
        <div>
            <AllProducts apiUrl={getAllProducts} />
        </div>
    );
}

export default Products;
