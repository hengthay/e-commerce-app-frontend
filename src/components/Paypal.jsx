// Enhanced src/components/Paypal.jsx with detailed remarks
import { useState } from "react";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

const Paypal = ({ formData, onSuccess, onError }) => {
  // 🟩 Get token for authentication and API base URL
  const token = localStorage.getItem("token");
  const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:3000";
  const navigate = useNavigate();

  // 🟩 Create a preconfigured Axios instance with auth headers if user logged in
  const api = axios.create({
    baseURL: apiBase,
    headers: token
      ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
      : { "Content-Type": "application/json" },
  });

  const [busy, setBusy] = useState(false);
  const [errorDetails, setErrorDetails] = useState(null);

  // 🟩 Check if shipping form data is filled before enabling PayPal button
  const ready =
    !!formData?.street &&
    !!formData?.city &&
    !!formData?.country &&
    !!formData?.postal_code &&
    !!formData?.phone_number;

  // 🟩 Helper to extract consistent data from different response formats
  const getData = (res) => res?.data?.data ?? res?.data ?? {};

  // 🟩 Get PayPal sandbox client ID from environment variables
  const clientId = import.meta.env.VITE_PP_SANDBOX_CLIENT_ID || '';

  // 🟦 If no client ID configured, display helpful message to developer
  if (!clientId) {
    return (
      <div className="text-center p-4 text-red-600">
        PayPal is not configured for this environment. Please set VITE_PP_SANDBOX_CLIENT_ID in your .env file.
      </div>
    );
  }

  return (
    <PayPalScriptProvider
      options={{
        "client-id": clientId,
        currency: "USD",
        intent: "capture",
        "enable-funding": "venmo,paylater",
        "disable-funding": "credit,card",
      }}
    >
      <div>
        {/* 🟩 Show helpful validation messages if not logged in or missing address */}
        {!token && (
          <div className="mb-2 text-sm text-red-600">
            Please log in before paying.
          </div>
        )}
        {!ready && (
          <div className="mb-2 text-sm text-red-600">
            Fill shipping address to enable PayPal
          </div>
        )}

        {/* 🟦 Show any captured error details */}
        {errorDetails && (
          <div className="mb-4 p-3 bg-red-50 border border-red-300 rounded">
            <p className="text-sm text-red-800 font-semibold">Payment Error:</p>
            <p className="text-xs text-red-600 mt-1">{errorDetails}</p>
          </div>
        )}

        <PayPalButtons
          disabled={!ready || !token || busy}
          style={{ layout: "vertical", color: "gold", shape: "rect", label: "paypal" }}

          // 🟩 Triggered when PayPal button is clicked
          onClick={(data, actions) => {
            console.log('🖱️ PayPal button clicked');
            setErrorDetails(null);
            
            // 🟦 Prevent paying if user not logged in or missing form data
            if (!token) {
              const msg = "You must be logged in to pay.";
              setErrorDetails(msg);
              onError?.(msg);
              return actions.reject();
            }
            if (!ready) {
              const msg = "Please fill the shipping address.";
              setErrorDetails(msg);
              onError?.(msg);
              return actions.reject();
            }
            return actions.resolve();
          }}

          // 🟩 Called when creating PayPal order (step 1)
          createOrder={async () => {
            try {
              setBusy(true);
              setErrorDetails(null);
              console.log("🔄 Creating PayPal order with address:", formData);

              // 🟦 Normalize country to uppercase for ISO validation
              const shippingAddress = { ...formData, country: formData.country.toUpperCase() };

              // 🟩 Call backend to create PayPal order
              const res = await api.post("/payments/paypal/create-order", {
                shipping_address: shippingAddress,
              });

              const resData = getData(res);
              console.log("✅ extracted create-order data:", resData);

              // 🟦 Ensure we have valid order id before proceeding
              if (!resData?.id) {
                console.error("❌ No PayPal order id returned. Full response:", res.data);
                throw new Error("No PayPal order id returned");
              }

              console.log("✅ Created order ID:", resData.id);
              return resData.id;
            } catch (err) {
              console.error("❌ create-order failed:", err.response?.data || err.message);
              const errorMsg = err.response?.data?.message || err.message || "Failed to create order";
              setErrorDetails(errorMsg);
              onError?.(errorMsg);
              throw err;
            } finally {
              setBusy(false);
            }
          }}

          // 🟩 Called when buyer approves the payment in PayPal popup (step 2)
          onApprove={async (data, actions) => {
            try {
              setBusy(true);
              setErrorDetails(null);
              console.log("✅ onApprove called with data:", data);
              
              // 🟦 Optional: get order details directly from PayPal SDK
              let orderDetails;
              try {
                orderDetails = await actions.order.get();
                console.log("📦 Order details from PayPal:", orderDetails);
              } catch (err) {
                console.warn("⚠️ Could not fetch order details from SDK:", err);
              }

              // 🟩 Capture payment server-side (step 3)
              console.log("🔄 Capturing order:", data.orderID);
              const capRes = await api.post(`/payments/paypal/capture-order/${data.orderID}`, {});
              console.log("✅ capture raw response:", capRes.data);

              const capData = getData(capRes);
              console.log("✅ extracted capData:", capData);

              // 🟦 Extract captureId from multiple possible response formats
              const captureId =
                capData?.captureId ||
                capData?.capture?.id ||
                capData?.data?.captureId ||
                capRes?.data?.captureId ||
                capRes?.data?.capture?.id ||
                capRes?.data?.data?.captureId ||
                capRes?.data?.capture?.purchase_units?.[0]?.payments?.captures?.[0]?.id ||
                data.orderID;

              console.log("✅ resolved captureId =", captureId);

              if (!captureId) {
                console.error("❌ Missing captureId; full capture response:", capRes.data);
                throw new Error("Missing captureId from server response");
              }

              // 🟩 Finalize order in backend (step 4 - save to DB)
              console.log("🔄 Finalizing order in database...");
              const finalizeRes = await api.post("/payments/paypal/orders/finalize", {
                street: formData.street,
                city: formData.city,
                country: formData.country.toUpperCase(),
                postal_code: formData.postal_code,
                phone_number: formData.phone_number,
                payment_provider: "paypal",
                payment_reference: captureId,
              });

              console.log("✅ finalize raw response:", finalizeRes.data);
              const finData = getData(finalizeRes);
              
              // 🟦 Notify parent and redirect after success
              setErrorDetails(null);
              onSuccess?.(finData);
              setTimeout(() => navigate('/'), 2000); // redirect after 2s
            } catch (err) {
              console.error("❌ onApprove error:", err.response?.data || err.message);
              const errorMsg = err.response?.data?.message || err.message || "Payment processing failed";
              setErrorDetails(errorMsg);
              onError?.(errorMsg);
            } finally {
              setBusy(false);
            }
          }}

          // 🟩 Triggered if user cancels payment popup
          onCancel={(data) => {
            console.log("⚠️ Payment cancelled by user:", data);
            const msg = "Payment cancelled by user.";
            setErrorDetails(msg);
            onError?.(msg);
          }}

          // 🟩 Catch PayPal SDK-level errors
          onError={(err) => {
            console.error("❌ PayPal SDK error:", err);
            const errorMsg = typeof err === 'string' ? err : (err.message || err.toString());
            setErrorDetails(errorMsg);
            onError?.(errorMsg);
          }}
        />

        {/* 🟩 Show loading indicator when processing */}
        {busy && (
          <div className="mt-2 text-center text-sm text-gray-600">
            Processing payment...
          </div>
        )}
      </div>
    </PayPalScriptProvider>
  );
};

export default Paypal;
