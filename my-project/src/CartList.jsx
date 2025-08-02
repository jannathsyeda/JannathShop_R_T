import React from 'react'
import OrderSummary from './OrderSummary'

export default function CartList() {
  return (
   <div class="lg:col-span-1">
        <div class="bg-white rounded-lg p-6 border border-gray-200">
          <h2 class="text-2xl font-bold mb-6">YOUR CART</h2>

          <div class="flex items-start space-x-4 pb-4 border-b border-gray-200 mb-4">
            <div class="w-16 h-16 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center">
              <img src="./assets/img/image 9-2.png" alt="Gradient Graphic T-shirt"
                class="h-full w-auto object-cover"/>
            </div>
            <div class="flex-grow">
              <div class="flex justify-between">
                <h3 class="font-medium">Gradient Graphic T-shirt</h3>
                <span class="text-red-500 text-sm">×</span>
              </div>
              <p class="text-sm text-gray-500">Size: Large</p>
              <p class="text-sm text-gray-500">Color: White</p>
              <div class="flex justify-between items-center mt-2">
                <p class="font-bold">$145</p>
                <div class="flex items-center space-x-2">
                  <button class="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">−</button>
                  <span class="text-sm">1</span>
                  <button class="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">+</button>
                </div>
              </div>
            </div>
          </div>

          <div class="flex items-start space-x-4 pb-4 border-b border-gray-200 mb-4">
            <div class="w-16 h-16 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center">
              <img src="./assets/img/image 9-2.png" alt="Checkered Shirt" class="h-full w-auto object-cover"/>
            </div>
            <div class="flex-grow">
              <div class="flex justify-between">
                <h3 class="font-medium">Checkered Shirt</h3>
                <span class="text-red-500 text-sm">×</span>
              </div>
              <p class="text-sm text-gray-500">Size: Medium</p>
              <p class="text-sm text-gray-500">Color: Red</p>
              <div class="flex justify-between items-center mt-2">
                <p class="font-bold">$180</p>
                <div class="flex items-center space-x-2">
                  <button class="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">−</button>
                  <span class="text-sm">1</span>
                  <button class="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">+</button>
                </div>
              </div>
            </div>
          </div>

          <div class="flex items-start space-x-4 pb-4 border-b border-gray-200 mb-4">
            <div class="w-16 h-16 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center">
              <img src="./assets/img/image 9-2.png" alt="Skinny Fit Jeans" class="h-full w-auto object-cover"/>
            </div>
            <div class="flex-grow">
              <div class="flex justify-between">
                <h3 class="font-medium">Skinny Fit Jeans</h3>
                <span class="text-red-500 text-sm">×</span>
              </div>
              <p class="text-sm text-gray-500">Size: Large</p>
              <p class="text-sm text-gray-500">Color: Blue</p>
              <div class="flex justify-between items-center mt-2">
                <p class="font-bold">$240</p>
                <div class="flex items-center space-x-2">
                  <button class="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">−</button>
                  <span class="text-sm">1</span>
                  <button class="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">+</button>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6">
            <h3 class="font-bold text-lg mb-4">Order Summary</h3>

            <div class="space-y-2 mb-4">
              <div class="flex justify-between">
                <span class="text-gray-600">Subtotal</span>
                <span class="font-medium">$565</span>
              </div>
              <div class="flex justify-between text-red-500">
                <span>Discount (-20%)</span>
                <span>-$113</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Delivery Fee</span>
                <span class="font-medium">$15</span>
              </div>
              <div class="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>$467</span>
              </div>
            </div>

            <div class="flex items-center space-x-2 mb-6">
              <div class="flex-grow relative">
                <input type="text" placeholder="Add promo code"
                  class="w-full border border-gray-300 rounded-md py-2 px-3 text-sm"/>
                <span class="absolute left-3 top-2.5">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </span>
              </div>
              <button class="bg-black text-white rounded-md px-4 py-2 text-sm">Apply</button>
            </div>

            <a href="#"
              class="block bg-black text-white text-center py-3 rounded-md hover:bg-gray-800 transition-colors">
              Go to Checkout
              <span class="inline-block ml-2">→</span>
            </a>
          </div>
        </div>
      </div>
  )
}
