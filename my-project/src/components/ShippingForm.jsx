import React, { useState } from 'react';
import { useCheckout } from '../context/CheckoutContext';
import FormInput from './FormInput';

const ShippingForm = () => {
  const { checkoutState, setShippingInfo, setStep } = useCheckout();
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States',
    ...checkoutState.shippingInfo
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    if (validateForm()) {
      console.log('Validation passed, proceeding to next step');
      setShippingInfo(formData);
      setStep(2);
    } else {
      console.log('Validation failed with errors:', errors);
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
      
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={() => {
            // Fill with demo data and proceed
            const demoData = {
              firstName: 'John',
              lastName: 'Doe',
              email: 'john.doe@example.com',
              phone: '+1 (555) 123-4567',
              address: '123 Main Street',
              city: 'New York',
              state: 'NY',
              zipCode: '10001',
              country: 'United States'
            };
            setShippingInfo(demoData);
            setStep(2);
          }}
          className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-medium"
        >
          Skip with Demo Data
        </button>
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium"
        >
          Continue to Payment
        </button>
      </div>
    </form>
  );
};

export default ShippingForm; 