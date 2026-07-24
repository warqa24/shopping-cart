import { useEffect, useState } from "react";

function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            fetch('https://fakestoreapi.com/products')
                .then(response => response.json())
                .then((data => {
                    const newProducts = data.map(obj => ({ ...obj, quantity: 0 }))
                    setProducts(newProducts);
                })
                );

        }

        fetchProducts();

    }, []);


    return (
        <div className="flex flex-col items-center">
            {products.map((product) => (
                <div key={product.id} className="m-5 p-3 border-2 border-solid border-black">
                    <p>{product.title}</p>
                    <img src={product.image} alt="product-image" className="size-48 align-center flex justify-center" />
                    <p>${product.price}</p>
                    <div className="flex">
                        <button onClick={() => { product.quantity + 1 }}>+</button>
                        <input
                            type="text"
                            value={product.quantity}
                            onChange={(e) => {
                                product.quantity = e.target.value
                            }}
                            className="border-2 border-black" />
                        <button onClick={() => { product.quantity - 1 }}>-</button>
                    </div>
                </div>
            ))}
        </div>
    )

}

export default Products;