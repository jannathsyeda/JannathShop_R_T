import { useState } from "react";
import { UIContext } from "./UiContext";



export const UIProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  return (
    <UIContext.Provider value={{
      isCartOpen,
      toggleCart,
      closeCart,
      openCart
    }}>
      {children}
    </UIContext.Provider>
  );
};