import React, { useState } from 'react';
import { useCheckout } from '../context/CheckoutContext';
import { SHIPPING_METHODS } from '../constants/shipping';
import FormInput from './FormInput';



const PaymentForm = () => {
  const { checkoutState, setPaymentInfo, setShippingMethod, setPaymentMethod, setStep } = useCheckout();
  const [selectedShipping, setSelectedShipping] = useState(checkoutState.shippingMethod || 'standard');
  const [selectedPayment, setSelectedPayment] = useState(checkoutState.paymentMethod || 'card');
  const [cardData, setCardData] = useState({
    cardNumber: "4242 4242 4242 4242",
    expiryDate: '12/25',
    cvv: '123',
    cardName: 'John Doe',
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
              value={cardData.cardNumber }
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

export default PaymentForm; 