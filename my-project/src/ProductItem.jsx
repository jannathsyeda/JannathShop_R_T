import { useState } from "react";
import { getUrl } from "./ImageUrl/ImageUrl.js";
import StarRating from "./StarRating.jsx";
import { useCart } from "./context/CartContext";
import {useProducts} from "./context/ProductContext"

export default function ProductItem({ product }) {
   const { cartState, addToCart, removeFromCart } = useCart();
  const { decreaseStock, increaseStock, getProduct } = useProducts();

  // Get real-time product data
  const currentProduct = getProduct(product.id);
  
  // Check if product is in cart (checking for default size/color combination)
  const cartItem = cartState.items.find(item => 
    item.id === product.id && 
    item.size === "Medium" && 
    item.color === "Default"
  );

  const isInCart = !!cartItem;

  const handleAddToCart = () => {
    if (currentProduct.stock > 0) {
      addToCart(currentProduct, "Medium", "Default");
      decreaseStock(product.id, 1);
    }
  };

  const handleRemoveFromCart = () => {
    if (cartItem) {
      removeFromCart(product.id, "Medium", "Default");
      increaseStock(product.id, cartItem.quantity);
    }
  };

  return (
    <div class="bg-gray-100 rounded-lg overflow-hidden transition-transform hover:scale-[1.02] duration-300">
      <div class="h-48 bg-gray-200 flex items-center justify-center">
        <img
          src={getUrl(product.image)}
          alt={product.name}
          class="h-full w-auto object-cover"
        />
      </div>
      <div class="p-4">
        <h3 class="font-medium"> {product.name.split(" ")[0]}</h3>
        <div class="flex items-center justify-between">
          <div class="flex items-center my-1">
            <div class="flex text-yellow-400">
              <StarRating
                rating={product.rating}
                maxRating={product.maxRating}
              />
            </div>
            <span class="text-xs text-gray-500 ml-1">
              {product.rating}/{product.maxRating}
            </span>
          </div>
          {/* <span class="text-xs text-gray-700">
          ({product.stock} pcs left)
          </span> */}

 <span className={`text-sm ml-2 ${currentProduct.stock === 0 ? 'text-red-500' : 'text-gray-500'}`}>
          ({currentProduct.stock} pcs left)
        </span>

        </div>
        <p class="font-bold">
          {product.price}
           {product.originalPrice && (
          <span className="text-gray-500 line-through ml-2">${product.originalPrice}</span>
        )}
        </p>
        <button
        onClick={isInCart ? handleRemoveFromCart : handleAddToCart}
        disabled={!isInCart && currentProduct.stock === 0}

        className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
          currentProduct.stock === 0 && !isInCart
            ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
            : isInCart
            ? 'bg-red-600 hover:bg-red-700 text-white'
            : 'bg-gray-800 hover:bg-gray-900 text-white'
        }`}
      >
{currentProduct.stock === 0 && !isInCart 
          ? 'Out of Stock'
          : isInCart 
          ? 'Remove from Cart' 
          : 'Add to Cart'
        }      </button>
      </div>
    </div>
  );
}
