import React from "react";
import AnnounceBar from "./AnnounceBar";
import Header from "./Header";
import MainContent from "./MainContent";
import { CartProvider } from "./context/CartProvider";
import { CheckoutProvider } from "./context/CheckoutProvider";
import { ProductsProvider } from "./context/ProductProvider";

export default function Page() {
  return (
    <>
      <AnnounceBar />
      <Header />
      

<ProductsProvider>
      <CartProvider>
      <CheckoutProvider>
        <div className="min-h-screen bg-gray-50">
       <MainContent/>  
        </div>
      </CheckoutProvider>
    </CartProvider>
    </ProductsProvider>
    </>
  );
}
