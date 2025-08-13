import React from 'react';
import { useCheckout } from '../context/CheckoutContext';
import StepIndicator from './StepIndicator';
import ShippingForm from './ShippingForm';
import PaymentForm from './PaymentForm';
import OrderReview from './OrderReview';
import OrderConfirmation from './OrderConfirmation';

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

export default CheckoutPage; 