import { useState } from "react";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Paypal = ({ formData, onSuccess, onError }) => {
  const token = localStorage.getItem("token");
  const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:3000";

  const api = axios.create({
    baseURL: apiBase,
    headers: token
      ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
      : { "Content-Type": "application/json" },
  });

  const [busy, setBusy] = useState(false);

  // ✅ Validate shipping fields before enabling PayPal
  const ready =
    !!formData?.street &&
    !!formData?.city &&
    !!formData?.country &&
    !!formData?.postal_code &&
    !!formData?.phone_number;

  const getData = (res) => res?.data?.data ?? res?.data ?? {};

  const clientId = import.meta.env.VITE_PP_SANDBOX_CLIENT_ID || '';

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
      }}
    >
      <div>
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

        <PayPalButtons
          disabled={!ready || !token || busy}
          style={{ layout: "vertical" }}
          onClick={(_, actions) => {
            if (!token) {
              onError?.("You must be logged in to pay.");
              return actions.reject();
            }
            if (!ready) {
              onError?.("Please fill the shipping address.");
              return actions.reject();
            }
            return actions.resolve();
          }}
          createOrder={async () => {
            try {
              setBusy(true);
              console.log("🔄 Creating PayPal order with address:", formData);

              // ✅ Ensure country code is uppercase 2-letter ISO
              const shippingAddress = {
                ...formData,
                country: formData.country.toUpperCase(),
              };

              const res = await api.post("/payments/paypal/create-order", {
                shipping_address: shippingAddress,
              });

              const data = getData(res);
              console.log("✅ extracted create-order data:", data);

              if (!data?.id) {
                console.error("❌ No PayPal order id returned. Full response:", res.data);
                throw new Error("No PayPal order id returned");
              }

              return data.id;
            } catch (err) {
              console.error("❌ create-order failed:", err.response?.data || err.message);
              onError?.("Failed to start payment. " + (err.response?.data?.message || err.message));
              throw err;
            } finally {
              setBusy(false);
            }
          }}
          onApprove={async (data, actions) => {
            try {
              setBusy(true);
              console.log("✅ onApprove called with data:", data);
              
              // ✅ Try to get order details first
              try {
                const orderDetails = await actions.order.get();
                console.log("📦 Order details before capture:", orderDetails);
              } catch (err) {
                console.warn("⚠️ Could not fetch order details:", err);
              }

              // ✅ Server-side capture
              const capRes = await api.post(
                `/payments/paypal/capture-order/${data.orderID}`,
                {}
              );
              console.log("✅ capture raw response:", capRes.data);

              const capData = getData(capRes);
              console.log("✅ extracted capData:", capData);

              // ✅ Robust captureId extraction
              const captureId =
                capData?.captureId ||
                capData?.data?.captureId ||
                capRes?.data?.captureId ||
                capRes?.data?.data?.captureId ||
                data.orderID;

              console.log("✅ resolved captureId =", captureId);

              if (!captureId) {
                console.error("❌ Missing captureId; full capture response:", capRes.data);
                throw new Error("Missing captureId from server response");
              }

              // ✅ Finalize the order in database
              const finalizeRes = await api.post("/orders/finalize", {
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
              onSuccess?.(finData);
            } catch (err) {
              console.error("❌ onApprove error:", err.response?.data || err.message);
              onError?.("Payment succeeded but finalizing order failed. " + (err.response?.data?.message || err.message));
            } finally {
              setBusy(false);
            }
          }}
          onCancel={() => {
            console.log("⚠️ Payment cancelled by user");
            onError?.("Payment cancelled by user.");
          }}
          onError={(err) => {
            console.error("❌ PayPal SDK error:", err);
            onError?.("PayPal SDK error: " + err.toString());
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
};

export default Paypal;