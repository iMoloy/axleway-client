"use client";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { apiFetch } from "@/lib/api";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_51MockKeyAxleWay"
);

function CheckoutForm({ amount, onSuccess, onCancel }) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setErrorMessage("");

    try {
      // 1. Fetch Payment Intent clientSecret from backend
      const res = await apiFetch("/payments/create-payment-intent", {
        method: "POST",
        body: JSON.stringify({ amount }),
      });

      if (!res?.clientSecret) {
        throw new Error("Could not initialize Stripe payment intent");
      }

      // If mock secret (dev fallback without real API key), simulate success
      if (res.clientSecret.startsWith("mock_secret_")) {
        toast.info("Simulated Stripe payment checkout success!");
        onSuccess({ paymentId: `pay_${Date.now()}` });
        return;
      }

      // 2. Confirm card payment with Stripe
      const cardElement = elements.getElement(CardElement);
      const result = await stripe.confirmCardPayment(res.clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (result.error) {
        setErrorMessage(result.error.message);
        toast.error(result.error.message);
      } else if (result.paymentIntent?.status === "succeeded") {
        toast.success("Stripe Payment & Deposit Hold Successful!");
        onSuccess({ paymentId: result.paymentIntent.id });
      }
    } catch (err) {
      setErrorMessage(err.message || "Payment failed");
      toast.error(err.message || "Payment failed");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="rounded-lg border border-[var(--line)] bg-[var(--card)] p-4 shadow-sm">
        <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-3">
          Card Details & Security Deposit Hold
        </label>
        <div className="rounded-md border border-[var(--line)] bg-white p-3.5 text-slate-800">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "15px",
                  color: "#1e293b",
                  "::placeholder": {
                    color: "#94a3b8",
                  },
                },
                invalid: {
                  color: "#ef4444",
                },
              },
            }}
          />
        </div>
      </div>

      {errorMessage && (
        <div className="rounded-md border border-red-500/30 bg-red-500/10 p-3 text-xs font-semibold text-red-500">
          {errorMessage}
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={processing}
          className="w-1/3 rounded-md border border-[var(--line)] py-3 text-xs font-bold hover:bg-[var(--panel-soft)]"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || processing}
          className="w-2/3 rounded-md bg-emerald-600 py-3 text-center text-xs font-bold text-white transition hover:bg-emerald-700 active:scale-95 disabled:opacity-60"
        >
          {processing ? "Processing Stripe..." : `Pay $${amount}.00 & Confirm`}
        </button>
      </div>
    </form>
  );
}

export function StripeCheckoutModal({ isOpen, amount, carName, onSuccess, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl border border-[var(--line)] bg-[var(--panel)] p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between border-b border-[var(--line)] pb-4 mb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-500">
              💳 Secure Stripe Checkout
            </span>
            <h3 className="text-lg font-black text-[var(--foreground)] mt-1">
              {carName}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-lg font-bold text-[var(--muted)] hover:bg-[var(--panel-soft)]"
          >
            ✕
          </button>
        </div>

        <div className="mb-5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3.5 text-xs text-emerald-600 dark:text-emerald-400">
          <div className="flex justify-between font-bold text-sm">
            <span>Rental Total + Hold:</span>
            <span>${amount}.00</span>
          </div>
          <p className="mt-1 text-[11px] text-[var(--muted)]">
            Protected by Stripe 256-bit encryption. Includes refundable deposit.
          </p>
        </div>

        <Elements stripe={stripePromise}>
          <CheckoutForm
            amount={amount}
            onSuccess={onSuccess}
            onCancel={onClose}
          />
        </Elements>
      </div>
    </div>
  );
}
