import { ENV } from "./env";

export interface BookingEmailData {
  customerName: string;
  customerEmail: string;
  serviceName: string;
  days: number;
  totalPrice: number;
  currency: string;
  bookingDate: string;
  orderId: number;
}

/**
 * Sends a booking confirmation email to the admin
 */
export async function sendBookingConfirmationEmail(data: BookingEmailData): Promise<boolean> {
  try {
    const adminEmail = ENV.adminEmail;
    if (!adminEmail) {
      console.warn("[Email] Admin email not configured");
      return false;
    }

    // Format the email body
    const emailBody = `
حجز جديد من Travel Valet Düsseldorf
=====================================

تفاصيل الحجز:
- رقم الطلب: ${data.orderId}
- اسم العميل: ${data.customerName}
- بريد العميل: ${data.customerEmail}
- الخدمة: ${data.serviceName}
- عدد الأيام: ${data.days}
- السعر الإجمالي: ${(data.totalPrice / 100).toFixed(2)} ${data.currency}
- تاريخ الحجز: ${data.bookingDate}

يرجى التحقق من تفاصيل الحجز والتواصل مع العميل للتأكيد.

---
هذا البريد تم إرساله تلقائياً من نظام Travel Valet Düsseldorf
    `.trim();

    // Use Manus notification service to send email
    const endpoint = new URL(
      "webdevtoken.v1.WebDevService/SendNotification",
      ENV.forgeApiUrl
    ).toString();

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${ENV.forgeApiKey}`,
        "content-type": "application/json",
        "connect-protocol-version": "1",
      },
      body: JSON.stringify({
        title: `حجز جديد: ${data.customerName}`,
        content: emailBody,
      }),
    });

    if (!response.ok) {
      console.error(`[Email] Failed to send email (${response.status})`);
      return false;
    }

    console.log(`[Email] Booking confirmation sent to admin for order ${data.orderId}`);
    return true;
  } catch (error) {
    console.error("[Email] Error sending booking confirmation:", error);
    return false;
  }
}

/**
 * Sends a payment confirmation email to the customer
 */
export async function sendPaymentConfirmationEmail(data: BookingEmailData): Promise<boolean> {
  try {
    // For customer email, we would need a different service
    // For now, we'll log it
    console.log(`[Email] Payment confirmation would be sent to customer: ${data.customerEmail}`);
    return true;
  } catch (error) {
    console.error("[Email] Error sending payment confirmation:", error);
    return false;
  }
}
