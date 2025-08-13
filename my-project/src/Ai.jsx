import React, { createContext, useContext, useReducer, useState } from 'react';

// Sample product data
const PRODUCTS = [
  {
    id: 1,
    name: "Gradient Graphic T-shirt",
    price: 145,
    rating: 4,
    maxRating: 5,
    stock: 212,
    image: "/api/placeholder/250/250",
    category: "t-shirt"
  },
  {
    id: 2,
    name: "Polo with Tipping Details",
    price: 180,
    rating: 1,
    maxRating: 5,
    stock: 320,
    image: "/api/placeholder/250/250",
    category: "polo"
  },
  {
    id: 3,
    name: "Black Striped T-shirt",
    price: 120,
    originalPrice: 160,
    rating: 3,
    maxRating: 5,
    stock: 420,
    image: "/api/placeholder/250/250",
    category: "t-shirt"
  },
  {
    id: 4,
    name: "Skinny Fit Jeans",
    price: 240,
    originalPrice: 260,
    rating: 4,
    maxRating: 5,
    stock: 20,
    image: "/api/placeholder/250/250",
    category: "jeans"
  },
  {
    id: 5,
    name: "Checkered Shirt",
    price: 180,
    rating: 4,
    maxRating: 5,
    stock: 20,
    image: "/api/placeholder/250/250",
    category: "shirt"
  },
  {
    id: 6,
    name: "Sleeve Striped T-shirt",
    price: 130,
    originalPrice: 160,
    rating: 4,
    maxRating: 5,
    stock: 20,
    image: "/api/placeholder/250/250",
    category: "t-shirt"
  }
];

// Cart Context
const CartContext = createContext();

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => 
        item.id === action.payload.id && 
        item.size === action.payload.size && 
        item.color === action.payload.color
      );
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id && 
            item.size === action.payload.size && 
            item.color === action.payload.color
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      };
      
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => 
          !(item.id === action.payload.id && 
            item.size === action.payload.size && 
            item.color === action.payload.color)
        )
      };
      
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id && 
          item.size === action.payload.size && 
          item.color === action.payload.color
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        ).filter(item => item.quantity > 0)
      };
      
    case 'APPLY_DISCOUNT':
      return {
        ...state,
        discount: action.payload
      };
      
    default:
      return state;
  }
};

