import { NextRequest, NextResponse } from 'next/server';
import { getMatchingCount } from '@/lib/quizCounter';
import { UserProfileSchema } from '@/lib/schema/profile';
import { matchCountRatelimit } from '@/lib/ratelimit';
import * as Sentry from '@sentry/nextjs';

export async function POST(request: NextRequest) {
  if (matchCountRatelimit) {
    const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1';
    const { success } = await matchCountRatelimit.limit(ip);
    if (!success) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch (parseError) {
    return NextResponse.json({ error: 'Malformed JSON' }, { status: 400 });
  }

  try {
    // Validate partial profile data
    const profileResult = UserProfileSchema.partial().safeParse(body);
    if (!profileResult.success) {
      return NextResponse.json({ 
        error: 'Invalid profile data', 
        details: profileResult.error.format() 
      }, { status: 400 });
    }

    const answers = profileResult.data;
    const count = getMatchingCount(answers);
    return NextResponse.json({ count });
  } catch (error) {
    Sentry.captureException(error);
    console.error('Match count API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
