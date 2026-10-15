import { NextRequest, NextResponse } from 'next/server';
import { submitContactInquiry } from '@/services/inquiry.service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await submitContactInquiry(body);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to submit inquiry' },
      { status: 400 }
    );
  }
}
