import { NextRequest, NextResponse } from "next/server";
import { getStripeServer } from "@/lib/stripe-server";
import { ALL_BOOKS_DATABASE, slugify } from "@/lib/books";

export const dynamic = "force-dynamic";

interface RequestItem {
  id?: string;
  title: string;
  price?: string | number;
  numericPrice?: number;
  quantity: number;
  slug?: string;
}

interface BillingDetails {
  email?: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  country?: string;
  street?: string;
  apartment?: string;
  city?: string;
  state?: string;
  postcode?: string;
  phone?: string;
  notes?: string;
}

function parseNumber(val: any): number {
  if (typeof val === "number") return isNaN(val) ? 0 : val;
  if (!val) return 0;
  const cleaned = String(val).replace(/[^0-9.]/g, "");
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, billingDetails } = body as {
      items?: RequestItem[];
      billingDetails?: BillingDetails;
    };

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty. Please add items to proceed." },
        { status: 400 }
      );
    }

    // Validate and calculate total amount server-side
    let calculatedTotal = 0;
    for (const item of items) {
      const quantity = Math.max(1, Math.floor(Number(item.quantity) || 1));

      // Attempt to look up trusted book from database
      const matchedBook = ALL_BOOKS_DATABASE.find(
        (b) =>
          (item.id && b.id === item.id) ||
          (item.slug && b.slug === item.slug) ||
          (item.title && slugify(b.title) === slugify(item.title))
      );

      let unitPrice = 0;
      if (matchedBook && matchedBook.numericPrice && matchedBook.numericPrice > 0) {
        unitPrice = matchedBook.numericPrice;
      } else if (item.numericPrice && item.numericPrice > 0) {
        unitPrice = item.numericPrice;
      } else {
        unitPrice = parseNumber(item.price);
      }

      if (unitPrice <= 0) {
        return NextResponse.json(
          { error: `Invalid price for item "${item.title || "Unknown"}"` },
          { status: 400 }
        );
      }

      calculatedTotal += unitPrice * quantity;
    }

    if (calculatedTotal <= 0) {
      return NextResponse.json(
        { error: "Total order amount must be greater than zero." },
        { status: 400 }
      );
    }

    // Convert to smallest currency unit (cents/pence/paise: e.g. 500 = 50000)
    const amountInSmallestUnit = Math.round(calculatedTotal * 100);

    // Minimum amount check (typically >= 50 subunits, e.g. ₹0.50 or £0.30)
    if (amountInSmallestUnit < 30) {
      return NextResponse.json(
        { error: "Order total is too small for processing." },
        { status: 400 }
      );
    }

    // Determine currency: default to gbp (matching £ book pricing) or configured STRIPE_CURRENCY
    const currency = (process.env.STRIPE_CURRENCY || "gbp").toLowerCase();

    // Initialize Stripe server instance
    let stripe;
    try {
      stripe = getStripeServer();
    } catch (err: any) {
      return NextResponse.json(
        {
          error:
            "Stripe payment gateway is not configured yet. Please configure your Stripe TEST keys in .env.local.",
          details: err?.message || "Missing STRIPE_SECRET_KEY",
        },
        { status: 503 }
      );
    }

    const customerName = `${billingDetails?.firstName || ""} ${billingDetails?.lastName || ""}`.trim();
    const itemsSummary = items
      .slice(0, 5)
      .map((i) => `${i.title} × ${i.quantity}`)
      .join(", ");

    // Create the PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInSmallestUnit,
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      receipt_email: billingDetails?.email || undefined,
      description: `Publishing Hub Order - ${items.length} item(s)`,
      metadata: {
        customer_name: customerName || "Customer",
        customer_email: billingDetails?.email || "",
        customer_phone: billingDetails?.phone || "",
        customer_country: billingDetails?.country || "",
        customer_city: billingDetails?.city || "",
        customer_postcode: billingDetails?.postcode || "",
        items_count: String(items.length),
        currency: currency.toUpperCase(),
        items_summary: itemsSummary.length > 400 ? itemsSummary.slice(0, 397) + "..." : itemsSummary,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: amountInSmallestUnit,
      currency,
    });
  } catch (error: any) {
    console.error("Error creating Stripe PaymentIntent:", error?.message || error);
    return NextResponse.json(
      {
        error: error?.message || "An error occurred while creating the payment session. Please try again.",
      },
      { status: 500 }
    );
  }
}
