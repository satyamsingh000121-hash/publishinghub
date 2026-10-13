import { NextRequest } from "next/server";

/**
 * Resolves the absolute base URL of the application.
 * Priority:
 * 1. NEXT_PUBLIC_APP_URL / APP_URL (explicit configuration)
 * 2. VERCEL_URL (automatic on Vercel deployments)
 * 3. Incoming Request headers (x-forwarded-host / host)
 * 4. http://localhost:3000 fallback
 */
export function getAppBaseUrl(req?: Request | NextRequest): string {
  if (process.env.NEXT_PUBLIC_APP_URL && process.env.NEXT_PUBLIC_APP_URL.trim() !== "") {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
  }

  if (process.env.APP_URL && process.env.APP_URL.trim() !== "") {
    return process.env.APP_URL.replace(/\/$/, "");
  }

  if (process.env.VERCEL_URL && process.env.VERCEL_URL.trim() !== "") {
    const vercelHost = process.env.VERCEL_URL.replace(/\/$/, "");
    return vercelHost.startsWith("http") ? vercelHost : `https://${vercelHost}`;
  }

  if (req) {
    const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
    if (host) {
      const proto =
        req.headers.get("x-forwarded-proto") ||
        (host.includes("localhost") || host.includes("127.0.0.1") ? "http" : "https");
      return `${proto}://${host}`;
    }
  }

  return "http://localhost:3000";
}
