import { NextRequest, NextResponse } from 'next/server';
import { PublicCountrySchema } from '@/lib/schema/country';
import { COUNTRIES } from '@/lib/data/countries';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const code = (await params).code.toUpperCase();
    
    if (code.length !== 2) {
      return NextResponse.json({ error: 'Invalid country code' }, { status: 400 });
    }

    const country = COUNTRIES.find(c => c.iso2 === code);
    if (!country) {
      return NextResponse.json({ error: 'not_found' }, { status: 404 });
    }

    // Strip internal fields and add curated snapshot
    const publicData = PublicCountrySchema.parse({
      ...country,
      snapshot: {
        internetReliability: country.rawIndicators.internetReliability,
        englishDailyLife: country.rawIndicators.englishDailyLife,
        stability: country.rawIndicators.stability,
        airQualityIndex: country.rawIndicators.airQualityIndex,
        climate: {
          summerHigh: country.rawIndicators.summerHighC,
          winterLow: country.rawIndicators.winterLowC,
        }
      }
    });
    return NextResponse.json(publicData);
  } catch (error) {
    console.error('Country API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
