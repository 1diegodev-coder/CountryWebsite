import { NextRequest, NextResponse } from 'next/server';
import { UserProfileSchema } from '@/lib/schema/profile';
import { runMatchingEngine } from '@/lib/engine';
import { redis, REDIS_TTL } from '@/lib/redis';
import { nanoid } from 'nanoid';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate profile
    const profileResult = UserProfileSchema.safeParse(body);
    if (!profileResult.success) {
      return NextResponse.json({ 
        error: 'Invalid profile data', 
        details: profileResult.error.format() 
      }, { status: 400 });
    }

    const profile = profileResult.data;
    
    // Run engine
    const result = runMatchingEngine(profile);
    
    // Generate 8-char token as per ADR 004
    const sessionToken = nanoid(8);
    
    // Persist to Redis if available
    let shareReady = false;
    if (redis) {
      try {
        await redis.set(`result:${sessionToken}`, JSON.stringify({ ...result, sessionToken, shareReady: true }), { ex: REDIS_TTL });
        shareReady = true;
      } catch (redisError) {
        console.error('Redis store error:', redisError);
        // We continue anyway, as the quiz should still work even if share fails
      }
    }

    const matchPayload = {
      ...result,
      sessionToken,
      shareReady,
    };

    return NextResponse.json(matchPayload);
  } catch (error) {
    console.error('Match error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