// Cart Provider Component
const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, {
    items: [], // Start with empty cart
    discount: 0 // Start with no discount
  });

  const addToCart = (product, size = "Medium", color = "Default") => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { ...product, size, color }
    });
  };

  const removeFromCart = (id, size, color) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: { id, size, color }
    });
  };

  const updateQuantity = (id, size, color, quantity) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id, size, color, quantity }
    });
  };

  const applyDiscount = (discount) => {
    dispatch({
      type: 'APPLY_DISCOUNT',
      payload: discount
    });
  };

  const getCartTotal = () => {
    return cartState.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cartState.items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cartState,
      addToCart,
      removeFromCart,
      updateQuantity,
      applyDiscount,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook to use cart context
const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Star Rating Component
const StarRating = ({ rating, maxRating = 5 }) => {
  return (
    <div className="flex items-center">
      {[...Array(maxRating)].map((_, index) => (
        <svg
          key={index}
          className={`w-4 h-4 ${
            index < rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-1 text-sm text-gray-600">{rating}/{maxRating}</span>
    </div>
  );
};

// Product Card Component
const ProductCard = ({ product }) => {
  const { cartState, addToCart, removeFromCart } = useCart();

  // Check if product is in cart (checking for default size/color combination)
  const isInCart = cartState.items.some(item => 
    item.id === product.id && 
    item.size === "Medium" && 
    item.color === "Default"
  );

  const handleAddToCart = () => {
    addToCart(product, "Medium", "Default");
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product.id, "Medium", "Default");
  };

  return (
    <div className="bg-gray-100 rounded-lg p-4">
      <div className="aspect-square bg-white rounded-lg mb-4 flex items-center justify-center">
        <div className="w-32 h-32 bg-gray-200 rounded flex items-center justify-center text-gray-500">
          {product.name.split(' ')[0]}
        </div>
      </div>
      
      <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
      
      <div className="mb-2">
        <StarRating rating={product.rating} maxRating={product.maxRating} />
        <span className="text-sm text-gray-500 ml-2">({product.stock} pcs left)</span>
      </div>
      
      <div className="flex items-center mb-4">
        <span className="text-xl font-bold">${product.price}</span>
        {product.originalPrice && (
          <span className="text-gray-500 line-through ml-2">${product.originalPrice}</span>
        )}
      </div>
      
      <button
        onClick={isInCart ? handleRemoveFromCart : handleAddToCart}
        className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
          isInCart
            ? 'bg-red-600 hover:bg-red-700 text-white'
            : 'bg-gray-800 hover:bg-gray-900 text-white'
        }`}
      >
        {isInCart ? 'Remove from Cart' : 'Add to Cart'}
      </button>
    </div>
  );
};

// Product List Component
const ProductList = () => {
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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Products</h2>
        <div className="flex items-center">
          <label htmlFor="sort" className="mr-2 text-sm">Sort by:</label>
          <select
            id="sort"
            value={sortBy}
            onChange={handleSortChange}
            className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Most Popular</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

// Cart Item Component
const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity) => {
    updateQuantity(item.id, item.size, item.color, newQuantity);
  };

  const handleRemove = () => {
    removeFromCart(item.id, item.size, item.color);
  };

  return (
    <div className="flex items-center py-4 border-b border-gray-200">
      <div className="w-12 h-12 bg-blue-200 rounded mr-4 flex items-center justify-center">
        <div className="w-8 h-8 bg-blue-400 rounded"></div>
      </div>
      
      <div className="flex-1">
        <h4 className="font-semibold text-sm">{item.name}</h4>
        <p className="text-xs text-gray-500">Size: {item.size}</p>
        <p className="text-xs text-gray-500">Color: {item.color}</p>
      </div>
      
      <div className="text-right">
        <div className="font-bold">${item.price}</div>
        <div className="flex items-center mt-2">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center text-sm hover:bg-gray-100"
          >
            −
          </button>
          <span className="mx-2 text-sm">{item.quantity}</span>
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center text-sm hover:bg-gray-100"
          >
            +
          </button>
        </div>
      </div>
      
      <button
        onClick={handleRemove}
        className="ml-4 text-gray-400 hover:text-red-500"
      >
        ×
      </button>
    </div>
  );
};

// Cart List Component
const CartList = () => {
  const { cartState, getCartTotal, applyDiscount } = useCart();
  const [promoCode, setPromoCode] = useState('');

  const subtotal = getCartTotal();
  const discountAmount = (subtotal * cartState.discount) / 100;
  const deliveryFee = 15;
  const total = subtotal - discountAmount + deliveryFee;

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'save20') {
      applyDiscount(20);
    } else if (promoCode.toLowerCase() === 'save10') {
      applyDiscount(10);
    }
    setPromoCode('');
  };

  return (
    <div className="bg-white rounded-lg p-6 h-fit">
      <h3 className="text-xl font-bold mb-4">YOUR CART</h3>
      
      <div className="space-y-2">
        {cartState.items.map((item, index) => (
          <CartItem key={`${item.id}-${item.size}-${item.color}-${index}`} item={item} />
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="font-bold mb-4">Order Summary</h4>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>
          <div className="flex justify-between text-red-500">
            <span>Discount (-{cartState.discount}%)</span>
            <span>-${discountAmount}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>${deliveryFee}</span>
          </div>
          <div className="flex justify-between font-bold text-lg pt-2 border-t">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>
        
        <div className="mt-4 flex">
          <input
            type="text"
            placeholder="Add promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleApplyPromo}
            className="px-4 py-2 bg-black text-white rounded-r-lg hover:bg-gray-800"
          >
            Apply
          </button>
        </div>
        
        <button className="w-full mt-4 bg-black text-white py-3 rounded-lg hover:bg-gray-800 font-medium">
          Go to Checkout →
        </button>
      </div>
    </div>
  );
};

// Main Content Component
const MainContent = () => {
  return (
    <main className="container mx-auto px-4 md:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ProductList />
        </div>
        <CartList />
      </div>
    </main>
  );
};

// Page Component
const Page = () => {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <MainContent />
      </div>
    </CartProvider>
  );
};

// Checkout Context
const CheckoutContext = createContext();

const checkoutReducer = (state, action) => {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    case 'SET_SHIPPING_INFO':
      return { ...state, shippingInfo: { ...state.shippingInfo, ...action.payload } };
    case 'SET_PAYMENT_INFO':
      return { ...state, paymentInfo: { ...state.paymentInfo, ...action.payload } };
    case 'SET_SHIPPING_METHOD':
      return { ...state, shippingMethod: action.payload };
    case 'SET_PAYMENT_METHOD':
      return { ...state, paymentMethod: action.payload };
    case 'SET_ORDER_PLACED':
      return { ...state, orderPlaced: true, orderNumber: action.payload };
    case 'RESET_CHECKOUT':
      return {
        currentStep: 1,
        shippingInfo: {},
        paymentInfo: {},
        shippingMethod: null,
        paymentMethod: null,
        orderPlaced: false,
        orderNumber: null
      };
    default:
      return state;
  }
};

const CheckoutProvider = ({ children }) => {
  const [checkoutState, dispatch] = useReducer(checkoutReducer, {
    currentStep: 1,
    shippingInfo: {},
    paymentInfo: {},
    shippingMethod: null,
    paymentMethod: null,
    orderPlaced: false,
    orderNumber: null
  });

  const setStep = (step) => dispatch({ type: 'SET_STEP', payload: step });
  const setShippingInfo = (info) => dispatch({ type: 'SET_SHIPPING_INFO', payload: info });
  const setPaymentInfo = (info) => dispatch({ type: 'SET_PAYMENT_INFO', payload: info });
  const setShippingMethod = (method) => dispatch({ type: 'SET_SHIPPING_METHOD', payload: method });
  const setPaymentMethod = (method) => dispatch({ type: 'SET_PAYMENT_METHOD', payload: method });
  const setOrderPlaced = (orderNumber) => dispatch({ type: 'SET_ORDER_PLACED', payload: orderNumber });
  const resetCheckout = () => dispatch({ type: 'RESET_CHECKOUT' });

  return (
    <CheckoutContext.Provider value={{
      checkoutState,
      setStep,
      setShippingInfo,
      setPaymentInfo,
      setShippingMethod,
      setPaymentMethod,
      setOrderPlaced,
      resetCheckout
    }}>
      {children}
    </CheckoutContext.Provider>
  );
};

const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
};

// Shipping Methods
const SHIPPING_METHODS = [
  { id: 'standard', name: 'Standard Delivery', price: 15, time: '5-7 business days' },
  { id: 'express', name: 'Express Delivery', price: 25, time: '2-3 business days' },
  { id: 'overnight', name: 'Overnight Delivery', price: 35, time: '1 business day' }
];

// Form Input Component
const FormInput = ({ label, type = "text", value, onChange, required = false, error, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        error ? 'border-red-500' : 'border-gray-300'
      }`}
      {...props}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

// Step Indicator Component
const StepIndicator = ({ currentStep, totalSteps }) => {
  const steps = ['Shipping', 'Payment', 'Review', 'Confirmation'];
  
  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
            index + 1 <= currentStep
              ? 'bg-blue-600 border-blue-600 text-white'
              : 'border-gray-300 text-gray-500'
          }`}>
            {index + 1 <= currentStep ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              index + 1
            )}
          </div>
          <span className={`ml-2 text-sm ${
            index + 1 <= currentStep ? 'text-blue-600 font-medium' : 'text-gray-500'
          }`}>
            {step}
          </span>
          {index < steps.length - 1 && (
            <div className={`w-8 h-0.5 mx-4 ${
              index + 1 < currentStep ? 'bg-blue-600' : 'bg-gray-300'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
};

// Shipping Information Component
const ShippingForm = () => {
  const { checkoutState, setShippingInfo, setStep } = useCheckout();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    ...checkoutState.shippingInfo
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShippingInfo(formData);
      setStep(2);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="First Name"
          value={formData.firstName}
          onChange={(value) => setFormData({...formData, firstName: value})}
          required
          error={errors.firstName}
        />
        <FormInput
          label="Last Name"
          value={formData.lastName}
          onChange={(value) => setFormData({...formData, lastName: value})}
          required
          error={errors.lastName}
        />
      </div>
      
      <FormInput
        label="Email"
        type="email"
        value={formData.email}
        onChange={(value) => setFormData({...formData, email: value})}
        required
        error={errors.email}
      />
      
      <FormInput
        label="Phone"
        type="tel"
        value={formData.phone}
        onChange={(value) => setFormData({...formData, phone: value})}
        required
        error={errors.phone}
      />
      
      <FormInput
        label="Address"
        value={formData.address}
        onChange={(value) => setFormData({...formData, address: value})}
        required
        error={errors.address}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormInput
          label="City"
          value={formData.city}
          onChange={(value) => setFormData({...formData, city: value})}
          required
          error={errors.city}
        />
        <FormInput
          label="State"
          value={formData.state}
          onChange={(value) => setFormData({...formData, state: value})}
          required
          error={errors.state}
        />
        <FormInput
          label="ZIP Code"
          value={formData.zipCode}
          onChange={(value) => setFormData({...formData, zipCode: value})}
          required
          error={errors.zipCode}
        />
      </div>
      
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium mt-6"
      >
        Continue to Payment
      </button>
    </form>
  );
};

// Payment Form Component
const PaymentForm = () => {
  const { checkoutState, setPaymentInfo, setShippingMethod, setPaymentMethod, setStep } = useCheckout();
  const [selectedShipping, setSelectedShipping] = useState(checkoutState.shippingMethod || 'standard');
  const [selectedPayment, setSelectedPayment] = useState(checkoutState.paymentMethod || 'card');
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    ...checkoutState.paymentInfo
  });
  const [errors, setErrors] = useState({});

  const validatePayment = () => {
    const newErrors = {};
    if (selectedPayment === 'card') {
      if (!cardData.cardNumber) newErrors.cardNumber = 'Card number is required';
      if (!cardData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
      if (!cardData.cvv) newErrors.cvv = 'CVV is required';
      if (!cardData.cardName) newErrors.cardName = 'Cardholder name is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validatePayment()) {
      setShippingMethod(selectedShipping);
      setPaymentMethod(selectedPayment);
      setPaymentInfo(cardData);
      setStep(3);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Payment & Shipping</h2>
      
      {/* Shipping Methods */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Shipping Method</h3>
        <div className="space-y-3">
          {SHIPPING_METHODS.map((method) => (
            <label key={method.id} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="shipping"
                value={method.id}
                checked={selectedShipping === method.id}
                onChange={(e) => setSelectedShipping(e.target.value)}
                className="mr-3"
              />
              <div className="flex-1">
                <div className="font-medium">{method.name}</div>
                <div className="text-sm text-gray-500">{method.time}</div>
              </div>
              <div className="font-semibold">${method.price}</div>
            </label>
          ))}
        </div>
      </div>
      
      {/* Payment Methods */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
        <div className="space-y-3 mb-6">
          <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="payment"
              value="card"
              checked={selectedPayment === 'card'}
              onChange={(e) => setSelectedPayment(e.target.value)}
              className="mr-3"
            />
            <span>Credit/Debit Card</span>
          </label>
          <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="payment"
              value="paypal"
              checked={selectedPayment === 'paypal'}
              onChange={(e) => setSelectedPayment(e.target.value)}
              className="mr-3"
            />
            <span>PayPal</span>
          </label>
          <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="payment"
              value="apple"
              checked={selectedPayment === 'apple'}
              onChange={(e) => setSelectedPayment(e.target.value)}
              className="mr-3"
            />
            <span>Apple Pay</span>
          </label>
        </div>
        
        {selectedPayment === 'card' && (
          <div className="space-y-4">
            <FormInput
              label="Card Number"
              value={cardData.cardNumber}
              onChange={(value) => setCardData({...cardData, cardNumber: value})}
              placeholder="1234 5678 9012 3456"
              required
              error={errors.cardNumber}
            />
            <FormInput
              label="Cardholder Name"
              value={cardData.cardName}
              onChange={(value) => setCardData({...cardData, cardName: value})}
              required
              error={errors.cardName}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label="Expiry Date"
                value={cardData.expiryDate}
                onChange={(value) => setCardData({...cardData, expiryDate: value})}
                placeholder="MM/YY"
                required
                error={errors.expiryDate}
              />
              <FormInput
                label="CVV"
                value={cardData.cvv}
                onChange={(value) => setCardData({...cardData, cvv: value})}
                placeholder="123"
                required
                error={errors.cvv}
              />
            </div>
          </div>
        )}
      </div>
      
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 font-medium"
        >
          Back to Shipping
        </button>
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium"
        >
          Review Order
        </button>
      </div>
    </form>
  );
};

// Order Review Component
const OrderReview = () => {
  const { cartState, getCartTotal } = useCart();
  const { checkoutState, setStep, setOrderPlaced } = useCheckout();
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedShippingMethod = SHIPPING_METHODS.find(m => m.id === checkoutState.shippingMethod);
  const subtotal = getCartTotal();
  const discountAmount = (subtotal * cartState.discount) / 100;
  const shippingFee = selectedShippingMethod ? selectedShippingMethod.price : 15;
  const total = subtotal - discountAmount + shippingFee;

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    const orderNumber = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    setOrderPlaced(orderNumber);
    setStep(4);
    setIsProcessing(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Review Your Order</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Order Items</h3>
            <div className="space-y-4">
              {cartState.items.map((item, index) => (
                <div key={index} className="flex items-center py-3 border-b last:border-b-0">
                  <div className="w-16 h-16 bg-gray-200 rounded mr-4"></div>
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-500">
                      Size: {item.size} | Color: {item.color} | Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="font-semibold">${item.price * item.quantity}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
            <div>
              <p className="font-medium">{checkoutState.shippingInfo.firstName} {checkoutState.shippingInfo.lastName}</p>
              <p>{checkoutState.shippingInfo.address}</p>
              <p>{checkoutState.shippingInfo.city}, {checkoutState.shippingInfo.state} {checkoutState.shippingInfo.zipCode}</p>
              <p>{checkoutState.shippingInfo.country}</p>
              <p className="mt-2 text-sm text-gray-600">
                Email: {checkoutState.shippingInfo.email}<br />
                Phone: {checkoutState.shippingInfo.phone}
              </p>
            </div>
          </div>
          
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Shipping & Payment</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Shipping:</span> {selectedShippingMethod?.name} (${selectedShippingMethod?.price})</p>
              <p><span className="font-medium">Payment:</span> {checkoutState.paymentMethod === 'card' ? 'Credit/Debit Card' : checkoutState.paymentMethod}</p>
              {checkoutState.paymentMethod === 'card' && (
                <p className="text-sm text-gray-600">Card ending in ****{checkoutState.paymentInfo.cardNumber?.slice(-4)}</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="bg-white border rounded-lg p-6 h-fit">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between text-red-500">
              <span>Discount (-{cartState.discount}%)</span>
              <span>-${discountAmount}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shippingFee}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>
          
          <div className="mt-6 space-y-3">
            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Processing...' : `Place Order - ${total}`}
            </button>
            <button
              onClick={() => setStep(2)}
              className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300"
            >
              Back to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Order Confirmation Component
const OrderConfirmation = () => {
  const { checkoutState, resetCheckout } = useCheckout();
  const { cartState } = useCart();

  const handleContinueShopping = () => {
    resetCheckout();
    // You would typically clear the cart here too
    window.location.reload(); // Simple way to reset everything
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 mb-8">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-green-800 mb-2">Order Confirmed!</h2>
        <p className="text-green-700">Thank you for your purchase. Your order has been successfully placed.</p>
      </div>
      
      <div className="bg-white border rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Order Details</h3>
        <div className="space-y-2 text-sm">
          <p><span className="font-medium">Order Number:</span> {checkoutState.orderNumber}</p>
          <p><span className="font-medium">Email:</span> {checkoutState.shippingInfo.email}</p>
          <p><span className="font-medium">Items:</span> {cartState.items.length} items</p>
          <p><span className="font-medium">Shipping to:</span> {checkoutState.shippingInfo.address}, {checkoutState.shippingInfo.city}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <p className="text-gray-600">
          A confirmation email has been sent to {checkoutState.shippingInfo.email}. 
          You can track your order using the order number above.
        </p>
        
        <button
          onClick={handleContinueShopping}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

// Main Checkout Component
const CheckoutPage = () => {
  const { checkoutState } = useCheckout();

  const renderStep = () => {
    switch (checkoutState.currentStep) {
      case 1:
        return <ShippingForm />;
      case 2:
        return <PaymentForm />;
      case 3:
        return <OrderReview />;
      case 4:
        return <OrderConfirmation />;
      default:
        return <ShippingForm />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <StepIndicator currentStep={checkoutState.currentStep} totalSteps={4} />
        {renderStep()}
      </div>
    </div>
  );
};

// Updated Cart List Component with Checkout Navigation
const CartListUpdated = () => {
  const { cartState, getCartTotal, applyDiscount } = useCart();
  const { setStep } = useCheckout();
  const [promoCode, setPromoCode] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);

  const subtotal = getCartTotal();
  const discountAmount = (subtotal * cartState.discount) / 100;
  const deliveryFee = 15;
  const total = subtotal - discountAmount + deliveryFee;

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'save20') {
      applyDiscount(20);
    } else if (promoCode.toLowerCase() === 'save10') {
      applyDiscount(10);
    }
    setPromoCode('');
  };

  const handleCheckout = () => {
    setStep(1);
    setShowCheckout(true);
  };

  if (showCheckout) {
    return <CheckoutPage />;
  }

  return (
    <div className="bg-white rounded-lg p-6 h-fit">
      <h3 className="text-xl font-bold mb-4">YOUR CART</h3>
      
      <div className="space-y-2">
        {cartState.items.map((item, index) => (
          <CartItem key={`${item.id}-${item.size}-${item.color}-${index}`} item={item} />
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="font-bold mb-4">Order Summary</h4>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>
          <div className="flex justify-between text-red-500">
            <span>Discount (-{cartState.discount}%)</span>
            <span>-${discountAmount}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>${deliveryFee}</span>
          </div>
          <div className="flex justify-between font-bold text-lg pt-2 border-t">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>
        
        <div className="mt-4 flex">
          <input
            type="text"
            placeholder="Add promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleApplyPromo}
            className="px-4 py-2 bg-black text-white rounded-r-lg hover:bg-gray-800"
          >
            Apply
          </button>
        </div>
        
        <button 
          onClick={handleCheckout}
          className="w-full mt-4 bg-black text-white py-3 rounded-lg hover:bg-gray-800 font-medium"
        >
          Go to Checkout →
        </button>
      </div>
    </div>
  );
};

// Updated Main Content Component
const MainContentUpdated = () => {
  return (
    <main className="container mx-auto px-4 md:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ProductList />
        </div>
        <CartListUpdated />
      </div>
    </main>
  );
};

// Updated Page Component
const PageUpdated = () => {
  return (
    <CartProvider>
      <CheckoutProvider>
        <div className="min-h-screen bg-gray-50">
          <MainContentUpdated />
        </div>
      </CheckoutProvider>
    </CartProvider>
  );
};

// Main App Component
export default function App() {
  return <PageUpdated />;
}