import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './Checkout/CheckoutForm';

// 1️⃣ Load Stripe publishable key (from .env)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// 2️⃣ StripeCheckout component wraps the Stripe Elements provider
//    and passes Stripe context + clientSecret into CheckoutForm.
const StripeCheckout = ({ clientSecret, onSuccess, onError, formData }) => {
  // If clientSecret not provided, don't render payment form
  if (!clientSecret) return null;

  // Stripe Elements appearance and clientSecret setup
  const options = {
    clientSecret,
    appearance: { theme: "stripe" },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      {/* CheckoutForm handles the actual payment submission */}
      <CheckoutForm
        clientSecret={clientSecret}
        formData={formData}      
        onSuccess={onSuccess}
        onError={onError}
      />
    </Elements>
  );
};

export default StripeCheckout;
