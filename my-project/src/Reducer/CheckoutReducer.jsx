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
        currentStep: 1,
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