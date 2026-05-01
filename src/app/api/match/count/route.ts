import { NextRequest, NextResponse } from 'next/server';
import { getMatchingCount } from '@/lib/quizCounter';

export async function POST(request: NextRequest) {
  try {
    const answers = await request.json();
    const count = getMatchingCount(answers);
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Match count API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
