import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ totalAmount, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (success) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 5000); // 5000 ms = 5 segundos

      return () => clearTimeout(timer); // Limpiar temporizador si el componente se desmonta antes de tiempo
    }
  }, [success]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/create-payment-intent', {
        amount: totalAmount,
      });

      const { clientSecret } = response.data;

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: 'Nombre del Cliente',
          },
        },
      });

      if (error) {
        setError(error.message);
        onError(error.message);
      } else if (paymentIntent.status === 'succeeded') {
        setSuccess(true);
        onSuccess();
      }
    } catch (error) {
      setError('Error al procesar el pago: ' + error.message);
      onError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Pago</h2>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="bg-gray-200 p-4 rounded-lg shadow-md mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-1">Número de tarjeta</label>
            <CardElement 
              options={{ 
                style: { 
                  base: { 
                    fontSize: '16px', 
                    color: '#424770', 
                    '::placeholder': { color: '#aab7c4' },
                    padding: '10px',
                  } 
                } 
              }} 
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold">Monto: ${totalAmount / 100}</p>
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300"
          disabled={!stripe}
        >
          Pagar
        </button>
        {error && <div className="mt-4 text-red-600">{error}</div>}
        {showSuccess && (
          <div className="mt-4 text-green-600">
            ¡Pago exitoso!
          </div>
        )}
      </form>
    </div>
  );
};

const StripeCheckout = ({ totalAmount, onSuccess, onError }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm totalAmount={totalAmount} onSuccess={onSuccess} onError={onError} />
  </Elements>
);

export default StripeCheckout;
