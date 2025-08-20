import React from 'react'
import { useCart } from "./context/CartContext";
import {useUI} from "./context/UiContext"

export default function Header() {

 const { toggleCart, openCart } = useUI();
  const { getCartCount } = useCart();

  return (
 <header class="border-b border-gray-200 py-4 px-4 md:px-8">
    <div class="container mx-auto flex items-center justify-between">
      <a href="#" class="text-2xl font-bold">SFJ.SHOP</a>

      <nav class="hidden md:flex space-x-6">
        <a href="#" class="hover:text-gray-500 transition-colors">Shop</a>
        <a href="#" class="hover:text-gray-500 transition-colors">On Sale</a>
        <a href="#" class="hover:text-gray-500 transition-colors">New Arrivals</a>
        <a href="#" class="hover:text-gray-500 transition-colors">Brands</a>
      </nav>

      <div class="flex items-center space-x-4">
        <div class="relative hidden md:block w-64">
          <input type="text" placeholder="Search for products..."
            class="w-full bg-gray-100 rounded-full py-2 px-4 text-sm"/>
          <span class="absolute right-3 top-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
        </div>


       
       <button 
  onClick={toggleCart}
  className="relative p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-6 w-6" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth="2"
      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
    />
  </svg>
  {getCartCount() > 0 && (
    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
      {getCartCount()}
    </span>
  )} 
</button>

        <a href="#" class="hover:text-gray-500 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </a>
      </div>
    </div>
  </header>

  )
}
