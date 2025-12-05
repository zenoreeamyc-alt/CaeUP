import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const customers = await prisma.customer.findMany({
      include: {
        orders: true,
        deposits: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, customers });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 },
    );
  }
}
