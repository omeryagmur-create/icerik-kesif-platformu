'use client';

import { useEffect, useState } from 'react';
import { Users } from 'lucide-react';

export function Stats() {
    const [count, setCount] = useState(42); // Başlangıç değeri (dummy)

    useEffect(() => {
        // Gelecekte Supabase'den real-time çekilecek
        const interval = setInterval(() => {
            setCount(prev => prev + (Math.random() > 0.8 ? 1 : 0));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center gap-2 mt-8 animate-pulse">
            <div className="flex items-center gap-2 text-primary">
                <Users className="w-5 h-5" />
                <span className="font-bold text-xl">{count}</span>
            </div>
            <p className="text-foreground/40 text-sm">kişi şimdiden yerini ayırttı</p>
        </div>
    );
}
