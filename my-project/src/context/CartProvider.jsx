import { useReducer } from "react";
import { cartReducer } from "../Reducer/CartReducer";
import { CartContext } from "./CartContext";

export const CartProvider = ({ children }) => {
    const [cartState, dispatch] = useReducer(cartReducer, {
      items: [

      ],
      discount: 20
    });
  
    const addToCart = (product, size = "Medium", color = "Default") => {
      dispatch({
        type: 'ADD_TO_CART',
        payload: { ...product, size, color }
      });
    };
  
    const removeFromCart = (id, size, color) => {
      dispatch({
        type: 'REMOVE_FROM_CART',
        payload: { id, size, color }
      });
    };
  
    // const updateQuantity = (id, size, color, quantity) => {
    //   dispatch({
    //     type: 'UPDATE_QUANTITY',
    //     payload: { id, size, color, quantity }
    //   });
    // };
    // 3. UPDATE CART PROVIDER updateQuantity FUNCTION
const updateQuantity = (id, size, color, quantity, currentStock) => {
  dispatch({
    type: 'UPDATE_QUANTITY',
    payload: { id, size, color, quantity, currentStock }
  });
};
  
    const applyDiscount = (discount) => {
      dispatch({
        type: 'APPLY_DISCOUNT',
        payload: discount
      });
    };
  
    const getCartTotal = () => {
      return cartState.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    };
  
    const getCartCount = () => {
      return cartState.items.reduce((total, item) => total + item.quantity, 0);
    };
  
    return (
      <CartContext.Provider value={{
        cartState,
        addToCart,
        removeFromCart,
        updateQuantity,
        applyDiscount,
        getCartTotal,
        getCartCount
      }}>
        {children}
      </CartContext.Provider>
    );
  };