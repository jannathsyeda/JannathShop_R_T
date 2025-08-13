import React, { useState } from 'react';
import { useCart } from './context/CartContext';
import { useCheckout } from './context/CheckoutContext';
import CartItem from './CartItem';
import CheckoutPage from './components/CheckoutPage';

export default function CartList() {
  const { cartState, getCartTotal, applyDiscount } = useCart();
  const { setStep } = useCheckout();
  const [promoCode, setPromoCode] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);

  const subtotal = getCartTotal();
  const discountAmount = (subtotal * cartState.discount) / 100;
  const deliveryFee = 15;
  const total = subtotal - discountAmount + deliveryFee;

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'save20') {
      applyDiscount(20);
    } else if (promoCode.toLowerCase() === 'save10') {
      applyDiscount(10);
    }
    setPromoCode('');
  };

  const handleCheckout = () => {
    setStep(1);
    setShowCheckout(true);
  };

  if (showCheckout) {
    return <CheckoutPage />;
  }

  return (
    <div className="bg-white rounded-lg p-6 h-fit">
      <h3 className="text-xl font-bold mb-4">YOUR CART</h3>
      
      <div className="space-y-2">
        {cartState.items.map((item, index) => (
          <CartItem key={`${item.id}-${item.size}-${item.color}-${index}`} item={item} />
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="font-bold mb-4">Order Summary</h4>
        
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
            <span>Delivery Fee</span>
            <span>${deliveryFee}</span>
          </div>
          <div className="flex justify-between font-bold text-lg pt-2 border-t">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>
        
        <div className="mt-4 flex">
          <input
            type="text"
            placeholder="Add promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleApplyPromo}
            className="px-4 py-2 bg-black text-white rounded-r-lg hover:bg-gray-800"
          >
            Apply
          </button>
        </div>
        
        <button 
          onClick={handleCheckout}
          className="w-full mt-4 bg-black text-white py-3 rounded-lg hover:bg-gray-800 font-medium"
        >
          Go to Checkout →
        </button>
      </div>
    </div>
  );
}
