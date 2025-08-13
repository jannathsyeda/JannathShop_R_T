import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useCheckout } from '../context/CheckoutContext';
import { SHIPPING_METHODS } from '../constants/shipping';

const OrderReview = () => {
  const { cartState, getCartTotal } = useCart();
  const { checkoutState, setStep, setOrderPlaced } = useCheckout();
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedShippingMethod = SHIPPING_METHODS.find(m => m.id === checkoutState.shippingMethod);
  const subtotal = getCartTotal();
  const discountAmount = (subtotal * cartState.discount) / 100;
  const shippingFee = selectedShippingMethod ? selectedShippingMethod.price : 15;
  const total = subtotal - discountAmount + shippingFee;

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    const orderNumber = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    setOrderPlaced(orderNumber);
    setStep(4);
    setIsProcessing(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Review Your Order</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Order Items</h3>
            <div className="space-y-4">
              {cartState.items.map((item, index) => (
                <div key={index} className="flex items-center py-3 border-b last:border-b-0">
                  <div className="w-16 h-16 bg-gray-200 rounded mr-4"></div>
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-500">
                      Size: {item.size} | Color: {item.color} | Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="font-semibold">${item.price * item.quantity}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
            <div>
              <p className="font-medium">{checkoutState.shippingInfo.firstName} {checkoutState.shippingInfo.lastName}</p>
              <p>{checkoutState.shippingInfo.address}</p>
              <p>{checkoutState.shippingInfo.city}, {checkoutState.shippingInfo.state} {checkoutState.shippingInfo.zipCode}</p>
              <p>{checkoutState.shippingInfo.country}</p>
              <p className="mt-2 text-sm text-gray-600">
                Email: {checkoutState.shippingInfo.email}<br />
                Phone: {checkoutState.shippingInfo.phone}
              </p>
            </div>
          </div>
          
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Shipping & Payment</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Shipping:</span> {selectedShippingMethod?.name} (${selectedShippingMethod?.price})</p>
              <p><span className="font-medium">Payment:</span> {checkoutState.paymentMethod === 'card' ? 'Credit/Debit Card' : checkoutState.paymentMethod}</p>
              {checkoutState.paymentMethod === 'card' && (
                <p className="text-sm text-gray-600">Card ending in ****{checkoutState.paymentInfo.cardNumber?.slice(-4)}</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="bg-white border rounded-lg p-6 h-fit">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between text-red-500">
              <span>Discount (-{cartState.discount}%)</span>
              <span>-${discountAmount}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shippingFee}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>
          
          <div className="mt-6 space-y-3">
            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Processing...' : `Place Order - ${total}`}
            </button>
            <button
              onClick={() => setStep(2)}
              className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300"
            >
              Back to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderReview; 