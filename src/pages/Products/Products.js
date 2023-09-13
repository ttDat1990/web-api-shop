import AllProducts from '~/components/AllProducts';
import { getAllProducts, getAllCategories } from '~/components/ApiUrl';

function Products() {
    return (
        <div>
            <AllProducts
                apiUrl={getAllProducts}
                cateUrl={getAllCategories}
                allProducts={true}
                paginate={true}
                perPage={8}
            />
        </div>
    );
}

export default Products;
