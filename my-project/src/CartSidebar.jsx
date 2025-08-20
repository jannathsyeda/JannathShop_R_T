import React, { useState } from 'react'
import { useCart } from './context/CartContext';
import { useUI } from './context/UiContext';
import { useCheckout } from './context/CheckoutContext';
import CartItem from './CartItem';
import CheckoutPage from './components/CheckoutPage';


export default function CartSidebar() {

    const { cartState, getCartTotal, applyDiscount } = useCart();
  const { setStep } = useCheckout(); // ADDED: Missing checkout functionality
  const { isCartOpen, closeCart } = useUI();
  const [promoCode, setPromoCode] = useState('');
  const [showCheckout, setShowCheckout] = useState(false); // ADDED: Missing checkout state

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

  // ADDED: Missing checkout handler
  const handleCheckout = () => {
    setStep(1);
    setShowCheckout(true);
  };

  // ADDED: Handle checkout page display
  if (showCheckout) {
    return <CheckoutPage />;
  }

  if (!isCartOpen) return null

  return (
  <div className="fixed inset-0 z-50">
      {/* Overlay - FIXED */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeCart}
      />

      {/* Cart Sidebar - FIXED */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
            <h3 className="text-xl font-bold text-gray-900">YOUR CART</h3>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >x
              {/* <X className="w-5 h-5 text-gray-600" /> */}
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 bg-white">
            {cartState.items.length === 0 ? (
              <div className="text-center py-16">
                <div className="mb-4">
                  <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto" />
                </div>
                <p className="text-gray-500 mb-6 text-lg">Your cart is empty</p>
                <button 
                  onClick={closeCart}
                  className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartState.items.map((item, index) => (
                  <CartItem key={`${item.id}-${item.size}-${item.color}-${index}`} item={item} />
                ))}
              </div>
            )}
          </div>

          {/* Cart Summary */}
          {cartState.items.length > 0 && (
            <div className="border-t border-gray-200 p-6 bg-white">
              <h4 className="font-bold mb-6 text-lg">Order Summary</h4>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">${subtotal}</span>
                </div>
                {cartState.discount > 0 && (
                  <div className="flex justify-between text-red-500">
                    <span>Discount (-{cartState.discount}%)</span>
                    <span className="font-medium">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="font-medium">${deliveryFee}</span>
                </div>
                <div className="flex justify-between font-bold text-xl pt-3 border-t border-gray-200">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex mb-6">
                <input
                  type="text"
                  placeholder="Add promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
                <button
                  onClick={handleApplyPromo}
                  className="px-6 py-3 bg-black text-white rounded-r-lg hover:bg-gray-800 transition-colors font-medium"
                >
                  Apply
                </button>
              </div>
         <button 
  onClick={handleCheckout}  // Now actually does something!
  className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 font-medium"
>
  Go to Checkout →
</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
