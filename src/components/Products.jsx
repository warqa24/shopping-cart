import { useEffect, useState } from "react";

function Products({ addToCart, cart, increaseQuantity, decreaseQuantity, setQuantity }) {
    const [products, setProducts] = useState([]);
    const [productQuantity, setProductQuantity] = useState({});

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

    function getCartQuantity(productId) {
        const item = cart.find((item) => item.id === productId);

        return item ? item.quantity : 0;
    }

    function getDisplayQuantity(productId) {
        if (productQuantity[productId] !== undefined) {
            return productQuantity[productId];
        }

        const cartQty = getCartQuantity(productId);
        return cartQty > 0 ? cartQty : 1;
    }

    function handleIncrease(productId) {
        const currentQty = getDisplayQuantity(productId);
        setProductQuantity({
            ...productQuantity,
            [productId]: currentQty + 1
        });
    }

    function handleDecrease(productId) {
        const currentQty = getDisplayQuantity(productId);
        if (currentQty > 1) {
            setProductQuantity({
                ...productQuantity,
                [productId]: currentQty - 1
            });
        }
    }

    function handleSetQuantity(productId, value) {
        setProductQuantity({
            ...productQuantity,
            [productId]: value
        });
    }




    return (
        <div className="flex flex-col items-center">
            {products.map((product) => {
                const displayQuantity = getDisplayQuantity(product.id);

                return (

                    <div key={product.id} className="m-5 p-3 border-2 border-solid border-black w-4/10">
                        <p>{product.title}</p>
                        <img src={product.image} alt="product-image" className="size-48 align-center flex justify-center" />
                        <p>${product.price}</p>
                        <div className="flex">
                            <button onClick={() => handleDecrease(product.id)}>-</button>
                            <input
                                type="text"
                                value={displayQuantity}
                                onChange={(e) => handleSetQuantity(product.id, Number(e.target.value))}
                                className="border-2 border-black text-center w-12"
                            />
                            <button onClick={() => handleIncrease(product.id)}>+</button>

                        </div>

                        <button onClick={() => {
                            addToCart({
                                ...product,
                                quantity: displayQuantity
                            });
                        }}>Add to Cart</button>

                    </div>
                );
            })}
        </div>
    )

}

export default Products;