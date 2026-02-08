import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

    if (!GOOGLE_SCRIPT_URL) {
        return NextResponse.json({ error: 'Google Script URL not configured' }, { status: 500 });
    }

    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'GET',
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`Google API responded with ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Proxy Error:', error);
        return NextResponse.json({ error: 'Failed to fetch count from Google' }, { status: 500 });
    }
}
