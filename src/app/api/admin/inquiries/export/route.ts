import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';

async function requireAuth(request: NextRequest) {
  const token = request.cookies.get('ocl_session')?.value;
  const user = await getSessionUser(token);
  if (!user) {
    throw new Error('Unauthorized');
  }
  return user;
}

function escapeCsvCell(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return '""';
  const str = String(value).replace(/"/g, '""');
  return `"${str}"`;
}

export async function GET(request: NextRequest) {
  try {
    await requireAuth(request);

    const inquiries = await prisma.contactInquiry.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const headers = [
      'ID',
      'Tanggal & Waktu (WIB)',
      'Nama',
      'No. Kontak / WA',
      'Email',
      'Kategori / Subjek',
      'Status',
      'Bahasa',
      'Isi Pesan / Komentar / Doa',
    ];

    const rows = inquiries.map((inq) => {
      const dateStr = new Date(inq.createdAt).toLocaleString('id-ID', {
        timeZone: 'Asia/Jakarta',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });

      return [
        escapeCsvCell(inq.id),
        escapeCsvCell(dateStr),
        escapeCsvCell(inq.name),
        escapeCsvCell(inq.phone || '-'),
        escapeCsvCell(inq.email),
        escapeCsvCell(inq.subject),
        escapeCsvCell(inq.status),
        escapeCsvCell(inq.locale.toUpperCase()),
        escapeCsvCell(inq.message),
      ].join(',');
    });

    // UTF-8 BOM (\uFEFF) ensures Excel opens Indonesian characters and emojis without encoding glitches
    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');

    const filename = `our-covenant-love-inquiries-${new Date().toISOString().split('T')[0]}.csv`;

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Unauthorized' },
      { status: 401 }
    );
  }
}
