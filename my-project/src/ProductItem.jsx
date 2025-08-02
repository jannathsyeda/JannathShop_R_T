import React from 'react'
import { getUrl } from './ImageUrl/ImageUrl.js'

export default function ProductItem({ product }) {
  // Generate star rating display
  const renderStars = (rating, maxRating) => {
    const stars = [];
    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        <span key={i} className={i <= rating ? "text-yellow-400" : "text-gray-300"}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
      <div class="bg-gray-100 rounded-lg overflow-hidden transition-transform hover:scale-[1.02] duration-300">
                    <div class="h-48 bg-gray-200 flex items-center justify-center">
                      <img src={getUrl(product.image)} alt={product.name}
                        class="h-full w-auto object-cover"/>
                    </div>
                    <div class="p-4">
                      <h3 class="font-medium">{product.name}</h3> 
                      <div class="flex items-center justify-between">
                        <div class="flex items-center my-1">
                          <div class="flex text-yellow-400">
                            {renderStars(product.rating, product.maxRating)}
                          </div>
                          <span class="text-xs text-gray-500 ml-1">{product.rating}/{product.maxRating}</span>
                        </div>
                        <span class="text-xs text-gray-700">({product.stock} {product.stockUnit})</span>
                      </div>
                      <p class="font-bold">{product.currency}{product.price}</p> 
                      <button class="w-full mt-2 bg-red-800 py-1 text-gray-100 rounded flex items-center justify-center">
                        {product.inCart ? "Remove from Cart" : "Add to Cart"}
                      </button>
                    </div>
                  </div>
  )
}
