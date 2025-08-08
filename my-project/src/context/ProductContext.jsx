import { createContext, useContext } from 'react';

const ProductContext = createContext("");

const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};

export { ProductContext, useProduct }; 