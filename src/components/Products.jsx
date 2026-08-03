import { useEffect, useState } from "react";

function Products({ addToCart, cart, increaseQuantity, decreaseQuantity, setQuantity }) {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [productQuantity, setProductQuantity] = useState({});

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch('https://fakestoreapi.com/products');

                if (!response.ok) {
                    throw new Error("Failed to fetch products")
                }
                const data = await response.json();

                const newProducts = data.map(obj => ({ ...obj, quantity: 0 }))
                    setProducts(newProducts);
            }
            catch (error) {
                setError(error)
                console.error(error);
            }
            finally {
                setLoading(false);
            }

        }

        fetchProducts();

    }, []);

    if (loading) {
        return <h1 className="text-3xl font-bold">Loading products...</h1>
    }

    if (error) {
        return <h1>Error: {error.message}</h1>
    }

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
            {products.map((product) => {
                const displayQuantity = getDisplayQuantity(product.id);

                return (

                    <div key={product.id} className="flex flex-row gap-6 p-5 bg-white rounded-xl shadow-md border-gray-100 hover:shadow-lg transition-shadow">

                        <div className="w-1/3 flex-shrink-0 flex items-center justify-center">
                            <img src={product.image} alt="product-image" className="h-48 w-full object-contain" />
                        </div>

                        <div className="flex flex-col flex-1">
                            <h2 className="text-lg font-bold text-gray-800 line-clamp-2 leading-tight">{product.title}</h2>
                            <p className="text-sm text-gray-500 uppercase tracking-wider mt-1 font-semibold">{product.category}</p>

                            <p className="text-sm text-gray-600 mt-3 line-clamp-3">{product.description}</p>


                            <div className="mt-auto pt-4">
                                <p className="text-2xl font-bold text-gray-900 mb-3">${product.price.toFixed(2)}</p>

                                <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden h-10 justify-between w-50">
                                    <button className="px-3 hover:bg-gray-100 h-full font-bold transition-colors"
                                        onClick={() => handleDecrease(product.id)}>-</button>
                                    <input
                                        type="text"
                                        value={displayQuantity}
                                        onChange={(e) => handleSetQuantity(product.id, Number(e.target.value))}
                                        className="w-12 text-center h-full focus:outline-none bg-gray-50 font-medium"
                                    />
                                    <button className="px-3 hover:bg-gray-100 h-full font-bold transition-colors"
                                        onClick={() => handleIncrease(product.id)}>+</button>
                                </div>

                                <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex-1 font-medium h-10 mt-4"
                                    onClick={() => {
                                        addToCart({
                                            ...product,
                                            quantity: displayQuantity
                                        });
                                    }}>Add to Cart</button>


                            </div>

                        </div>
                    </div>
                );
            })}
        </div>
    )

}

export default Products;