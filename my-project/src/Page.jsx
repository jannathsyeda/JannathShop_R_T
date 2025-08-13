import React from "react";
import AnnounceBar from "./AnnounceBar";
import Header from "./Header";
import MainContent from "./MainContent";
import { CartProvider } from "./context/CartProvider";
import { CheckoutProvider } from "./context/CheckoutProvider";

export default function Page() {
  return (
    <>
      <AnnounceBar />
      <Header />
      


      <CartProvider>
      <CheckoutProvider>
        <div className="min-h-screen bg-gray-50">
       <MainContent/>  
        </div>
      </CheckoutProvider>
    </CartProvider>
    </>
  );
}
