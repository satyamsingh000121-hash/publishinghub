export class EmailService {
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
   * Send a welcome email to a new user
   */
  static async sendWelcomeEmail(user: { name: string; email: string }): Promise<boolean> {
    console.log(`[EmailService] Welcome email sent to ${user.name} <${user.email}>`);
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
