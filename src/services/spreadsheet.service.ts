export interface SpreadsheetPayload {
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
  locale?: string;
  createdAt?: string | Date;
}

/**
 * Appends a new inquiry / comment / prayer request to a connected Google Sheet
 * via a Google Apps Script Webhook URL.
 * 
 * If GOOGLE_SHEET_WEBHOOK_URL is not configured, this silently succeeds with no-op.
 */
export async function appendInquiryToSpreadsheet(payload: SpreadsheetPayload): Promise<boolean> {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!webhookUrl || webhookUrl.trim() === '') {
    return false;
  }

  try {
    const formattedDate = payload.createdAt
      ? new Date(payload.createdAt).toLocaleString('id-ID', {
          timeZone: 'Asia/Jakarta',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      : new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });

    const response = await fetch(webhookUrl.trim(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timestamp: formattedDate,
        name: payload.name,
        contact: payload.phone || '-',
        email: payload.email,
        subject: payload.subject,
        message: payload.message,
        locale: payload.locale || 'id',
      }),
      signal: AbortSignal.timeout(8000), // 8 seconds timeout
    });

    if (!response.ok) {
      console.warn(`[Spreadsheet] Webhook returned status ${response.status}`);
      return false;
    }

    return true;
  } catch (error: any) {
    console.error('[Spreadsheet] Failed to sync to Google Sheet webhook:', error?.message || error);
    // Non-blocking: We don't throw so the visitor's submission still succeeds
    return false;
  }
}
