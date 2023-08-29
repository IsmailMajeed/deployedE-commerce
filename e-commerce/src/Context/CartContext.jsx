import { createContext, useContext, useEffect, useState } from "react";
import { userContext } from "./UserContext";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);
  const { user } = useContext(userContext);
  useEffect(() => {
    if (cartProducts?.length > 0) {
      // ls.removeItem('cart')
      if (!!user) {
        ls?.setItem(`cart${user.email}`, JSON.stringify(cartProducts));
      } else {
        ls?.setItem('cart', JSON.stringify(cartProducts));
      }
    }
  }, [cartProducts]);

  useEffect(() => {
    if (ls) {
      if (!!user) {
        if (ls.getItem(`cart${user.email}`))
          setCartProducts(JSON.parse(ls.getItem(`cart${user.email}`)));
        else{
          setCartProducts([]);
        }
      } else if (ls.getItem('cart')) {
        setCartProducts(JSON.parse(ls.getItem('cart')));
      } else{
        setCartProducts([]);
      }
    }
  }, [user]);

  function updateProduct(product, type, colour, quantity) {
    setCartProducts(prev => {
      const existingProductIndex = prev.findIndex(item => (
        item.product._id === product._id && item.type === type && item.colour === colour
      ));

      if (existingProductIndex !== -1) {
        // If the product with the same type and colour already exists in the cart, update its quantity
        const updatedCart = [...prev];
        const updatedQuantity = prev[existingProductIndex].quantity + quantity;

        if (updatedQuantity <= 0) {
          // If the updated quantity is less than or equal to 0, remove the product from the cart
          updatedCart.splice(existingProductIndex, 1);
        } else {
          updatedCart[existingProductIndex].quantity = updatedQuantity;
        }

        return updatedCart;
      } else {
        // If the product with the same type and colour is not in the cart, add it
        return [...prev, { product, type, colour, quantity }];
      }
    });
    if (cartProducts?.length === 1) {
      if (!!user) {
        ls.removeItem(`cart${user.email}`)
      } else
        ls.removeItem('cart')
    }
  }

  function clearCart() {
    setCartProducts([]);
    if (!!user) {
      ls.removeItem(`cart${user.email}`)
    } else
      ls.removeItem('cart')
  }
  return (
    <CartContext.Provider value={{ cartProducts, setCartProducts, updateProduct, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}