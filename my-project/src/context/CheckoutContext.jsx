import { createContext, useContext } from "react";

// Checkout Context

const CheckoutContext = createContext();

const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
};

export { CheckoutContext, useCheckout }; 