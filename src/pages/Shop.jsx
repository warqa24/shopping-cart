import { Link } from "react-router";
import Products from "../components/Products";

function Shop() {
    return (
        <div>
            <h1>This is Shop Page</h1>

            <Products />

            <Link to="/">Back to Home</Link>
        </div>
    )
}

export default Shop;