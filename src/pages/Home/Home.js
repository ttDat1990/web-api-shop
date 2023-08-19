import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryItemS1 from '~/components/CategoryItemS1/CategoryItemS1';

function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Gọi API để lấy dữ liệu
        axios
            .get('http://127.0.0.1:8000/api/categories') // Thay đổi đường dẫn API tại đây
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className="wrapper">
            <CategoryItemS1></CategoryItemS1>
        </div>
    );
}

export default Home;
