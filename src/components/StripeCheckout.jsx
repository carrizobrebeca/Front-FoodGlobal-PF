// src/StripeCheckout.js
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios'
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Solicitar el client_secret al backend con el monto que desees
    const amount = prompt('Enter the amount in dollars:');
    const amountInCents = Math.round(parseFloat(amount) * 100); // Convertir a centavos
  
    try {
      const response = await axios.post('/create-payment-intent', {
        amount: amountInCents, // Enviar monto en centavos
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
      } else if (paymentIntent.status === 'succeeded') {
        setSuccess(true);
      }
    } catch (error) {
      setError('Error al procesar el pago: ' + error.message);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>Pagar</button>
      {error && <div>{error}</div>}
      {success && <div>¡Pago exitoso!</div>}
    </form>
  );
};

const StripeCheckout = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default StripeCheckout;
