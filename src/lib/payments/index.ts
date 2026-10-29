import crypto from "crypto";

export interface CreateOrderParams {
  amountInr: number;
  bookingReference: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

export interface PaymentOrderResult {
  orderId: string;
  amount: number;
  currency: string;
  isMock: boolean;
  notes?: Record<string, string>;
}

export interface VerifyPaymentParams {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export class PaymentService {
  private keyId: string | undefined;
  private keySecret: string | undefined;

  constructor() {
    this.keyId = process.env.RAZORPAY_KEY_ID;
    this.keySecret = process.env.RAZORPAY_KEY_SECRET;
  }

  isConfigured(): boolean {
    return Boolean(this.keyId && this.keySecret);
  }

  /**
   * Create an order with the payment provider.
   * If credentials are unset, transparently returns a development mock order.
   */
  async createOrder(params: CreateOrderParams): Promise<PaymentOrderResult> {
    if (!this.isConfigured()) {
      console.log(`[PaymentService:Dev] Creating mock order for ${params.bookingReference} (₹${params.amountInr})`);
      return {
        orderId: `order_dev_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        amount: params.amountInr * 100, // paise
        currency: "INR",
        isMock: true,
        notes: {
          bookingReference: params.bookingReference,
          mode: "development_simulated",
        },
      };
    }

    try {
      const auth = Buffer.from(`${this.keyId}:${this.keySecret}`).toString("base64");
      const res = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: params.amountInr * 100, // amount in paise
          currency: "INR",
          receipt: params.bookingReference,
          notes: {
            customerName: params.customerName,
            customerEmail: params.customerEmail,
          },
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Razorpay order creation failed: ${errorText}`);
      }

      const orderData = await res.json();
      return {
        orderId: orderData.id,
        amount: orderData.amount,
        currency: orderData.currency,
        isMock: false,
      };
    } catch (err: unknown) {
      console.error("[PaymentService Error]", err);
      throw new Error("Failed to initialize payment gateway order.");
    }
  }

  /**
   * Verify server-side payment signature from Razorpay checkout.
   */
  verifySignature(params: VerifyPaymentParams): boolean {
    if (!this.isConfigured()) {
      // In dev mode, allow simulated success if order starts with order_dev_
      return params.razorpayOrderId.startsWith("order_dev_");
    }

    if (!this.keySecret) return false;

    const payload = `${params.razorpayOrderId}|${params.razorpayPaymentId}`;
    const expectedSignature = crypto
      .createHmac("sha256", this.keySecret)
      .update(payload)
      .digest("hex");

    return expectedSignature === params.razorpaySignature;
  }
}

export const payments = new PaymentService();
