"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";

export function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const nextLocale = e.target.value;
        startTransition(() => {
            const segments = pathname.split('/');
            // If pathname starts with a locale, segments[1] is the locale.
            // If pathname is just checking, safer to assume standard next-intl structure
            // segments: ['', 'tr', 'page']
            if (segments.length > 1) {
                segments[1] = nextLocale;
            } else {
                // Should not happen with locale routing, but fallback
                segments.push(nextLocale);
            }
            const newPath = segments.join('/');
            router.replace(newPath);
        });
    };

    return (
        <div className="relative z-50">
            <select
                defaultValue={locale}
                onChange={onSelectChange}
                disabled={isPending}
                className="bg-background/80 backdrop-blur-sm border border-border/30 rounded-full py-2 px-4 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none pr-8 cursor-pointer shadow-sm hover:bg-muted/50 transition-colors"
            >
                <option value="tr">Türkçe</option>
                <option value="en">English</option>
                <option value="ru">Русский (Russian)</option>
                <option value="de">Deutsch (German)</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-foreground/50 text-[10px]">
                ▼
            </div>
        </div>
    );
}
