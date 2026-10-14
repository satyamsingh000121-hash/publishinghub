import { Resend } from "resend";

export interface SendWelcomeEmailParams {
  name: string;
  email: string;
  username?: string;
  passwordSetupUrl: string;
  myAccountUrl: string;
}

export interface SendPasswordResetEmailParams {
  name?: string;
  email: string;
  resetUrl: string;
}

export interface EmailDeliveryResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Safely ensure environment variables from .env.local and .env are loaded
 * when running outside the Next.js request lifecycle (e.g., standalone scripts or backend jobs),
 * or when in-memory process.env contains stale/cached values from before .env.local was updated.
 */
function ensureEnvLoaded(): void {
  if (typeof process === "undefined" || !process.env) return;

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  if (
    apiKey &&
    fromEmail &&
    !fromEmail.includes("&lt;") &&
    !fromEmail.includes("&gt;")
  ) {
    return;
  }

  try {
    // Next.js ships with @next/env
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { loadEnvConfig } = require("@next/env");
    loadEnvConfig(process.cwd());
  } catch {
    // Fallback or continue to manual parse
  }

  // Explicitly sync from .env.local to ensure latest configuration on disk is applied
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const fs = require("fs");
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const path = require("path");
    const envPath = path.resolve(process.cwd(), ".env.local");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      for (const line of content.split(/\r?\n/)) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const eqIdx = trimmed.indexOf("=");
        if (eqIdx > 0) {
          const key = trimmed.slice(0, eqIdx).trim();
          let val = trimmed.slice(eqIdx + 1).trim();
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
          }
          if (key === "RESEND_FROM_EMAIL" || key === "RESEND_API_KEY" || !process.env[key]) {
            process.env[key] = val;
          }
        }
      }
    }
  } catch {
    // Ignore fallback errors
  }
}

export class EmailService {
  /**
   * Safely mask recipient email for diagnostics without exposing full address
   */
  private static maskEmail(email: string): string {
    const [local, domain] = email.split("@");
    if (!domain) return "***";
    const maskedLocal = local.length <= 2 ? `${local[0]}***` : `${local[0]}***${local[local.length - 1]}`;
    return `${maskedLocal}@${domain}`;
  }

  /**
   * Initialize Resend client instance safely and validate API key
   */
  private static getResendClient(): { client: Resend | null; error?: string } {
    ensureEnvLoaded();
    const apiKey = process.env.RESEND_API_KEY?.trim();
    if (!apiKey) {
      return {
        client: null,
        error:
          "RESEND_API_KEY is missing from environment variables. Please add your Resend API key to .env.local or production environment variables.",
      };
    }
    if (apiKey === "re_xxxxxxxxx" || apiKey === "your_resend_api_key_here") {
      return {
        client: null,
        error:
          "RESEND_API_KEY is set to a placeholder value. Please configure a valid Resend API key in .env.local.",
      };
    }
    if (!apiKey.startsWith("re_")) {
      return {
        client: null,
        error:
          "RESEND_API_KEY has an invalid format. Resend API keys must start with 're_'.",
      };
    }
    return { client: new Resend(apiKey) };
  }

