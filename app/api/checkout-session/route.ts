import { NextRequest, NextResponse } from "next/server";
import { getStripeServer } from "@/lib/stripe-server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json(
        { error: "Missing session_id parameter." },
        { status: 400 }
      );
    }

    const stripe = getStripeServer();
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "payment_intent"],
    });

    if (!session) {
      return NextResponse.json(
        { error: "Stripe checkout session not found." },
        { status: 404 }
      );
    }

    const paymentIntentId =
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : session.payment_intent?.id || session.id;

    return NextResponse.json({
      success: true,
      id: session.id,
      paymentIntentId,
      status: session.status,
      paymentStatus: session.payment_status,
      amountTotal: (session.amount_total || 0) / 100,
      currency: (session.currency || "gbp").toUpperCase(),
      customerEmail:
        session.customer_details?.email ||
        session.customer_email ||
        session.metadata?.customer_email ||
        "",
      customerName:
        session.customer_details?.name ||
        session.metadata?.customer_name ||
        "Valued Customer",
      itemsCount: session.line_items?.data?.length || 0,
    });
  } catch (error: any) {
    console.error("Error retrieving Stripe Checkout Session:", error?.message || error);
    return NextResponse.json(
      { error: error?.message || "Failed to retrieve payment details." },
      { status: 500 }
    );
  }
}
