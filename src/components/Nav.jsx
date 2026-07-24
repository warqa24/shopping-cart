import { Link } from "react-router";

function Nav() {
    return (
        <nav>
            <Link to="/">Home Page</Link>
            <Link to="/shop">Shop Page</Link>
            <Link to="/cart">Cart Page</Link>
        </nav>
    )
}

export default Nav;