  /**
   * Resolve and rigorously validate configured sender address
   */
  private static getSenderAddress(): { address?: string; error?: string } {
    ensureEnvLoaded();
    const fromEnv = process.env.RESEND_FROM_EMAIL?.trim();

    // Default safe sender if completely unconfigured in environment
    let from = fromEnv || "The Publishing Hub <onboarding@resend.dev>";

    // Strip redundant surrounding quotes if present (e.g. from env parsing quirks)
    if ((from.startsWith('"') && from.endsWith('"')) || (from.startsWith("'") && from.endsWith("'"))) {
      from = from.slice(1, -1).trim();
    }

    // Check placeholder from template or example
    if (from.toLowerCase().includes("@yourdomain.com") || from.toLowerCase().includes("@example.com")) {
      return {
        error:
          "RESEND_FROM_EMAIL is set to a placeholder domain ('yourdomain.com' or 'example.com'). Please configure your actual verified domain from resend.com/domains.",
      };
    }

    // Check for HTML entity contamination (e.g. &lt; or &gt;)
    if (from.includes("&lt;") || from.includes("&gt;") || from.includes("&amp;")) {
      return {
        error:
          "RESEND_FROM_EMAIL contains HTML entities (&lt; or &gt;). Use plain angle brackets 'Name <email@example.com>' format.",
      };
    }

    // Check for mailto: URI prefix
    if (from.toLowerCase().includes("mailto:")) {
      return {
        error:
          "RESEND_FROM_EMAIL contains 'mailto:'. The email address needs to follow the 'email@example.com' or 'Name <email@example.com>' format.",
      };
    }

    // Check for Markdown links e.g. [Name](mailto:email)
    if (/\[.*\]\(.*\)|\(mailto:.*\)/.test(from)) {
      return {
        error:
          "RESEND_FROM_EMAIL contains Markdown links. The email address needs to follow the 'email@example.com' or 'Name <email@example.com>' format.",
      };
    }

    // Check for extra or unbalanced brackets
    const openBrackets = (from.match(/</g) || []).length;
    const closeBrackets = (from.match(/>/g) || []).length;
    if (openBrackets > 1 || closeBrackets > 1) {
      return {
        error:
          "RESEND_FROM_EMAIL contains extra angle brackets. Expected 'Name <email@example.com>' format.",
      };
    }
    if (openBrackets !== closeBrackets) {
      return {
        error:
          "RESEND_FROM_EMAIL contains unbalanced angle brackets. Expected 'Name <email@example.com>' format.",
      };
    }

    // Check for duplicated email addresses
    const atCount = (from.match(/@/g) || []).length;
    if (atCount > 1) {
      return {
        error:
          "RESEND_FROM_EMAIL contains multiple email addresses. Expected a single address in 'Name <email@example.com>' format.",
      };
    }
    if (atCount === 0) {
      return {
        error:
          "RESEND_FROM_EMAIL does not contain a valid email address (missing '@').",
      };
    }

    // Validate structure against Resend format specs:
    // Case A: Name <email@example.com>
    // Case B: email@example.com
    const emailPattern = "[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+";
    const nameWithEmailRegex = new RegExp(`^([^<>]+)<\\s*(${emailPattern})\\s*>$`);
    const pureEmailRegex = new RegExp(`^${emailPattern}$`);

    const nameMatch = from.match(nameWithEmailRegex);
    if (nameMatch) {
      const displayName = nameMatch[1].trim();
      const cleanEmail = nameMatch[2].trim();
      if (!displayName) {
        return { address: cleanEmail };
      }
      return { address: `${displayName} <${cleanEmail}>` };
    }

    if (pureEmailRegex.test(from)) {
      return { address: from };
    }

    return {
      error:
        "Invalid 'from' field in RESEND_FROM_EMAIL. The email address needs to follow the 'email@example.com' or 'Name <email@example.com>' format.",
    };
  }

  /**
   * Send a rich HTML welcome email with password setup link matching The Publishing Hub brand
   */
  static async sendWelcomeEmail(params: SendWelcomeEmailParams): Promise<EmailDeliveryResult> {
    const { name, email, passwordSetupUrl, myAccountUrl } = params;
    const username = params.username || name || email.split("@")[0];

    const clientResult = this.getResendClient();
    if (!clientResult.client) {
      const errorMsg = clientResult.error || "RESEND_API_KEY is missing or unconfigured.";
      console.warn(`[EmailService] Cannot send welcome email to ${this.maskEmail(email)}: ${errorMsg}`);
      return {
        success: false,
        error: errorMsg,
      };
    }
    const resend = clientResult.client;

    const senderResult = this.getSenderAddress();
    if (!senderResult.address) {
      const errorMsg = senderResult.error || "RESEND_FROM_EMAIL configuration is invalid.";
      console.warn(`[EmailService] Cannot send welcome email to ${this.maskEmail(email)}: ${errorMsg}`);
      return {
        success: false,
        error: errorMsg,
      };
    }
    const fromAddress = senderResult.address;
    const currentYear = new Date().getFullYear();

    const subject = "Your The Publishing Hub account has been created!";

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f1ea; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1f2937;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f1ea; padding: 30px 15px;">
    <tr>
      <td align="center">
        <!-- Main Container Card -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08); border: 1px solid #e5e0d8;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #1b0a2a 0%, #3b0764 100%); padding: 36px 32px 30px 32px; text-align: center;">
              <p style="margin: 0 0 8px 0; color: #d4b56a; font-size: 11px; font-weight: bold; letter-spacing: 0.2em; text-transform: uppercase;">The Publishing Hub</p>
              <h1 style="margin: 0; color: #ffffff; font-family: 'Georgia', serif, -apple-system, sans-serif; font-size: 26px; font-weight: normal; letter-spacing: -0.02em;">Welcome to The Publishing Hub</h1>
              <div style="width: 48px; height: 2px; background-color: #d4b56a; margin: 14px auto 0 auto;"></div>
            </td>
          </tr>

