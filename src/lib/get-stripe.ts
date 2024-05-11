import { loadStripe } from "@stripe/stripe-js";

let stripePromise: any;

export default async function getStripe() {
  if (!stripePromise)
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY!);

  return stripePromise;
}
