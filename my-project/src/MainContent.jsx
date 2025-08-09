import React from "react";
import CartList from "./CartList";
import ProductList from "./ProductList";
import {PRODUCTS} from "./data"
export default function MainContent() {
  return (
    <main class="container mx-auto px-4 md:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
         
          <ProductList PRODUCTS={PRODUCTS}/>
        </div>

        <CartList />
      </div>
    </main>
  );
}
