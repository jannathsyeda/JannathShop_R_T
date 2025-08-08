import { createContext, useContext } from 'react';

const CartContext = createContext("");

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CartContext, useCart }; 