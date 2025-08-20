import React from 'react'
import CheckoutPage from './components/CheckoutPage';
import MainContent from './MainContent';
import CartSidebar from './CartSidebar';
import { useCheckout } from './context/CheckoutContext';
import Header from './Header';

export default function AppContent() {
    const { step } = useCheckout()
  
  // If any checkout step is active (step > 0), show checkout page
  if (step > 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <CheckoutPage/>
      </div>
    );
  }
 return (
    <>
      <Header/>
      <div className="min-h-screen bg-gray-50">
        <MainContent/>
      </div>
      <CartSidebar/>
    </>
  );
}
