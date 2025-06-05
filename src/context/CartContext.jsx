import { createContext, useEffect, useState } from "react";

//1.crear contexto
export const CartContext = createContext();
//2. creat provider

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem("cart") !== null) {
      const cartInSession = sessionStorage.getItem("cart");

      setCart(JSON.parse(cartInSession));
    }
  }, []);

  const addToCart = (product) => {
    const productInCartIndex = cart.findIndex((item) => item.id === product.id);

    if (productInCartIndex >= 0) {
      const newCart = structuredClone(cart);
      newCart[productInCartIndex].quantity += 1;
      storeInSessionStorage(newCart);
      return setCart(newCart);
    }
    let newCart = [...cart, product];
    setCart(newCart);
    storeInSessionStorage(newCart);
  };
  const removeProductFromCart = (productId) => {
    const newCart = cart.filter(
      (productInCart) => productInCart.id !== productId
    );

    storeInSessionStorage(newCart);
    setCart(newCart);
  };
  const clearCart = () => {
    //1.29.19
    setCart([]);
    sessionStorage.removeItem("cart");
  };
  const storeInSessionStorage = (cart) => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  };
  const isProductInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        clearCart,
        removeProductFromCart,
        isProductInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
