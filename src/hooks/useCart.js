import { useContext } from "react";
import { CartContext } from "../context/CartContext";
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("use cart para poder ver bien ");
  }
  return context;
};
