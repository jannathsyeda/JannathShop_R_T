import React from 'react'
import  img1 from "./assets/img/image 1.png"
import ProductItem from './ProductItem'
import { useState } from 'react'

export default function ProductList({PRODUCTS}) {
  const [sortBy, setSortBy] = useState('Most Popular');
  const [products, setProducts] = useState(PRODUCTS);

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    
    let sortedProducts = [...PRODUCTS];
    switch (value) {
      case 'Most Popular':
        sortedProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'Price: Low to High':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    setProducts(sortedProducts);
  };
  return (<>
     <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold">Your Products</h2>
            <div class="flex items-center space-x-2">
              <span class="text-sm">Sort by:</span>
              <select
              id="sort"
            value={sortBy}
            onChange={handleSortChange}
             class="border rounded-md px-2 py-1 text-sm">
                <option>Most Popular</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>
  <div class="product-grid">
 {products?.length > 0 && 
  products.map(product => (
    <ProductItem key={product.id} product={product} />
  ))
}
         
            </div>  </>)
}
