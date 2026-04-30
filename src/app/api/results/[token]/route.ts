import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    
    if (!token || token.length !== 8) {
      return NextResponse.json({ error: 'invalid_token' }, { status: 400 });
    }

    if (!redis) {
      return NextResponse.json({ error: 'service_unavailable' }, { status: 503 });
    }
    const data = await redis.get(`result:${token}`);
    
    if (!data) {
      return NextResponse.json({ error: 'not_found' }, { status: 404 });
    }

    // data might be already parsed or stringified depending on client
    const payload = typeof data === 'string' ? JSON.parse(data) : data;
    
    return NextResponse.json(payload);
  } catch (error) {
    console.error('Results lookup error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
