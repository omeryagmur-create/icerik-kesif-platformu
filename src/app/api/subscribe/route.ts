import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json(
                { message: 'Geçersiz e-posta adresi.' },
                { status: 400 }
            );
        }

        const { data, error } = await supabase
            .from('early_access_subscribers')
            .insert([
                {
                    email,
                    source: 'landing_page',
                    metadata: {
                        user_agent: request.headers.get('user-agent'),
                    }
                }
            ]);

        if (error) {
            if (error.code === '23505') {
                return NextResponse.json(
                    { message: 'Bu e-posta zaten kayıtlı!' },
                    { status: 400 }
                );
            }
            throw error;
        }

        return NextResponse.json(
            { message: 'Kayıt başarılı!', data },
            { status: 200 }
        );
    } catch (error) {
        console.error('Subscription error:', error);
        return NextResponse.json(
            { message: 'Sunucu hatası oluştu.' },
            { status: 500 }
        );
    }
}
