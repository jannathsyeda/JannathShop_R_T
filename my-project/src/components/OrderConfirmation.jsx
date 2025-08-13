import React from 'react';
import { useCheckout } from '../context/CheckoutContext';
import { useCart } from '../context/CartContext';

const OrderConfirmation = () => {
  const { checkoutState, resetCheckout } = useCheckout();
  const { cartState } = useCart();

  const handleContinueShopping = () => {
    resetCheckout();
    window.location.reload(); // Simple way to reset everything
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 mb-8">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-green-800 mb-2">Order Confirmed!</h2>
        <p className="text-green-700">Thank you for your purchase. Your order has been successfully placed.</p>
      </div>
      
      <div className="bg-white border rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Order Details</h3>
        <div className="space-y-2 text-sm">
          <p><span className="font-medium">Order Number:</span> {checkoutState.orderNumber}</p>
          <p><span className="font-medium">Email:</span> {checkoutState.shippingInfo.email}</p>
          <p><span className="font-medium">Items:</span> {cartState.items.length} items</p>
          <p><span className="font-medium">Shipping to:</span> {checkoutState.shippingInfo.address}, {checkoutState.shippingInfo.city}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <p className="text-gray-600">
          A confirmation email has been sent to {checkoutState.shippingInfo.email}. 
          You can track your order using the order number above.
        </p>
        
        <button
          onClick={handleContinueShopping}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation; 