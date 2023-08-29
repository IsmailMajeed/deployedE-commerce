import { createContext, useContext, useEffect, useState } from "react";
import { userContext } from "./UserContext";

export const LikedContext = createContext({});

export function LikedContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [LikedProducts, setLikedProducts] = useState([]);
  const { user } = useContext(userContext);

  useEffect(() => {
    if (LikedProducts?.length > 0) {
      if (!!user) {
        ls?.setItem(`Liked${user.email}`, JSON.stringify(LikedProducts));
      } else
      ls?.setItem('Liked', JSON.stringify(LikedProducts));
    }
  }, [LikedProducts]);
  useEffect(() => {
    if (ls) {
      if (!!user) {
        if (ls.getItem(`Liked${user.email}`))
          setLikedProducts(JSON.parse(ls.getItem(`Liked${user.email}`)));
        else{
          setLikedProducts([]);
        }
      } else if (ls.getItem('Liked')) {
        setLikedProducts(JSON.parse(ls.getItem('Liked')));
      } else{
        setLikedProducts([]);
      }    }
  }, [user]);
  function addLikedProduct(productId) {
    setLikedProducts(prev => [...prev, productId]);
  }
  function removeLikedProduct(productId) {
    setLikedProducts(prev => {
      const pos = prev.indexOf(productId);
      if (pos !== -1) {
        return prev.filter((value, index) => index !== pos);
      }
      return prev;
    });
    if (LikedProducts?.length === 1) {
      if (!!user) {
        ls.removeItem(`Liked${user.email}`)
      } else
        ls.removeItem('Liked')
    }
  }
  function clearLiked() {
    if (!!user) {
      ls.removeItem(`Liked${user.email}`)
    } else
      ls.removeItem('Liked')
    setLikedProducts([]);
  }
  return (
    <LikedContext.Provider value={{ LikedProducts, setLikedProducts, addLikedProduct, removeLikedProduct, clearLiked }}>
      {children}
    </LikedContext.Provider>
  );
}