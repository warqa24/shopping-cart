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
      setCart(prev => [...prev, product]);
    }
  }

  function editCart(newProduct) {
    setCart(prev => prev.map((product) => {
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
      setCart(prev => prev.map((item) => {
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
      setCart(prev => [
        ...prev, {
          ...product,
          quantity: 1
        }
      ])
    }

  }

  function decreaseQuantity(productId) {
    setCart(prev => {
      let updatedCart = prev.map((product) => {
        if (productId === product.id) {
          return {
            ...product,
            quantity: product.quantity - 1
          };
        } else {
          return product;
        }
      });

      updatedCart = updatedCart.filter(
        (product) => product.quantity > 0
      );

      return updatedCart;
    });
  }

  function setQuantity(productId, newQuantity) {
    setCart(prev => prev.map((product) => {
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
    setCart(prev => prev.filter((pro) => pro.id !== productId));
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