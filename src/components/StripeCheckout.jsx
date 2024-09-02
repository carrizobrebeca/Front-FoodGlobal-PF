// src/StripeCheckout.js
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      // Solicitar el client_secret al backend con el monto total del carrito
      const response = await axios.post('/create-payment-intent', {
        amount: totalAmount, // Monto en centavos
      });
  
      const { clientSecret } = response.data;
  
      // Confirmar el pago con el client_secret
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
      } else if (paymentIntent.status === 'succeeded') {
        setSuccess(true);
      }
    } catch (error) {
      setError('Error al procesar el pago: ' + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Pago</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="card">
            Datos de la Tarjeta
          </label>
          <CardElement className="p-2 border border-gray-300 rounded-lg" />
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
        {success && <div className="mt-4 text-green-600">¡Pago exitoso!</div>}
      </form>
    </div>
  );
};

const StripeCheckout = ({ totalAmount }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm totalAmount={totalAmount} />
  </Elements>
);

export default StripeCheckout;
