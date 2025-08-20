import React from "react";
import CartList from "./CartList";
import ProductList from "./ProductList";
import {PRODUCTS} from "./data"
export default function MainContent() {
  return (
    <main className="container mx-auto px-4 md:px-8 py-8">
      {/* <div className="grid grid-cols-2 lg:grid-cols-3 gap-8"> */}
        {/* <div className="lg:col-span-2"> */}
         
          <ProductList PRODUCTS={PRODUCTS}/>
        {/* </div> */}

        {/* <CartList /> */}
      {/* </div> */}
    </main>
  );
}
