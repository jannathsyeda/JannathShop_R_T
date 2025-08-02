import React from 'react'

export default function OrderSummary() {
  return (
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
          )
}
