import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null> | null = null;
let lastUsedKey: string | null = null;

export function getStripePromise(): Promise<Stripe | null> {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (!publishableKey || publishableKey.includes("REPLACE_WITH_MY_TEST_PUBLISHABLE_KEY")) {
    return Promise.resolve(null);
  }

  if (!stripePromise || lastUsedKey !== publishableKey) {
    lastUsedKey = publishableKey;
    stripePromise = loadStripe(publishableKey);
  }

  return stripePromise;
}

