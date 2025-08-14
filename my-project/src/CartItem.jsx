import React from 'react'
import { useCart } from './context/CartContext';
import {getUrl}from "./ImageUrl/ImageUrl"
export default function CartItem({ item }) {
   const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity) => {
    updateQuantity(item.id, item.size, item.color, newQuantity);
  };

  const handleRemove = () => {
    removeFromCart(item.id, item.size, item.color);
  };
  return (
<div class="flex items-start space-x-4 pb-4 border-b border-gray-200 mb-4">
            <div class="w-16 h-16 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center">
              <img src={getUrl(item.image)} alt="Skinny Fit Jeans" class="h-full w-auto object-cover"/>
            </div>
            <div class="flex-grow">
              <div class="flex justify-between">
                <h3 class="font-medium">{item.name}</h3>
                 <button
        onClick={handleRemove}
        className="ml-4 text-gray-400 hover:text-red-500"
      >
        ×
      </button>
              </div>
              <p class="text-sm text-gray-500">Size: {item.size}</p>
              <p class="text-sm text-gray-500">Color: {item.color}</p>
              <div class="flex justify-between items-center mt-2">
                <p class="font-bold">${item.price}</p>
                <div class="flex items-center space-x-2">
                  <button 
            onClick={() => handleQuantityChange(item.quantity - 1)}
                    class="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">−</button>
                  <span class="text-sm">{item.quantity}</span>
                  {/* <button 
                              onClick={() => handleQuantityChange(item.quantity + 1)}
 class="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">+</button> */}
 <button
  onClick={() => handleQuantityChange(item.quantity + 1)}
  disabled={item.quantity >= item.stock}
  className={`w-6 h-6 border border-gray-300 rounded flex items-center justify-center text-sm 
    ${item.quantity >= item.stock ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
>
  +
</button>

                </div>
              </div>
            </div>
          </div>  )
}
