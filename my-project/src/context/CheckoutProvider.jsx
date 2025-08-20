import { useReducer } from 'react';
import { CheckoutContext } from './CheckoutContext';

// Checkout reducer
const checkoutReducer = (state, action) => {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    case 'SET_SHIPPING_INFO':
      return { ...state, shippingInfo: { ...state.shippingInfo, ...action.payload } };
    case 'SET_PAYMENT_INFO':
      return { ...state, paymentInfo: { ...state.paymentInfo, ...action.payload } };
    case 'SET_SHIPPING_METHOD':
      return { ...state, shippingMethod: action.payload };
    case 'SET_PAYMENT_METHOD':
      return { ...state, paymentMethod: action.payload };
    case 'SET_ORDER_PLACED':
      return { ...state, orderPlaced: true, orderNumber: action.payload };
    case 'RESET_CHECKOUT':
      return {
        currentStep: 0,
        shippingInfo: {},
        paymentInfo: {},
        shippingMethod: null,
        paymentMethod: null,
        orderPlaced: false,
        orderNumber: null
      };
    default:
      return state;
  }
};

const CheckoutProvider = ({ children }) => {
  const [checkoutState, dispatch] = useReducer(checkoutReducer, {
    currentStep: 0,
    shippingInfo: {},
    paymentInfo: {},
    shippingMethod: null,
    paymentMethod: null,
    orderPlaced: false,
    orderNumber: null
  });

  const setStep = (step) => dispatch({ type: 'SET_STEP', payload: step });
  const setShippingInfo = (info) => dispatch({ type: 'SET_SHIPPING_INFO', payload: info });
  const setPaymentInfo = (info) => dispatch({ type: 'SET_PAYMENT_INFO', payload: info });
  const setShippingMethod = (method) => dispatch({ type: 'SET_SHIPPING_METHOD', payload: method });
  const setPaymentMethod = (method) => dispatch({ type: 'SET_PAYMENT_METHOD', payload: method });
  const setOrderPlaced = (orderNumber) => dispatch({ type: 'SET_ORDER_PLACED', payload: orderNumber });
  const resetCheckout = () => dispatch({ type: 'RESET_CHECKOUT' });

  return (
    <CheckoutContext.Provider value={{
      checkoutState,
      setStep,
      setShippingInfo,
      setPaymentInfo,
      setShippingMethod,
      setPaymentMethod,
      setOrderPlaced,
      resetCheckout
    }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export { CheckoutProvider };