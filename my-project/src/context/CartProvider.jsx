import { useReducer } from "react";
import { cartReducer } from "../Reducer/CartReducer";
import { CartContext } from "./CartContext";

export const CartProvider = ({ children }) => {
    const [cartState, dispatch] = useReducer(cartReducer, {
      items: [
        {
            id: 1,
            name: "Gradient Graphic T-shirt",
            price: 145,
            rating: 4,
            maxRating: 5,
            stock: 212,
            image: "image 1.png",
            category: "t-shirt"
          },
          {
            id: 2,
            name: "Polo with Tipping Details",
            price: 180,
            rating: 1,
            maxRating: 5,
            stock: 320,
            image: "image 7.png",
            category: "polo"
          },
          {
            id: 3,
            name: "Black Striped T-shirt",
            price: 120,
            originalPrice: 160,
            rating: 3,
            maxRating: 5,
            stock: 420,
            image: "image 7-1.png",
            category: "t-shirt"
          },
          {
            id: 4,
            name: "Skinny Fit Jeans",
            price: 240,
            originalPrice: 260,
            rating: 4,
            maxRating: 5,
            stock: 20,
            image: "image 8.png",
            category: "jeans"
          }
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
  
    const updateQuantity = (id, size, color, quantity) => {
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { id, size, color, quantity }
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