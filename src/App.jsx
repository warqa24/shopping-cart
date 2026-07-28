import { useState } from "react";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import { Outlet } from "react-router";
import Shop from './pages/Shop';

function App() {

  const [cart, setCart] = useState([]);

  function addToCart(product) {
    const alreadyAdded = cart.find((item) => item.id === product.id);

    if (alreadyAdded) {
      editCart(product);
    }
    else {
      setCart([...cart, product]);
    }
  }

  function editCart(newProduct) {
    setCart(cart.map((product) => {
      if (product.id === newProduct.id) {
        return newProduct;
      }
      else {
        return product
      }
    }))
  }

  function increaseQuantity(product) {
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      setCart(cart.map((item) => {
        if (item.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + 1
          };
        }
        else {
          return item;
        }
      }))
    }
    else {
      setCart([
        ...cart, {
          ...product,
          quantity: 1
        }
      ])
    }

  }

  function decreaseQuantity(productId) {
    let updatedCart = cart.map((product) => {
      if (productId === product.id) {
        return {
          ...product,
          quantity: product.quantity - 1
        };
      }
      else {
        return product;
      }

    })

    updatedCart = updatedCart.filter((pro) => pro.quantity > 0);

    setCart(updatedCart);

  }

  function setQuantity(productId, newQuantity) {
    setCart(cart.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          quantity: newQuantity
        };
      }
      else {
        return product;
      }
    }))
  }

  function removeItem(productId) {
    setCart(cart.filter((pro) => pro.id !== productId));
  }

  // console.log(cart);

  return (
    <div>
      <Nav cart={cart} />
      <Outlet context={{ addToCart, cart, setCart, increaseQuantity, decreaseQuantity, setQuantity, removeItem }} />

    </div>

  )
}

export default App;