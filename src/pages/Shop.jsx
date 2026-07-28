import { Link, useOutletContext } from "react-router";
import Products from "../components/Products";

function Shop() {

    const { addToCart, cart, increaseQuantity, decreaseQuantity, setQuantity } = useOutletContext();
    
    return (
        <div>
            <h1>This is Shop Page</h1>

            <Products 
            addToCart={addToCart} 
            cart={cart}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            setQuantity={setQuantity}
            />

            <Link to="/">Back to Home</Link>
        </div>
    )
}

export default Shop;