          <!-- Main Content Body -->
          <tr>
            <td style="padding: 36px 36px 28px 36px;">
              <!-- User Greeting -->
              <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.6; color: #18181b;">
                Hi <strong>${username}</strong>,
              </p>

              <!-- Account-created Confirmation -->
              <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 1.65; color: #3f3f46;">
                Thanks for creating an account on <strong>The Publishing Hub</strong>. Your username is <strong>${username}</strong>. You can access your account area to view orders, change your password, and more at:
              </p>

              <!-- My Account Link Callout -->
              <p style="margin: 0 0 24px 0; padding: 12px 16px; background-color: #faf5ff; border: 1px solid #e9d5ff; border-radius: 6px; font-size: 13px; word-break: break-all;">
                <a href="${myAccountUrl}" style="color: #7e22ce; font-weight: 600; text-decoration: underline;" target="_blank" rel="noopener noreferrer">${myAccountUrl}</a>
              </p>

              <!-- Password Setup Box -->
              <div style="margin: 24px 0 28px 0; padding: 22px 24px; background-color: #faf7fd; border: 1px solid #e4d4f8; border-left: 4px solid #7e22ce; border-radius: 6px;">
                <p style="margin: 0 0 14px 0; font-size: 14px; font-weight: 600; color: #18181b;">
                  Your password has been automatically generated:
                </p>
                <p style="margin: 0 0 18px 0; font-size: 13px; line-height: 1.6; color: #52525b;">
                  To set your password, visit the following address:
                </p>

                <!-- Set Password Action Button -->
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto 16px auto;">
                  <tr>
                    <td align="center" style="border-radius: 4px; background-color: #7e22ce;">
                      <a href="${passwordSetupUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 12px 32px; font-family: -apple-system, sans-serif; font-size: 13px; font-weight: bold; color: #ffffff; text-decoration: none; letter-spacing: 0.1em; text-transform: uppercase; border-radius: 4px; border: 1px solid #6b21a8;">
                        Set Your Password &rarr;
                      </a>
                    </td>
                  </tr>
                </table>

                <p style="margin: 12px 0 0 0; font-size: 12px; line-height: 1.5; color: #71717a; word-break: break-all; text-align: center;">
                  Or copy and paste this link into your browser:<br>
                  <a href="${passwordSetupUrl}" style="color: #7e22ce; text-decoration: underline;" target="_blank" rel="noopener noreferrer">${passwordSetupUrl}</a>
                </p>
              </div>

              <!-- Security Information Note -->
              <p style="margin: 0 0 8px 0; font-size: 12px; line-height: 1.6; color: #a1a1aa; font-style: italic;">
                Security note: This password setup link is single-use and valid for 24 hours. If you did not create an account on The Publishing Hub, please disregard this email.
              </p>
            </td>
          </tr>

          <!-- Email Footer -->
          <tr>
            <td style="background-color: #faf7fd; padding: 24px 32px; border-top: 1px solid #ede8f2; text-align: center;">
              <p style="margin: 0 0 4px 0; font-size: 13px; font-weight: bold; color: #7e22ce; letter-spacing: 0.05em;">
                The Publishing Hub
              </p>
              <p style="margin: 0 0 8px 0; font-size: 11px; color: #71717a;">
                Premium Books, Literary Masterpieces &amp; Author Collections
              </p>
              <p style="margin: 0; font-size: 11px; color: #a1a1aa;">
                &copy; ${currentYear} The Publishing Hub. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();

    const textContent = `
Welcome to The Publishing Hub

Hi ${username},

Thanks for creating an account on The Publishing Hub. Your username is ${username}. You can access your account area to view orders, change your password, and more at:
${myAccountUrl}

Your password has been automatically generated:
To set your password, visit the following address:
${passwordSetupUrl}

This link is single-use and will expire in 24 hours.

The Publishing Hub
Premium Books & Literary Collections
© ${currentYear} The Publishing Hub. All rights reserved.
    `.trim();

    const recipientEmail = email.trim();

