import { NextRequest, NextResponse } from "next/server";
import { getStripeServer } from "@/lib/stripe-server";
import { ALL_BOOKS_DATABASE, slugify } from "@/lib/books";

export const dynamic = "force-dynamic";

interface CartItemInput {
  id?: string;
  title?: string;
  name?: string;
  price?: string | number;
  numericPrice?: number;
  quantity?: number;
  image?: string;
  slug?: string;
  author?: string;
}

interface CustomerInput {
  firstName?: string;
  lastName?: string;
  customerName?: string;
  email?: string;
  phone?: string;
  company?: string;
  country?: string;
  street?: string;
  apartment?: string;
  city?: string;
  state?: string;
  postcode?: string;
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
    const { cartItems, customer } = body as {
      cartItems?: CartItemInput[];
      customer?: CustomerInput;
    };

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return NextResponse.json(
        { error: "Your shopping cart is empty. Please add items to proceed." },
        { status: 400 }
      );
    }

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

    // Determine configured currency (default GBP for £ book pricing)
    const currency = (process.env.STRIPE_CURRENCY || "gbp").toLowerCase();

    // Determine base URL for success and cancel redirects
    const host =
      req.headers.get("x-forwarded-host") ||
      req.headers.get("host") ||
      "localhost:3000";
    const proto =
      req.headers.get("x-forwarded-proto") ||
      (host.includes("localhost") ? "http" : "https");
    const origin = `${proto}://${host}`;

    // Build line items dynamically from actual cart items
    const line_items = [];

    for (const item of cartItems) {
      const quantity = Math.max(1, Math.floor(Number(item.quantity) || 1));
      const itemTitle = item.title || item.name || "Publishing Hub Book";

      // Look up trusted price from books database if matched
      const matchedBook = ALL_BOOKS_DATABASE.find(
        (b) =>
          (item.id && b.id === item.id) ||
          (item.slug && b.slug === item.slug) ||
          slugify(b.title) === slugify(itemTitle)
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
          { error: `Invalid price for item "${itemTitle}".` },
          { status: 400 }
        );
      }

      const unitAmountInSmallestUnit = Math.round(unitPrice * 100);

      // Only pass public absolute HTTPS image URLs to Stripe, avoid local relative paths
      const imageUrl =
        item.image &&
        typeof item.image === "string" &&
        item.image.startsWith("https://") &&
        !item.image.includes("localhost")
          ? [item.image]
          : undefined;

      line_items.push({
        price_data: {
          currency,
          product_data: {
            name: itemTitle,
            description: item.author ? `By ${item.author}` : undefined,
            images: imageUrl,
          },
          unit_amount: unitAmountInSmallestUnit,
        },
        quantity,
      });
    }

    if (line_items.length === 0) {
      return NextResponse.json(
        { error: "No valid items found in order." },
        { status: 400 }
      );
    }

    const customerEmail = customer?.email?.trim();
    const customerFullName =
      customer?.customerName ||
      `${customer?.firstName || ""} ${customer?.lastName || ""}`.trim();

    // Create the Stripe Hosted Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      customer_email: customerEmail || undefined,
      billing_address_collection: "required",
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout?canceled=true`,
      metadata: {
        customer_name: customerFullName || "Customer",
        customer_email: customerEmail || "",
        customer_phone: customer?.phone || "",
        customer_country: customer?.country || "",
        customer_city: customer?.city || "",
        customer_street: customer?.street || "",
        customer_postcode: customer?.postcode || "",
        items_count: String(cartItems.length),
        currency: currency.toUpperCase(),
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe did not return a checkout URL. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      url: session.url,
      sessionId: session.id,
    });
  } catch (error: any) {
    console.error("Error creating Stripe Checkout Session:", error?.message || error);
    return NextResponse.json(
      {
        error:
          error?.message ||
          "An error occurred while creating the Stripe Checkout session. Please try again.",
      },
      { status: 500 }
    );
  }
}
