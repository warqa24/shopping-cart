import { Link } from "react-router"
function ErrorPage() {
    return (
        <div>
            <h1>Error! Page not found</h1>
            
            <Link to="/">Back home</Link>
        </div>
    )
}

export default ErrorPage;