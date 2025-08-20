import React from "react";
import AnnounceBar from "./AnnounceBar";
import Header from "./Header";
import MainContent from "./MainContent";
import { CartProvider } from "./context/CartProvider";
import { CheckoutProvider } from "./context/CheckoutProvider";
import { ProductsProvider } from "./context/ProductProvider";
import { UIProvider } from "./context/UiProvider";
import CartSidebar from "./CartSidebar";
import AppContent from "./AppContent";

export default function Page() {
  return (
    <>
   <AnnounceBar />
      <UIProvider>
        <ProductsProvider>
          <CartProvider>
            <CheckoutProvider>
              <AppContent />
            </CheckoutProvider>
          </CartProvider>
        </ProductsProvider>
      </UIProvider>
    </>
  );
}
