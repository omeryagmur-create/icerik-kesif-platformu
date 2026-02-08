import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

    if (!GOOGLE_SCRIPT_URL) {
        console.error('Proxy Error: NEXT_PUBLIC_GOOGLE_SCRIPT_URL is not defined in environment variables.');
        return NextResponse.json({ error: 'Configuration missing' }, { status: 500 });
    }

    try {
        console.log('Proxy: Fetching count from Google...');
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'GET',
            cache: 'no-store',
            headers: {
                'Accept': 'application/json',
            }
        });

        const status = response.status;
        console.log(`Proxy: Google responded with status ${status}`);

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Proxy: Google API error text: ${errorText}`);
            throw new Error(`Google API returned ${status}`);
        }

        const data = await response.json();
        console.log('Proxy: Successfully fetched data:', data);

        // Ensure the response has the expected structure
        if (data && typeof data.count === 'number') {
            return NextResponse.json(data);
        } else {
            console.error('Proxy: Invalid data format from Google:', data);
            return NextResponse.json({ error: 'Invalid data format' }, { status: 502 });
        }
    } catch (error: any) {
        console.error('Proxy Fatal Error:', error.message || error);
        return NextResponse.json({
            error: 'Failed to fetch count',
            details: error.message || 'Unknown error'
        }, { status: 500 });
    }
}
