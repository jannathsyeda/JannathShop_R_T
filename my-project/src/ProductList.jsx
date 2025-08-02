import React from 'react'
import  img1 from "./assets/img/image 1.png"
import ProductItem from './ProductItem'
import { products } from './data'

export default function ProductList() {
  return (<>
     <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold">Your Products</h2>
            <div class="flex items-center space-x-2">
              <span class="text-sm">Sort by:</span>
              <select class="border rounded-md px-2 py-1 text-sm">
                <option>Most Popular</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>
  <div class="product-grid">
            {products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
            </div>  </>)
}
