import React from "react";
import { useCart } from "./context/CartContext";
import { getUrl } from "./ImageUrl/ImageUrl";
import { useProducts } from "./context/ProductContext";

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();
  const { increaseStock, decreaseStock, getProduct } = useProducts();

  // Get current product stock
  const currentProduct = getProduct(item.id);

  const handleQuantityChange = (newQuantity) => {
    const quantityDiff = newQuantity - item.quantity;
    
    if (quantityDiff > 0) {
      // Increasing quantity - check if we have enough stock
      if (currentProduct.stock >= quantityDiff) {
        updateQuantity(item.id, item.size, item.color, newQuantity, currentProduct.stock);
        decreaseStock(item.id, quantityDiff);
      }
    } else if (quantityDiff < 0) {
      // Decreasing quantity - return stock
      updateQuantity(item.id, item.size, item.color, newQuantity, currentProduct.stock);
      increaseStock(item.id, Math.abs(quantityDiff));
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id, item.size, item.color);
    increaseStock(item.id, item.quantity);
  };

  // Calculate available quantity (current quantity + available stock)
  const maxQuantity = item.quantity + currentProduct.stock;


  return (
    <div class="flex items-start space-x-4 pb-4 border-b border-gray-200 mb-4">
      <div class="w-16 h-16 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center">
        <img
          src={getUrl(item.image)}
          alt="Skinny Fit Jeans"
          class="h-full w-auto object-cover"
        />
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
          <p className="text-xs text-gray-500">
            Available: {currentProduct.stock + item.quantity}
          </p>

          <div class="flex items-center space-x-2">
            <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center text-sm hover:bg-gray-100 disabled:opacity-50"
          >
            −
          </button>
            <span class="text-sm">{item.quantity}</span>
            {/* <button 
                              onClick={() => handleQuantityChange(item.quantity + 1)}
 class="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">+</button> */}
           <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            disabled={currentProduct.stock === 0}
            className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center text-sm hover:bg-gray-100 disabled:opacity-50"
          >
            +
          </button>
          </div>
        </div>
      </div>
      
    </div>
  );
}
