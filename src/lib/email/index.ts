export interface BookingConfirmationEmailParams {
  to: string;
  customerName: string;
  bookingReference: string;
  packageName: string;
  totalAmountInr: number;
  departureDate: string;
  travellerCount: number;
}

export async function sendBookingConfirmationEmail(params: BookingConfirmationEmailParams): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM || "Ziyara Concierge <concierge@ziyara.com>";

  if (!apiKey) {
    console.log("=================================================");
    console.log("[Resend Dev Fallback] Booking Confirmation Email:");
    console.log(`To: ${params.to} (${params.customerName})`);
    console.log(`Reference: ${params.bookingReference}`);
    console.log(`Package: ${params.packageName}`);
    console.log(`Departure: ${params.departureDate} | Pilgrims: ${params.travellerCount}`);
    console.log(`Total: ₹${params.totalAmountInr.toLocaleString("en-IN")}`);
    console.log("=================================================");
    return true;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [params.to],
        subject: `Booking Confirmed: ${params.bookingReference} — Ziyara`,
        html: `
          <div style="font-family: -apple-system, sans-serif; color: #1B2923; max-width: 600px; margin: 0 auto; padding: 24px;">
            <div style="background-color: #103D32; padding: 24px; border-radius: 12px; text-align: center; color: #ffffff;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 0.1em;">ZIYARA</h1>
              <p style="margin: 8px 0 0 0; color: #C5A264; font-size: 14px;">Your Sacred Journey, Beautifully Arranged</p>
            </div>
            
            <div style="padding: 24px 0;">
              <h2>Assalamu Alaikum ${params.customerName},</h2>
              <p>Thank you for choosing Ziyara. We have successfully received your booking request.</p>
              
              <div style="background: #F8F3E8; border: 1px solid #E7E0D0; border-radius: 8px; padding: 16px; margin: 20px 0;">
                <p style="margin: 4px 0;"><strong>Booking Reference:</strong> ${params.bookingReference}</p>
                <p style="margin: 4px 0;"><strong>Package:</strong> ${params.packageName}</p>
                <p style="margin: 4px 0;"><strong>Departure:</strong> ${params.departureDate}</p>
                <p style="margin: 4px 0;"><strong>Pilgrims:</strong> ${params.travellerCount}</p>
                <p style="margin: 4px 0;"><strong>Total Amount:</strong> ₹${params.totalAmountInr.toLocaleString("en-IN")}</p>
              </div>

              <p>Our dedicated Ziyara concierge team will review your travel details and connect with you shortly on WhatsApp / Phone to assist with visa documentation and payment reconciliation.</p>
            </div>

            <div style="border-top: 1px solid #E7E0D0; padding-top: 16px; font-size: 12px; color: #707873;">
              <p>Have questions? Reply directly to this email or reach us at +91 98200 12345.</p>
            </div>
          </div>
        `,
      }),
    });

    return res.ok;
  } catch (err) {
    console.error("[Email Error]", err);
    return false;
  }
}
