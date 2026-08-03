import { Link, useOutletContext } from "react-router";
import Products from "../components/Products";

function Shop() {

    const { addToCart, cart, increaseQuantity, decreaseQuantity, setQuantity } = useOutletContext();
    
    return (
        <div className="bg-gray-50">
            <h1 className="text-4xl font-bold text-gray-800 text-center py-6">This is Shop Page</h1>

            <Products 
            addToCart={addToCart} 
            cart={cart}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            setQuantity={setQuantity}
            />

        </div>
    )
}

export default Shop;