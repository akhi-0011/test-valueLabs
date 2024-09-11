import { useEffect, useState } from "react";
import './ProductTable.css'



// Use the following API and show the Product Name, Description and Image in tabular format. Use CSS to make it visually appealing.



// https://dummyjson.com/products

const ProductTable = () => {
    const [products, setProducts] = useState();

    useEffect(() => {
        fetch("https://dummyjson.com/products")
            .then((response) => response.json())
            .then((data) => setProducts(data.products))
            .catch((error) => console.log("Error occurred while fetching Product-list", error))
    }, []);
    ;

    return (
        <div className="product-table-container">
            <h2> Product List</h2>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>
                            Product Name
                        </th>
                        <th>
                            Description
                        </th>
                        <th>
                            Image
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.map((product) => (
                        <tr key={product.id1}>
                            <td>{product.title}</td>
                            <td>{product.description}</td>
                            <td>
                                <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    className="product-image"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default ProductTable;