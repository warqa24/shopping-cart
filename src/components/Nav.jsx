import { Link } from "react-router";

function Nav({ cart }) {

    function calculateTotalQuantity() {
        const totalQuantity = cart.reduce((sum, product) => 
            sum + product.quantity, 0
        )

        return totalQuantity;
    };

    const itemQuantity = calculateTotalQuantity();

    return (
        <nav className="flex justify-evenly">
            <Link to="/">Home Page</Link>
            <Link to="/shop">Shop Page</Link>
            <Link to="/cart">Cart Page {itemQuantity}</Link>
        </nav>
    )
}

export default Nav;