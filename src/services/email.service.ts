import nodemailer from 'nodemailer';

export interface EmailInquiryPayload {
  id?: string;
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
  locale?: string;
  createdAt?: string | Date;
}

/**
 * Creates a reusable nodemailer transporter based on environment settings.
 */
function getTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;
  const user = process.env.SMTP_USER || process.env.CONTACT_NOTIFICATION_EMAIL || 'ourcovenantlove@gmail.com';
  const pass = process.env.SMTP_PASS;

  if (!pass || pass.trim() === '') {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
}

/**
 * Sends an email notification to the ministry team whenever a visitor submits
 * a prayer request, comment, counseling inquiry, or message.
 */
export async function sendInquiryNotificationEmail(inquiry: EmailInquiryPayload): Promise<boolean> {
  const transporter = getTransporter();

  if (!transporter) {
    console.info(
      '[Email Service] SMTP password (SMTP_PASS) is not configured yet in .env. Email notification skipped.'
    );
    return false;
  }

  const recipient =
    process.env.MAIL_TO ||
    process.env.CONTACT_NOTIFICATION_EMAIL ||
    'ourcovenantlove@gmail.com';

  const sender =
    process.env.SMTP_FROM ||
    `"Our Covenant Love" <${process.env.SMTP_USER || 'ourcovenantlove@gmail.com'}>`;

  const formattedDate = inquiry.createdAt
    ? new Date(inquiry.createdAt).toLocaleString('id-ID', {
        timeZone: 'Asia/Jakarta',
        dateStyle: 'full',
        timeStyle: 'short',
      })
    : new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });

  const cleanPhone = inquiry.phone?.trim();
  const waLink = cleanPhone
    ? `https://wa.me/${cleanPhone.replace(/[^0-9]/g, '')}`
    : null;

  const emailSubject = `[Our Covenant Love] Pesan Baru: ${inquiry.subject} - dari ${inquiry.name}`;

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    .header { background: linear-gradient(135deg, #4c0519 0%, #881337 100%); padding: 28px 24px; color: #ffffff; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.01em; }
    .header p { margin: 6px 0 0 0; font-size: 13px; opacity: 0.9; }
    .body { padding: 28px 24px; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; background: #ffe4e6; color: #9f1239; margin-bottom: 16px; }
    .grid { margin: 16px 0; border: 1px solid #f1f5f9; border-radius: 12px; background: #f8fafc; padding: 16px; font-size: 13px; line-height: 1.6; }
    .grid-row { display: flex; margin-bottom: 8px; }
    .grid-label { width: 120px; color: #64748b; font-weight: 600; text-transform: uppercase; font-size: 11px; }
    .grid-value { flex: 1; color: #0f172a; font-weight: 500; }
    .message-box { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin-top: 20px; font-size: 14px; line-height: 1.7; color: #334155; white-space: pre-wrap; }
    .footer { padding: 16px 24px; background: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center; font-size: 11px; color: #94a3b8; }
    .btn { display: inline-block; margin-top: 18px; padding: 10px 20px; background-color: #881337; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-size: 13px; font-weight: 600; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Our Covenant Love</h1>
      <p>Notifikasi Pesan / Pokok Doa Masuk dari Pengunjung Website</p>
    </div>
    <div class="body">
      <span class="badge">${inquiry.subject}</span>

      <div class="grid">
        <div class="grid-row">
          <span class="grid-label">Nama:</span>
          <span class="grid-value"><strong>${inquiry.name}</strong></span>
        </div>
        <div class="grid-row">
          <span class="grid-label">Email:</span>
          <span class="grid-value"><a href="mailto:${inquiry.email}" style="color: #881337;">${inquiry.email}</a></span>
        </div>
        ${
          cleanPhone
            ? `<div class="grid-row">
                <span class="grid-label">No. Kontak:</span>
                <span class="grid-value">${cleanPhone} ${waLink ? `(<a href="${waLink}" style="color: #059669; font-weight: 600;" target="_blank">Chat via WhatsApp</a>)` : ''}</span>
              </div>`
            : ''
        }
        <div class="grid-row">
          <span class="grid-label">Waktu:</span>
          <span class="grid-value">${formattedDate} WIB</span>
        </div>
        <div class="grid-row">
          <span class="grid-label">Bahasa Web:</span>
          <span class="grid-value">${(inquiry.locale || 'id').toUpperCase()}</span>
        </div>
      </div>

      <div style="margin-top: 20px; font-size: 12px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em;">
        Isi Pesan / Komentar / Permohonan Doa:
      </div>
      <div class="message-box">${inquiry.message}</div>

      <div style="text-align: center;">
        <a href="mailto:${inquiry.email}?subject=Re: ${encodeURIComponent(inquiry.subject)}" class="btn">
          Balas Langsung Pengirim via Email
        </a>
      </div>
    </div>
    <div class="footer">
      Email ini dikirim otomatis oleh sistem website Our Covenant Love.<br/>
      Kunjungi dashboard admin untuk mengelola dan merekap seluruh data kontak.
    </div>
  </div>
</body>
</html>
  `;

  try {
    const info = await transporter.sendMail({
      from: sender,
      to: recipient,
      replyTo: `"${inquiry.name}" <${inquiry.email}>`,
      subject: emailSubject,
      text: `Pesan baru dari ${inquiry.name} (${inquiry.email}, Kontak: ${inquiry.phone || '-'})\nSubjek: ${inquiry.subject}\n\nIsi:\n${inquiry.message}`,
      html: htmlContent,
    });

    console.info(`[Email Service] Notification sent to ${recipient}: ${info.messageId}`);
    return true;
  } catch (error: any) {
    console.error('[Email Service] Failed to send notification email:', error?.message || error);
    // Return false without crashing the caller
    return false;
  }
}
