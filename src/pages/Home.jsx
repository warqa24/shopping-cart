import { Link } from "react-router";
import shopping from "../assets/shopping.png"

function Home() {
    return (
        <div className="min-h-screen grid grid-cols-2 items-center bg-gray-50 px-20">
            <div className="flex flex-col items-start gap-6">
                <h1 className="text-5xl font-bold text-gray-800">My Shopping Cart</h1>
                <p className="text-xl text-gray-600">Welcome to my shopping cart</p>
                <Link to="/shop" 
                className="bg-black text-white px-8 py-3 rounded-full font-mediium hover:bg-gray-800 transition colors">Shop Now</Link>
            </div>

            <div className="flex justify-center">
                <img src={shopping} alt="shopping-image" className="w-3/4 object-contain" />
            </div>
            
        </div>
    )
}

export default Home;