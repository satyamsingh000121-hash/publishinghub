export type OrderStatus = "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
export type PaymentStatus = "UNPAID" | "PAID" | "REFUNDED" | "FAILED";

export interface CartItemDTO {
  id: string;
  productId: string;
  title: string;
  price: string;
  numericPrice: number;
  image: string;
  quantity: number;
}

export interface CartDTO {
  id: string;
  userId?: string | null;
  items: CartItemDTO[];
  totalAmount: number;
  totalQuantity: number;
}

export interface OrderItemDTO {
  id: string;
  productId: string;
  productTitle: string;
  productImage: string;
  price: number;
  quantity: number;
}

export interface OrderDTO {
  id: string;
  userId: string;
  orderNumber: string;
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  shippingAddress: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string | null;
  items: OrderItemDTO[];
  createdAt: Date | string;
  updatedAt: Date | string;
}
