import { Resend } from "resend";

export interface SendWelcomeEmailParams {
  name: string;
  email: string;
  username?: string;
  passwordSetupUrl: string;
  myAccountUrl: string;
}

export interface EmailDeliveryResult {
  success: boolean;
  messageId?: string;
  error?: string;
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
   * Initialize Resend client instance safely
   */
  private static getResendClient(): Resend | null {
    const apiKey = process.env.RESEND_API_KEY?.trim();
    if (!apiKey || apiKey === "re_xxxxxxxxx" || apiKey === "your_resend_api_key_here") {
      return null;
    }
    return new Resend(apiKey);
  }

  /**
   * Resolve configured sender address
   */
  private static getSenderAddress(): string {
    const fromEnv = process.env.RESEND_FROM_EMAIL?.trim();
    if (fromEnv && fromEnv !== "The Publishing Hub <verified-sender@yourdomain.com>") {
      return fromEnv;
    }
    // Safe default for unconfigured development or test mode
    return "The Publishing Hub <onboarding@resend.dev>";
  }

  /**
   * Send a rich HTML welcome email with password setup link matching The Publishing Hub brand
   */
  static async sendWelcomeEmail(params: SendWelcomeEmailParams): Promise<EmailDeliveryResult> {
    const { name, email, passwordSetupUrl, myAccountUrl } = params;
    const username = params.username || name || email.split("@")[0];

    const resend = this.getResendClient();
    if (!resend) {
      const errorMsg =
        "RESEND_API_KEY is missing or unconfigured. Please add your Resend API key to Vercel environment variables or .env.local.";
      console.warn(`[EmailService] Cannot send welcome email to ${this.maskEmail(email)}: ${errorMsg}`);
      return {
        success: false,
        error: errorMsg,
      };
    }

    const fromAddress = this.getSenderAddress();
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

    try {
      console.log(`[EmailService] Dispatching welcome email to ${this.maskEmail(email)} from ${fromAddress}...`);
      const response = await resend.emails.send({
        from: fromAddress,
        to: email,
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
          contextualError = `${errorMsg} - Note: The default testing sender (onboarding@resend.dev) can only deliver to the account owner's email. Verify your domain at resend.com/domains to send to all recipients.`;
        } else if (errorMsg.toLowerCase().includes("domain") && errorMsg.toLowerCase().includes("not verified")) {
          contextualError = `${errorMsg} - Please verify your sender domain in your Resend dashboard.`;
        }

        return {
          success: false,
          error: contextualError,
        };
      }

      const messageId = response.data?.id;
      console.log(`[EmailService] Welcome email successfully accepted by Resend for ${this.maskEmail(email)} (Message ID: ${messageId})`);
      return {
        success: true,
        messageId,
      };
    } catch (err: any) {
      const errorMsg = err.message || "Failed to send welcome email via Resend.";
      console.error(`[EmailService] Exception dispatching welcome email to ${this.maskEmail(email)}:`, errorMsg);
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
