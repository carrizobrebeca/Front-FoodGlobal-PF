import React from 'react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

// Cargar la clave pública de Stripe
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ totalAmount, cartItems, userId, onSuccess, onError, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);

  React.useEffect(() => {
    if (success) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://back-foodglobal-pf.up.railway.app/create-payment-intent', {
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
    <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg w-full max-w-md mx-auto relative">
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900">
        X
      </button>
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

const StripeCheckout = ({ totalAmount, cartItems, userId, onSuccess, onError, onClose }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm 
      totalAmount={totalAmount} 
      cartItems={cartItems} 
      userId={userId}
      onSuccess={onSuccess} 
      onError={onError} 
      onClose={onClose} // Añadir el onClose aquí
    />
  </Elements>
);

export default StripeCheckout;
