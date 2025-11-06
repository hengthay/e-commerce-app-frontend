import { useState } from 'react';
import axios from 'axios';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const Paypal = ({ formData, onSuccess, onError }) => {
  const token = localStorage.getItem('token');
  const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:3000';

  const api = axios.create({
    baseURL: apiBase,
    headers: token
      ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
      : { 'Content-Type': 'application/json' },
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
  
  return (
    <PayPalScriptProvider
      options={{
        'client-id': import.meta.env.VITE_PP_SANDBOX_CLIENT_ID,
        currency: 'USD',
        intent: 'capture',
      }}
    >
      <div>
        {!token && (
          <div className="mb-2 text-sm text-red-600">Please log in before paying.</div>
        )}
        {!ready && (
          <div className="mb-2 text-sm text-red-600">
            Fill shipping address to enable PayPal
          </div>
        )}

        <PayPalButtons
          disabled={!ready || !token || busy}
          style={{ layout: 'vertical' }}
          onClick={(_, actions) => {
            // Extra client-side guard before opening the popup
            if (!token) {
              onError?.('You must be logged in to pay.');
              return actions.reject();
            }
            if (!ready) {
              onError?.('Please fill the shipping address.');
              return actions.reject();
            }
            return actions.resolve();
          }}
          
          createOrder={async () => {
            try {
              setBusy(true);
              const res = await api.post('/payments/paypal/create-order', {});
              const data = getData(res);
              console.log(data);
              if (!data?.id) throw new Error('No PayPal order id returned');
              return data.id;
            } catch (err) {
              console.error('create-order failed', err);
              onError?.('Failed to start payment.');
              throw err; // let the SDK know it failed
            } finally {
              setBusy(false);
            }
          }}
          onApprove={async (data) => {
            try {
              setBusy(true);
              // capture on server
              const capRes = await api.post(
                `/payments/paypal/capture-order/${data.orderID}`,
                {}
              );
              const capData = getData(capRes);
              const captureId =
                capData?.captureId || capRes?.data?.captureId || data.orderID;

              if (!captureId) {
                throw new Error('Missing captureId from server response');
              }

              // finalize DB order
              const finalizeRes = await api.post('/orders/finalize', {
                street: formData.street,
                city: formData.city,
                country: formData.country, // keep ISO-2 (e.g., "US","KH") if you later send to PayPal
                postal_code: formData.postal_code,
                phone_number: formData.phone_number,
                payment_provider: 'paypal',
                payment_reference: captureId,
              });

              const finalizeData = getData(finalizeRes);
              onSuccess?.(finalizeData);
            } catch (err) {
              console.error('onApprove error', err);
              onError?.('Payment succeeded but finalizing order failed.');
            } finally {
              setBusy(false);
            }
          }}
          onCancel={() => onError?.('Payment cancelled by user.')}
          onError={(err) => {
            console.error('PayPal SDK error', err);
            onError?.('PayPal SDK error.');
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
};

export default Paypal;
