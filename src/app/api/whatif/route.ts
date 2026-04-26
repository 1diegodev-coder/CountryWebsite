import { NextRequest, NextResponse } from 'next/server';
import { UserProfileSchema } from '@/lib/schema/profile';
import { runMatchingEngine } from '@/lib/engine';

export async function POST(request: NextRequest) {
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
    console.error('What-If error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
