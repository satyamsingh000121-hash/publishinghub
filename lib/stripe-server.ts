import Stripe from "stripe";

let stripeServerInstance: Stripe | null = null;

export function getStripeServer(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey || secretKey.includes("REPLACE_WITH_MY_TEST_SECRET_KEY")) {
    throw new Error(
      "STRIPE_SECRET_KEY is not configured or still contains placeholder. Please set your actual Stripe test key in .env.local."
    );
  }

  if (!stripeServerInstance) {
    stripeServerInstance = new Stripe(secretKey, {
      typescript: true,
    });
  }

  return stripeServerInstance;
}
