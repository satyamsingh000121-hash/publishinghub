import { OrderRepository } from "@/backend/repositories/order.repository";
import { ProductRepository } from "@/backend/repositories/product.repository";
import { CartDTO, OrderDTO } from "@/types/order";

export class OrderService {
  // Cart
  static async getCart(userId?: string, sessionId?: string): Promise<CartDTO> {
    const cart = await OrderRepository.findOrCreateCart(userId, sessionId);
    const items = (cart.items || []).map((item) => ({
      id: item.id,
      productId: item.productId,
      title: item.product?.title || "Book",
      price: item.product?.price || `£${item.price.toFixed(2)}`,
      numericPrice: item.price,
      image: item.product?.image || "/images/shop1.jpg",
      quantity: item.quantity,
    }));

    const totalAmount = items.reduce((acc, item) => acc + item.numericPrice * item.quantity, 0);
    const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

    return {
      id: cart.id,
      userId: cart.userId,
      items,
      totalAmount,
      totalQuantity,
    };
  }

  static async addToCart(data: {
    userId?: string;
    sessionId?: string;
    productId: string;
    quantity: number;
  }): Promise<CartDTO> {
    const cart = await OrderRepository.findOrCreateCart(data.userId, data.sessionId);
    const product = await ProductRepository.findById(data.productId);
    if (!product) {
      throw new Error("Product not found");
    }

    await OrderRepository.addItemToCart(cart.id, product.id, data.quantity, product.numericPrice);
    return this.getCart(data.userId, data.sessionId);
  }

  static async updateCartItem(data: {
    userId?: string;
    sessionId?: string;
    productId: string;
    quantity: number;
  }): Promise<CartDTO> {
    const cart = await OrderRepository.findOrCreateCart(data.userId, data.sessionId);
    await OrderRepository.updateCartItem(cart.id, data.productId, data.quantity);
    return this.getCart(data.userId, data.sessionId);
  }

  static async removeCartItem(data: {
    userId?: string;
    sessionId?: string;
    productId: string;
  }): Promise<CartDTO> {
    const cart = await OrderRepository.findOrCreateCart(data.userId, data.sessionId);
    await OrderRepository.removeCartItem(cart.id, data.productId);
    return this.getCart(data.userId, data.sessionId);
  }

  static async clearCart(userId?: string, sessionId?: string): Promise<CartDTO> {
    const cart = await OrderRepository.findOrCreateCart(userId, sessionId);
    await OrderRepository.clearCart(cart.id);
    return this.getCart(userId, sessionId);
  }

  // Orders
  static async createOrder(data: {
    userId?: string;
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    shippingAddress: string;
    paymentMethod?: string;
    items: Array<{ productId: string; quantity: number }>;
  }) {
    // 1. Resolve product details and pricing
    const resolvedItems = [];
    let totalAmount = 0;

    for (const item of data.items) {
      const product = await ProductRepository.findById(item.productId);
      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found.`);
      }
      const itemTotal = product.numericPrice * item.quantity;
      totalAmount += itemTotal;

      resolvedItems.push({
        productId: product.id,
        productTitle: product.title,
        productImage: product.image,
        price: product.numericPrice,
        quantity: item.quantity,
      });
    }

    // Generate unique order number
    const orderNumber = `ORD-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;

    const order = await OrderRepository.createOrder({
      userId: data.userId,
      orderNumber,
      totalAmount,
      shippingAddress: data.shippingAddress,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      paymentMethod: data.paymentMethod,
      items: resolvedItems,
    });

    return order;
  }

  static async getOrderById(id: string) {
    return OrderRepository.findOrderById(id);
  }

  static async getUserOrders(userId: string) {
    return OrderRepository.findOrdersByUserId(userId);
  }

  static async getAllOrders(params?: { page?: number; limit?: number; status?: string }) {
    return OrderRepository.findAllOrders(params);
  }

  // Events & Offers
  static async getEvents() {
    return OrderRepository.findAllEvents();
  }

  static async getOffers() {
    return OrderRepository.findAllOffers();
  }

  // Contact & Newsletter
  static async submitContactMessage(data: { name: string; email: string; subject?: string; message: string }) {
    return OrderRepository.createContactMessage(data);
  }

  static async subscribeNewsletter(email: string) {
    return OrderRepository.createNewsletterSubscriber(email);
  }
}
