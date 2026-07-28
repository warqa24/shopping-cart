import { Link, useOutletContext } from "react-router";

function Cart() {

    const { cart, setCart, increaseQuantity, decreaseQuantity, removeItem } = useOutletContext();

    function calculateTotalPrice() {
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        return totalPrice.toFixed(2);
    }

    const totalPrice = calculateTotalPrice();
    

    return (
        <div className="flex flex-col items-center">
            <h1>This is Cart Page</h1>

            {cart.map((item) => (
                <div key={item.id} className="p-3 m-5 border-2 border-solid border-black w-2/5">
                    <p>{item.title}</p>
                    <img src={item.image} alt="item-image" className="size-48 align-center flex justify-center" />
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                    <div className="flex">
                        <button onClick={() => { decreaseQuantity(item.id) }}>-</button>
                        <input
                            type="text"
                            value={item.quantity}
                            onChange={(e) => setQuantity(item.id, Number(e.target.value))}
                            className="border-2 border-black"
                        />
                        <button onClick={() => { increaseQuantity(item) }}>+</button>
                    </div>

                    <button onClick={() => removeItem(item.id)}>X</button>

                </div>
            ))}

            <p>Total Price: {totalPrice}</p>
        </div>
    )
}

export default Cart;