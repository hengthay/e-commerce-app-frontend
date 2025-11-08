import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { placeOrder } from "../../features/orders/orderSlice";

const CheckoutForm = ({ clientSecret, onSuccess, onError, formData }) => {
  // ✅ Stripe hooks for payment handling
  const stripe = useStripe();
  const elements = useElements();

  // ✅ Redux + Router utilities
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Local state
  const [message, setMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Clear any previous messages when new clientSecret arrives
  useEffect(() => {
    setMessage(null);
  }, [clientSecret]);

  // 🧾 Form submit handler: called when user clicks "Pay with Card"
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setSubmitting(true);
    setMessage(null);

    try {
      // 1️⃣ Ask Stripe to confirm the payment with the current Elements state
      const result = await stripe.confirmPayment({
        elements,
        // redirect: "if_required" ensures SPA flow (no page reloads)
        redirect: "if_required"
      });

      // 2️⃣ If Stripe returns an error, show failure alert
      if (result.error) {
        setMessage(result.error.message || "Payment failed");
        if (onError) onError(result.error);

        Swal.fire({
          icon: "error",
          title: "Payment Failed ❌",
          text: "Your order was placed, but payment was not successful.",
          confirmButtonText: "Go Home",
        }).then(() => navigate("/"));
        return;
      }

      // 3️⃣ If payment succeeded
      const pi = result.paymentIntent;
      if (pi && pi.status === "succeeded") {
        // ⚡ Place the order on backend (stores address + clears cart)
        await dispatch(placeOrder(formData)).unwrap();

        // Optional callbacks
        setMessage("Payment succeeded 🎉");
        if (onSuccess) onSuccess();

        // Success alert
        Swal.fire({
          icon: "success",
          title: "Payment Successful ✅",
          text: "Thank you for your purchase!",
          timer: 1500,
          showConfirmButton: false,
        });

        // Redirect to homepage after short delay
        setTimeout(() => navigate("/"), 1500);
      } else {
        // Handle "processing" or "requires_action" states (e.g. 3D Secure)
        setMessage("Payment processing — follow any on-screen steps.");
      }
    } catch (err) {
      // 4️⃣ Catch unexpected runtime errors
      console.error("confirmPayment error:", err);
      setMessage("An unexpected error occurred.");
      if (onError) onError(err);

      Swal.fire({
        icon: "error",
        title: "Unexpected Error",
        text: "Please try again or contact support.",
        confirmButtonText: "Go Home",
      }).then(() => navigate("/"));
    } finally {
      // 5️⃣ Reset loading spinner
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Stripe’s dynamic payment UI */}
      <div className="p-4 border rounded">
        <PaymentElement />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={!stripe || submitting}
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
      >
        {submitting ? "Processing…" : "Pay with Card"}
      </button>

      {/* Optional message area */}
      {message && (
        <div className="mt-3 text-center text-sm text-gray-700">{message}</div>
      )}
    </form>
  );
};

export default CheckoutForm;
