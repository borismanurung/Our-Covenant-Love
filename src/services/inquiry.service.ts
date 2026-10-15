import { prisma } from '@/lib/prisma';

export interface SubmitInquiryInput {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  locale: string;
  honeypot?: string; // Hidden bot field
}

export async function submitContactInquiry(data: SubmitInquiryInput) {
  // Anti-spam honeypot check: If bot filled the hidden field, quietly ignore
  if (data.honeypot && data.honeypot.trim() !== '') {
    return { success: true, spamFiltered: true };
  }

  // Server-side validation
  const cleanName = data.name?.trim();
  const cleanEmail = data.email?.trim().toLowerCase();
  const cleanSubject = data.subject?.trim();
  const cleanMessage = data.message?.trim();
  const cleanPhone = data.phone?.trim() || null;

  if (!cleanName || cleanName.length < 2) {
    throw new Error('Name must be at least 2 characters.');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!cleanEmail || !emailRegex.test(cleanEmail)) {
    throw new Error('Invalid email address.');
  }

  if (!cleanSubject || cleanSubject.length < 3) {
    throw new Error('Subject must be at least 3 characters.');
  }

  if (!cleanMessage || cleanMessage.length < 10) {
    throw new Error('Message must be at least 10 characters.');
  }

  const inquiry = await prisma.contactInquiry.create({
    data: {
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      subject: cleanSubject,
      message: cleanMessage,
      locale: data.locale || 'id',
      status: 'NEW',
    },
  });

  return { success: true, inquiryId: inquiry.id };
}

export async function getInquiries(limit = 50) {
  return prisma.contactInquiry.findMany({
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}
