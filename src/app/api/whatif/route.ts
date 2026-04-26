import { NextRequest, NextResponse } from 'next/server';
import { UserProfileSchema } from '@/lib/schema/profile';
import { runMatchingEngine } from '@/lib/engine';
import * as Sentry from "@sentry/nextjs";
import { whatifRatelimit } from '@/lib/ratelimit';

export async function POST(request: NextRequest) {
  if (whatifRatelimit) {
    const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1';
    const { success } = await whatifRatelimit.limit(ip);
    if (!success) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }
  }

  try {
    const body = await request.json();
    
    const { profile: rawProfile } = body;
    
    // Validate profile
    const profileResult = UserProfileSchema.safeParse(rawProfile);
    if (!profileResult.success) {
      return NextResponse.json({ 
        error: 'Invalid profile data', 
        details: profileResult.error.format() 
      }, { status: 400 });
    }

    const profile = profileResult.data;
    const overrides = profile.overrides || [];
    
    // Run engine with possible overrides (countries the user wants to see even if eliminated)
    const result = runMatchingEngine(profile, overrides);
    
    return NextResponse.json(result);
  } catch (error) {
    Sentry.captureException(error);
    console.error('What-If error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
