import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe (uses dummy key if not provided for showcase purposes)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_dummy_key", {
  apiVersion: "2025-02-24.acacia" as any, // latest stable or type overridden
});

export async function POST(req: Request) {
  try {
    const { items, customerEmail } = await req.json();

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "GarageGo Premium Repair Service Deposit",
              description: "Initial booking and diagnostic deposit. Balances will be invoiced upon completion.",
            },
            unit_amount: 50000, // $500.00 deposit
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/track?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/quote`,
      customer_email: customerEmail,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