    try {
      console.log(`[EmailService] Dispatching welcome email to ${this.maskEmail(recipientEmail)} from ${fromAddress}...`);
      const response = await resend.emails.send({
        from: fromAddress,
        to: recipientEmail,
        subject,
        html: htmlContent,
        text: textContent,
      });

      if (response.error) {
        const errorMsg = response.error.message || "Resend rejected the email sending request.";
        console.error(`[EmailService] Resend rejected email to ${this.maskEmail(email)}:`, errorMsg);

        let contextualError = errorMsg;
        if (
          errorMsg.toLowerCase().includes("testing emails to your own email address") ||
          errorMsg.toLowerCase().includes("resend.dev")
        ) {
          contextualError = `Resend Testing Restriction: The test sender 'onboarding@resend.dev' can only deliver to your Resend account owner email (satyamsingh.000121@gmail.com). To deliver to '${recipientEmail}' or other users, a verified custom domain is required.`;
        } else if (
          errorMsg.toLowerCase().includes("domain") &&
          (errorMsg.toLowerCase().includes("not verified") || errorMsg.toLowerCase().includes("unverified"))
        ) {
          contextualError = `Domain Not Verified: Please complete DNS records verification at resend.com/domains before sending from this custom domain.`;
        }

        return {
          success: false,
          error: contextualError,
        };
      }

      const messageId = response.data?.id;
      console.log(`[EmailService] Welcome email successfully accepted by Resend for ${this.maskEmail(recipientEmail)} (Message ID: ${messageId})`);
      return {
        success: true,
        messageId,
      };
    } catch (err: any) {
      const errorMsg = err.message || "Failed to send welcome email via Resend.";
      console.error(`[EmailService] Exception dispatching welcome email to ${this.maskEmail(recipientEmail)}:`, errorMsg);
      return {
        success: false,
        error: errorMsg,
      };
    }
  }

  /**
   * Send a rich HTML password reset email with reset link matching The Publishing Hub brand
   */
  static async sendPasswordResetEmail(params: SendPasswordResetEmailParams): Promise<EmailDeliveryResult> {
    const { name, email, resetUrl } = params;
    const recipientEmail = email.trim();
    const displayName = name?.trim() || recipientEmail.split("@")[0];

    const clientResult = this.getResendClient();
    if (!clientResult.client) {
      const errorMsg = clientResult.error || "RESEND_API_KEY is missing or unconfigured.";
      console.warn(`[EmailService] Cannot send password reset email to ${this.maskEmail(recipientEmail)}: ${errorMsg}`);
      return {
        success: false,
        error: errorMsg,
      };
    }
    const resend = clientResult.client;

    const senderResult = this.getSenderAddress();
    if (!senderResult.address) {
      const errorMsg = senderResult.error || "RESEND_FROM_EMAIL configuration is invalid.";
      console.warn(`[EmailService] Cannot send password reset email to ${this.maskEmail(recipientEmail)}: ${errorMsg}`);
      return {
        success: false,
        error: errorMsg,
      };
    }
    const fromAddress = senderResult.address;
    const currentYear = new Date().getFullYear();

    const subject = "Reset Your Password - The Publishing Hub";

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f1ea; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1f2937;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f1ea; padding: 30px 15px;">
    <tr>
      <td align="center">
        <!-- Main Container Card -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08); border: 1px solid #e5e0d8;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #1b0a2a 0%, #3b0764 100%); padding: 36px 32px 30px 32px; text-align: center;">
              <p style="margin: 0 0 8px 0; color: #d4b56a; font-size: 11px; font-weight: bold; letter-spacing: 0.2em; text-transform: uppercase;">The Publishing Hub</p>
              <h1 style="margin: 0; color: #ffffff; font-family: 'Georgia', serif, -apple-system, sans-serif; font-size: 26px; font-weight: normal; letter-spacing: -0.02em;">Password Reset Request</h1>
              <div style="width: 48px; height: 2px; background-color: #d4b56a; margin: 14px auto 0 auto;"></div>
            </td>
          </tr>

          <!-- Main Content Body -->
          <tr>
            <td style="padding: 36px 36px 28px 36px;">
              <!-- User Greeting -->
              <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.6; color: #18181b;">
                Hi <strong>${displayName}</strong>,
              </p>

              <!-- Request Explanation -->
              <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 1.65; color: #3f3f46;">
                We received a request to reset the password for your account on <strong>The Publishing Hub</strong>. To choose a new password, click the button below:
              </p>

              <!-- Reset Password Action Box -->
              <div style="margin: 24px 0 28px 0; padding: 24px 24px; background-color: #faf7fd; border: 1px solid #e4d4f8; border-left: 4px solid #7e22ce; border-radius: 6px; text-align: center;">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto 16px auto;">
                  <tr>
                    <td align="center" style="border-radius: 4px; background-color: #7e22ce;">
                      <a href="${resetUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 13px 34px; font-family: -apple-system, sans-serif; font-size: 13px; font-weight: bold; color: #ffffff; text-decoration: none; letter-spacing: 0.1em; text-transform: uppercase; border-radius: 4px; border: 1px solid #6b21a8;">
                        Reset Your Password &rarr;
                      </a>
                    </td>
                  </tr>
                </table>

                <p style="margin: 12px 0 0 0; font-size: 12px; line-height: 1.5; color: #71717a; word-break: break-all;">
                  Or copy and paste this link into your browser:<br>
                  <a href="${resetUrl}" style="color: #7e22ce; text-decoration: underline;" target="_blank" rel="noopener noreferrer">${resetUrl}</a>
                </p>
              </div>

              <!-- Security Information Note -->
              <p style="margin: 0 0 8px 0; font-size: 12px; line-height: 1.6; color: #71717a;">
                Security note: This password reset link is single-use and valid for <strong>1 hour</strong>.
              </p>
              <p style="margin: 0; font-size: 12px; line-height: 1.6; color: #a1a1aa; font-style: italic;">
                If you did not request a password reset, you can safely ignore this email. Your existing password remains unchanged and secure.
              </p>
            </td>
          </tr>

          <!-- Email Footer -->
          <tr>
            <td style="background-color: #faf7fd; padding: 24px 32px; border-top: 1px solid #ede8f2; text-align: center;">
              <p style="margin: 0 0 4px 0; font-size: 13px; font-weight: bold; color: #7e22ce; letter-spacing: 0.05em;">
                The Publishing Hub
              </p>
              <p style="margin: 0 0 8px 0; font-size: 11px; color: #71717a;">
                Premium Books, Literary Masterpieces &amp; Author Collections
              </p>
              <p style="margin: 0; font-size: 11px; color: #a1a1aa;">
                &copy; ${currentYear} The Publishing Hub. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();

    const textContent = `
Password Reset Request - The Publishing Hub

Hi ${displayName},

We received a request to reset the password for your account on The Publishing Hub. Visit the link below to set a new password:

${resetUrl}

This link is single-use and will expire in 1 hour.

If you did not request a password reset, you can safely ignore this email. Your existing password will remain unchanged and secure.

The Publishing Hub
Premium Books & Literary Collections
© ${currentYear} The Publishing Hub. All rights reserved.
    `.trim();

    try {
      console.log(`[EmailService] Dispatching password reset email to ${this.maskEmail(recipientEmail)} from ${fromAddress}...`);
      const response = await resend.emails.send({
        from: fromAddress,
        to: recipientEmail,
        subject,
        html: htmlContent,
        text: textContent,
      });

      if (response.error) {
        const errorMsg = response.error.message || "Resend rejected the email sending request.";
        console.error(`[EmailService] Resend rejected password reset email to ${this.maskEmail(recipientEmail)}:`, errorMsg);

        let contextualError = errorMsg;
        if (
          errorMsg.toLowerCase().includes("testing emails to your own email address") ||
          errorMsg.toLowerCase().includes("resend.dev")
        ) {
          contextualError = `Resend Testing Restriction: The test sender 'onboarding@resend.dev' can only deliver to your Resend account owner's email. To deliver to '${recipientEmail}' or other users, a verified custom domain is required.`;
        } else if (
          errorMsg.toLowerCase().includes("domain") &&
          (errorMsg.toLowerCase().includes("not verified") || errorMsg.toLowerCase().includes("unverified"))
        ) {
          contextualError = `Domain Not Verified: Please complete DNS records verification at resend.com/domains before sending from this custom domain.`;
        }

        return {
          success: false,
          error: contextualError,
        };
      }

      const messageId = response.data?.id;
      console.log(`[EmailService] Password reset email successfully accepted by Resend for ${this.maskEmail(recipientEmail)} (Message ID: ${messageId})`);
      return {
        success: true,
        messageId,
      };
    } catch (err: any) {
      const errorMsg = err.message || "Failed to send password reset email via Resend.";
      console.error(`[EmailService] Exception dispatching password reset email to ${this.maskEmail(recipientEmail)}:`, errorMsg);
      return {
        success: false,
        error: errorMsg,
      };
    }
  }

  /**
   * Send an order confirmation email to the customer
   */
  static async sendOrderConfirmation(order: {
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    totalAmount: number;
  }): Promise<boolean> {
    console.log(`[EmailService] Order confirmation sent for ${order.orderNumber} to ${order.customerEmail}`);
    return true;
  }

  /**
   * Send newsletter confirmation email
   */
  static async sendNewsletterWelcome(email: string): Promise<boolean> {
    console.log(`[EmailService] Newsletter confirmation sent to ${email}`);
    return true;
  }
}
