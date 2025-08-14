import React, { createContext, useContext, useReducer, useState } from 'react';

// Sample products
const PRODUCTS = [
  { id: 1, name: "T-shirt", price: 25, image: "👕" },
  { id: 2, name: "Jeans", price: 60, image: "👖" },
  { id: 3, name: "Sneakers", price: 80, image: "👟" },
  { id: 4, name: "Hat", price: 15, image: "🧢" }
];

// 1. CREATE CONTEXT (Simple - just one line)
const CartContext = createContext();

// 2. CREATE REDUCER (Simple function)
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.find(item => item.id === action.product.id);
      if (existingItem) {
        return state.map(item =>
          item.id === action.product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.product, quantity: 1 }];
    
    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.productId);
    
    case 'UPDATE_QUANTITY':
      return state.map(item =>
        item.id === action.productId 
          ? { ...item, quantity: action.quantity }
          : item
      ).filter(item => item.quantity > 0);
    
    default:
      return state;
  }
}

// 3. PRODUCT CARD COMPONENT
function ProductCard({ product }) {
  const { cartState, cartDispatch } = useContext(CartContext);
  
  const isInCart = cartState.some(item => item.id === product.id);
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="text-6xl text-center mb-2">{product.image}</div>
      <h3 className="font-bold text-lg mb-2">{product.name}</h3>
      <p className="text-xl font-semibold mb-4">${product.price}</p>
      
      <button
        onClick={() => cartDispatch({ type: 'ADD_ITEM', product })}
        className={`w-full py-2 px-4 rounded font-medium ${
          isInCart 
            ? 'bg-green-500 hover:bg-green-600 text-white' 
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        {isInCart ? 'Add More' : 'Add to Cart'}
      </button>
    </div>
  );
}

// 4. CART ITEM COMPONENT
function CartItem({ item }) {
  const { cartDispatch } = useContext(CartContext);
  
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
      <div className="flex items-center space-x-3">
        <span className="text-2xl">{item.image}</span>
        <div>
          <h4 className="font-medium">{item.name}</h4>
          <p className="text-gray-600">${item.price} each</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={() => cartDispatch({ 
            type: 'UPDATE_QUANTITY', 
            productId: item.id, 
            quantity: item.quantity - 1 
          })}
          className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center"
        >
          −
        </button>
        
        <span className="w-8 text-center font-medium">{item.quantity}</span>
        
        <button
          onClick={() => cartDispatch({ 
            type: 'UPDATE_QUANTITY', 
            productId: item.id, 
            quantity: item.quantity + 1 
          })}
          className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center"
        >
          +
        </button>
        
        <button
          onClick={() => cartDispatch({ type: 'REMOVE_ITEM', productId: item.id })}
          className="ml-2 text-red-500 hover:text-red-700"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

// 5. CART SUMMARY COMPONENT
function CartSummary() {
  const { cartState } = useContext(CartContext);
  
  const totalItems = cartState.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartState.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Cart Summary</h2>
      
      {cartState.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <div className="space-y-3">
          {cartState.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
          
          <div className="border-t pt-3 mt-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total Items: {totalItems}</span>
              <span>Total: ${totalPrice}</span>
            </div>
            
            <button className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded font-medium">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// 6. MAIN APP COMPONENT
export default function App() {
  // Initialize reducer with empty cart
  const [cartState, cartDispatch] = useReducer(cartReducer, []);
  
  return (
    // 7. PROVIDE CONTEXT (Wrap everything)
    <CartContext.Provider value={{ cartState, cartDispatch }}>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Simple Cart Demo</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Products Section */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-4">Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PRODUCTS.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
            
            {/* Cart Section */}
            <div>
              <CartSummary />
            </div>
          </div>
        </div>
      </div>
    </CartContext.Provider>
  );
}