import { useState } from "react";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Paypal = ({ formData, onSuccess, onError }) => {
  const token = localStorage.getItem("token");
  const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:3000";
  // console.log(token)
  // console.log("PayPal client ID:", import.meta.env.VITE_PP_SANDBOX_CLIENT_ID);

  const api = axios.create({
    baseURL: apiBase,
    headers: token
      ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
      : { "Content-Type": "application/json" },
  });

  const [busy, setBusy] = useState(false);

  // validate shipping fields before enabling PayPal
  const ready =
    !!formData?.street &&
    !!formData?.city &&
    !!formData?.country &&
    !!formData?.postal_code &&
    !!formData?.phone_number;

  // small helper to safely read your handleResponse wrapper
  const getData = (res) => res?.data?.data ?? res?.data ?? {};

  const clientId = import.meta.env.VITE_PP_SANDBOX_CLIENT_ID || '';

  // If PayPal client id is not configured, show a helpful message instead of letting the SDK fail
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
            // Extra client-side guard before opening the popup
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
              // MODIFIED LINE: Pass the formData in the request body
              const res = await api.post("/payments/paypal/create-order", {
                shipping_address: formData,
              });
              const data = getData(res);
              console.log("extracted create-order data", data);

              if (!data?.id) throw new Error("No PayPal order id returned");
              return data.id;
            } catch (err) {
              console.error("create-order failed", err);
              onError?.("Failed to start payment.");
              throw err; // let the SDK know it failed
            } finally {
              setBusy(false);
            }
          }}
          onApprove={async (data, actions) => {
            try {
              setBusy(true);
              console.log("onApprove data:", data);

              // Optionally attempt client-side capture for debugging:
              const clientCapture = await actions.order.capture();
              console.log('client-side capture result (debug):', clientCapture);

              // Server-side capture (your preferred approach)
              const capRes = await api.post(
                `/payments/paypal/capture-order/${data.orderID}`,
                {}
              );
              console.log("capture raw response (axios):", capRes.data);

              // Use your getData helper to normalize
              const capData = getData(capRes);
              console.log("extracted capData:", capData);

              // Robust captureId extraction (try many likely paths)
              const captureId =
                capData?.captureId ||
                capData?.data?.captureId ||
                capRes?.data?.captureId ||
                capRes?.data?.data?.captureId ||
                // fallback: sometimes server returns the order id instead:
                data.orderID;

              console.log("resolved captureId =", captureId);

              if (!captureId) {
                console.error(
                  "Missing captureId; full capture response:",
                  capRes.data
                );
                throw new Error("Missing captureId from server response");
              }

              // Finalize the DB order on server using the actual captureId
              const finalizeRes = await api.post("/orders/finalize", {
                street: formData.street,
                city: formData.city,
                country: formData.country,
                postal_code: formData.postal_code,
                phone_number: formData.phone_number,
                payment_provider: "paypal",
                payment_reference: captureId,
              });
              console.log("finalize raw response:", finalizeRes.data);
              const finData = getData(finalizeRes);
              onSuccess?.(finData);
            } catch (err) {
              console.error("onApprove error", err);
              onError?.("Payment succeeded but finalizing order failed.");
            } finally {
              setBusy(false);
            }
          }}
          onCancel={() => onError?.("Payment cancelled by user.")}
          onError={(err) => {
            console.error("PayPal SDK error", err);
            onError?.("PayPal SDK error.");
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
};

export default Paypal;

