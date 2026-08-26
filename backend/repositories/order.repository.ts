import { prisma } from "@/lib/prisma";

export class OrderRepository {
  // Cart
  static async findOrCreateCart(userId?: string, sessionId?: string) {
    if (userId) {
      let cart = await prisma.cart.findFirst({
        where: { userId },
        include: { items: { include: { product: true } } },
      });
      if (!cart) {
        cart = await prisma.cart.create({
          data: { userId },
          include: { items: { include: { product: true } } },
        });
      }
      return cart;
    }

    if (sessionId) {
      let cart = await prisma.cart.findUnique({
        where: { sessionId },
        include: { items: { include: { product: true } } },
      });
      if (!cart) {
        cart = await prisma.cart.create({
          data: { sessionId },
          include: { items: { include: { product: true } } },
        });
      }
      return cart;
    }

    return prisma.cart.create({
      data: {},
      include: { items: { include: { product: true } } },
    });
  }

  static async addItemToCart(cartId: string, productId: string, quantity: number, price: number) {
    const existingItem = await prisma.cartItem.findFirst({
      where: { cartId, productId },
    });

    if (existingItem) {
      return prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    }

    return prisma.cartItem.create({
      data: {
        cartId,
        productId,
        quantity,
        price,
      },
    });
  }

  static async updateCartItem(cartId: string, productId: string, quantity: number) {
    const existingItem = await prisma.cartItem.findFirst({
      where: { cartId, productId },
    });

    if (!existingItem) return null;

    if (quantity <= 0) {
      await prisma.cartItem.delete({ where: { id: existingItem.id } });
      return null;
    }

    return prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity },
    });
  }

  static async removeCartItem(cartId: string, productId: string) {
    const existingItem = await prisma.cartItem.findFirst({
      where: { cartId, productId },
    });
    if (existingItem) {
      await prisma.cartItem.delete({ where: { id: existingItem.id } });
    }
  }

  static async clearCart(cartId: string) {
    await prisma.cartItem.deleteMany({
      where: { cartId },
    });
  }

  // Orders
  static async createOrder(data: {
    userId?: string;
    orderNumber: string;
    totalAmount: number;
    shippingAddress: string;
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    paymentMethod?: string;
    items: Array<{
      productId: string;
      productTitle: string;
      productImage: string;
      price: number;
      quantity: number;
    }>;
  }) {
    return prisma.order.create({
      data: {
        userId: data.userId,
        orderNumber: data.orderNumber,
        totalAmount: data.totalAmount,
        shippingAddress: data.shippingAddress,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        paymentMethod: data.paymentMethod || "CARD",
        status: "PENDING",
        paymentStatus: "PAID",
        items: {
          create: data.items.map((item) => ({
            productId: item.productId,
            productTitle: item.productTitle,
            productImage: item.productImage,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: true,
      },
    });
  }

  static async findOrderById(id: string) {
    return prisma.order.findUnique({
      where: { id },
      include: { items: true, user: true },
    });
  }

  static async findOrdersByUserId(userId: string) {
    return prisma.order.findMany({
      where: { userId },
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });
  }

  static async findAllOrders(params?: { page?: number; limit?: number; status?: string }) {
    const page = params?.page || 1;
    const limit = params?.limit || 20;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (params?.status) where.status = params.status;

    const [total, orders] = await Promise.all([
      prisma.order.count({ where }),
      prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: { items: true },
      }),
    ]);

    return {
      orders,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // Events & Offers
  static async findAllEvents() {
    return prisma.event.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  static async findAllOffers() {
    return prisma.offer.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });
  }

  // Contact Messages & Newsletter
  static async createContactMessage(data: { name: string; email: string; subject?: string; message: string }) {
    return prisma.contactMessage.create({
      data,
    });
  }

  static async createNewsletterSubscriber(email: string) {
    return prisma.newsletterSubscriber.upsert({
      where: { email: email.toLowerCase() },
      update: { isActive: true },
      create: { email: email.toLowerCase() },
    });
  }
}
