import { useTranslations } from "next-intl";
import { FooterFlowers } from "./FooterFlowers";

export function Footer() {
    const t = useTranslations('Footer');

    return (
        <footer className="relative py-12 px-6 border-t border-border/30 bg-background overflow-hidden">
            <FooterFlowers />
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 relative z-10 pointer-events-none">
                <div className="flex flex-col gap-2 pointer-events-auto">
                    <span className="text-xl font-display font-bold tracking-tight">{t('brand')}</span>
                    <p className="text-foreground/40 text-sm">{t('rights')}</p>
                </div>

                <div className="flex gap-8 text-sm text-foreground/60 pointer-events-auto">
                    <a href="#" className="hover:text-primary transition-colors">{t('links.twitter')}</a>
                    <a href="#" className="hover:text-primary transition-colors">{t('links.instagram')}</a>
                    <a href="#" className="hover:text-primary transition-colors">{t('links.discord')}</a>
                    <a href="#" className="hover:text-primary transition-colors">{t('links.privacy')}</a>
                </div>
            </div>
        </footer>
    );
}
