import React from 'react'
import  img1 from "./assets/img/image 1.png"
import ProductItem from './ProductItem'
import { useState } from 'react'
import { useProducts } from './context/ProductContext.jsx'


export default function ProductList({PRODUCTS}) {
  const [sortBy, setSortBy] = useState('Most Popular');
  const { products } = useProducts();
  const [sortedProducts, setSortedProducts] = useState(products);

  React.useEffect(() => {
    let sorted = [...products];
    switch (sortBy) {
      case 'Most Popular':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'Price: Low to High':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    setSortedProducts(sorted);
  }, [products, sortBy]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
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
 {sortedProducts.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
         
            </div>  </>)
}
