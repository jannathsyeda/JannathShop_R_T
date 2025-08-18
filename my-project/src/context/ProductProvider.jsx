import { useReducer } from "react";
import { productsReducer } from "../Reducer/ProductReducer";
import { PRODUCTS } from "../data";
import { ProductContext } from "./ProductContext";

export  const ProductsProvider = ({ children }) => {
  const [products, dispatch] = useReducer(productsReducer, PRODUCTS);

  const updateStock = (id, stock) => {
    dispatch({ type: 'UPDATE_STOCK', payload: { id, stock } });
  };

  const decreaseStock = (id, quantity) => {
    dispatch({ type: 'DECREASE_STOCK', payload: { id, quantity } });
  };

  const increaseStock = (id, quantity) => {
    dispatch({ type: 'INCREASE_STOCK', payload: { id, quantity } });
  };

  const getProduct = (id) => {
    return products.find(product => product.id === id);
  };

  return (
    <ProductContext.Provider value={{
      products,
      updateStock,
      decreaseStock,
      increaseStock,
      getProduct
    }}>
      {children}
    </ProductContext.Provider>
  );
};