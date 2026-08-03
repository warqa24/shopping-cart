import { Link } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

function Nav({ cart }) {

    function calculateTotalQuantity() {
        const totalQuantity = cart.reduce((sum, product) => 
            sum + product.quantity, 0
        )

        return totalQuantity;
    };

    const itemQuantity = calculateTotalQuantity();

    return (
        <nav className="flex justify-end m-4 mr-12 gap-8 py-4 text-gray-600 font-medium">
            <Link to="/" className="hover:text-black transition-colors">Home Page</Link>
            <Link to="/shop" className="hover:text-black transition-colors">Shop</Link>
            <Link to="/cart" className="flex items-center gap-2 hover:text-black transition-colors">
            <span>Cart</span>
            
            <FontAwesomeIcon icon={faCartShopping} />

            {itemQuantity > 0 && (
                <span className="bg-gray-800 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {itemQuantity}
                </span>
            )}</Link>
        </nav>
    )
}

export default Nav;