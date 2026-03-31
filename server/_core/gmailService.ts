import nodemailer from 'nodemailer';
import { ENV } from './env';

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

let transporter: nodemailer.Transporter | null = null;

/**
 * Initialize Gmail transporter
 */
function getTransporter() {
  if (transporter) {
    return transporter;
  }

  if (!ENV.gmailUser || !ENV.gmailPassword) {
    throw new Error('Gmail credentials not configured');
  }

  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: ENV.gmailUser,
      pass: ENV.gmailPassword,
    },
  });

  return transporter;
}

/**
 * Send booking confirmation email to admin
 */
export async function sendBookingConfirmationEmail(data: BookingEmailData): Promise<boolean> {
  try {
    const transporter = getTransporter();
    const adminEmail = ENV.adminEmail;

    if (!adminEmail) {
      console.error('[Email] Admin email not configured');
      return false;
    }

    const emailContent = `
<html dir="rtl">
  <body style="font-family: Arial, sans-serif; direction: rtl; background-color: #f5f5f5; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <h1 style="color: #d4af37; text-align: center; margin-bottom: 30px;">🎉 حجز جديد من Travel Valet Düsseldorf</h1>
      
      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
        <h2 style="color: #333; margin-top: 0;">تفاصيل الحجز:</h2>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 10px; font-weight: bold; color: #d4af37;">رقم الطلب:</td>
            <td style="padding: 10px; color: #333;">${data.orderId}</td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 10px; font-weight: bold; color: #d4af37;">اسم العميل:</td>
            <td style="padding: 10px; color: #333;">${data.customerName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 10px; font-weight: bold; color: #d4af37;">بريد العميل:</td>
            <td style="padding: 10px; color: #333;"><a href="mailto:${data.customerEmail}" style="color: #d4af37; text-decoration: none;">${data.customerEmail}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 10px; font-weight: bold; color: #d4af37;">الخدمة:</td>
            <td style="padding: 10px; color: #333;">${data.serviceName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 10px; font-weight: bold; color: #d4af37;">عدد الأيام:</td>
            <td style="padding: 10px; color: #333;">${data.days}</td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 10px; font-weight: bold; color: #d4af37;">السعر الإجمالي:</td>
            <td style="padding: 10px; color: #333; font-size: 18px; font-weight: bold;">€${(data.totalPrice / 100).toFixed(2)}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #d4af37;">تاريخ الحجز:</td>
            <td style="padding: 10px; color: #333;">${data.bookingDate}</td>
          </tr>
        </table>
      </div>

      <div style="background-color: #fffacd; padding: 15px; border-radius: 5px; border-right: 4px solid #d4af37; margin-bottom: 20px;">
        <p style="margin: 0; color: #333;">
          <strong>⚠️ ملاحظة مهمة:</strong> يرجى التحقق من تفاصيل الحجز والتواصل مع العميل للتأكيد والحصول على تفاصيل إضافية إذا لزم الأمر.
        </p>
      </div>

      <div style="text-align: center; color: #999; font-size: 12px; border-top: 1px solid #ddd; padding-top: 20px;">
        <p>هذا البريد تم إرساله تلقائياً من نظام Travel Valet Düsseldorf</p>
        <p>© 2026 Travel Valet Düsseldorf. جميع الحقوق محفوظة.</p>
      </div>
    </div>
  </body>
</html>
    `;

    const info = await transporter.sendMail({
      from: ENV.gmailUser,
      to: adminEmail,
      subject: `🎉 حجز جديد: ${data.customerName} - الطلب #${data.orderId}`,
      html: emailContent,
    });

    console.log(`[Email] Booking confirmation sent successfully. Message ID: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error('[Email] Error sending booking confirmation:', error);
    return false;
  }
}

/**
 * Send payment confirmation email to customer
 */
export async function sendPaymentConfirmationToCustomer(data: BookingEmailData): Promise<boolean> {
  try {
    const transporter = getTransporter();

    const emailContent = `
<html dir="rtl">
  <body style="font-family: Arial, sans-serif; direction: rtl; background-color: #f5f5f5; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <h1 style="color: #d4af37; text-align: center; margin-bottom: 30px;">✅ تم تأكيد حجزك</h1>
      
      <p style="color: #333; font-size: 16px; line-height: 1.6;">
        شكراً لك <strong>${data.customerName}</strong>! تم استقبال حجزك بنجاح.
      </p>

      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <h2 style="color: #333; margin-top: 0;">تفاصيل الحجز:</h2>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 10px; font-weight: bold; color: #d4af37;">رقم الطلب:</td>
            <td style="padding: 10px; color: #333;">${data.orderId}</td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 10px; font-weight: bold; color: #d4af37;">الخدمة:</td>
            <td style="padding: 10px; color: #333;">${data.serviceName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 10px; font-weight: bold; color: #d4af37;">عدد الأيام:</td>
            <td style="padding: 10px; color: #333;">${data.days}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #d4af37;">السعر الإجمالي:</td>
            <td style="padding: 10px; color: #333; font-size: 18px; font-weight: bold;">€${(data.totalPrice / 100).toFixed(2)}</td>
          </tr>
        </table>
      </div>

      <div style="background-color: #e8f5e9; padding: 15px; border-radius: 5px; border-right: 4px solid #4caf50; margin-bottom: 20px;">
        <p style="margin: 0; color: #333;">
          <strong>✓ تم الدفع بنجاح!</strong> سيتم التواصل معك قريباً لتأكيد التفاصيل والترتيبات النهائية.
        </p>
      </div>

      <div style="text-align: center; margin-top: 30px;">
        <p style="color: #999; font-size: 12px;">
          للتواصل معنا: <strong>+49 163 9176557</strong> أو <strong>https://wa.me/491639176557</strong>
        </p>
      </div>

      <div style="text-align: center; color: #999; font-size: 12px; border-top: 1px solid #ddd; padding-top: 20px;">
        <p>© 2026 Travel Valet Düsseldorf. جميع الحقوق محفوظة.</p>
      </div>
    </div>
  </body>
</html>
    `;

    const info = await transporter.sendMail({
      from: ENV.gmailUser,
      to: data.customerEmail,
      subject: `✅ تم تأكيد حجزك - Travel Valet Düsseldorf - الطلب #${data.orderId}`,
      html: emailContent,
    });

    console.log(`[Email] Payment confirmation sent to customer. Message ID: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error('[Email] Error sending payment confirmation to customer:', error);
    return false;
  }
}
