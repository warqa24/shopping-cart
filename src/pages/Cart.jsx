import { Link, useOutletContext } from "react-router";

function Cart() {

    const { cart, setCart, increaseQuantity, decreaseQuantity, removeItem } = useOutletContext();

    function calculateTotalPrice() {
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        return totalPrice.toFixed(2);
    }

    const totalPrice = calculateTotalPrice();

    if (cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
                <p className="text-gray-500">Looks like you haven't added anything yet</p>

                <Link to="/shop" className="mt-4 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                    Continue Shopping
                </Link>
            </div>
        )
    }


    return (
        <div className="w-full bg-gray-50 min-h-screen pb-20">
            <h1 className="text-3xl font-bold text-center pt-7 mb-4">Your Cart</h1>

            <div className="flex flex-col gap-8 p-8 max-w-5xl mx-auto">
                <div className="flex flex-col gap-4 w-">

                    <div className="hidden md:grid grid-cols-[1fr_128px_96px_96px_32px] gap-6 items-center px-4 pb-3 mb-4 border-b border-gray-200 text-gray-600 font-bold text-sm hidden md:flex">
                        <div className="flex-1">Item</div>
                        <div className="w-32 text-center shrink-0">Quantity</div>
                        <div className="w-32 text-center shrink-0">Price</div>
                        <div className="w-32 text-center shrink-0">Amount</div>
                        <div className="w-10 shrink-0"></div>
                    </div>
                    {cart.map((item) => (
                        <div key={item.id} className="grid grid-cols-[1fr_128px_96px_32px] md:grid-cols-[1fr_128px_96px_96px_32px] gap-4 items-center p-4 mb-4 bg-white border border-gray-200 rounded-xl shadow-sm w-full">

                            <div>
                                <img src={item.image} alt="item-image" className="h-20 w-20 object-contain" />
                                <div>
                                    <p className="font-bold text-gray-800 line-clamp-1">{item.title}</p>
                                    <p className="text-xs text-gray-400 mt-1 uppercase font-semibold">{item.category}</p>
                                </div>
                            </div>

                            <div className="w-32 flex justify-center">
                                <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden h-10 bg-white">
                                    <button className="px-3 hover:bg-gray-100 h-full font-bold transition-colors"
                                        onClick={() => { decreaseQuantity(item.id) }}>
                                        -
                                    </button>
                                    <input
                                        type="text"
                                        value={item.quantity}
                                        onChange={(e) => setQuantity(item.id, Number(e.target.value))}
                                        className="w-full text-center h-full focus:outline-none bg-gray-50 font-medium"
                                    />
                                    <button className="px-3 hover:bg-gray-100 h-full font-bold transition-colors"
                                        onClick={() => { increaseQuantity(item) }}>
                                        +
                                    </button>

                                </div>
                            </ div>

                            <div className="text-gray-500 font-bold w-24 text-center hidden md:block">
                                ${item.price.toFixed(2)}
                            </div>

                            <div className="text-gray-900 font-bold w-24 text-center">
                                ${(item.price * item.quantity).toFixed(2)}
                            </div>

                            <div className="w-8 flex justify-end">
                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold hover:bg-red-600 transition-colors shadow-sm"
                                    title="Remove item"
                                >
                                    ✕
                                </button>
                            </div>

                        </div>
                    ))}

                </div>

                <div className="bg-slate-50 border border-slate-200/80 p-6 rounded-2xl w-full flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-baseline gap-2">
                        <span className="text-gray-500 font-medium">Total:</span>
                        <span className="text-3xl font-bold text-gray-900">${totalPrice}</span>
                    </div>
                    <button className="w-full md:w-auto px-10 bg-black text-white py-3.5 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-md">
                        Order Now →
                    </button>
                </div>
            </div>


        </div>
    )
}

export default Cart;