export function Footer() {
    return (
        <footer className="py-12 px-6 border-t border-border/30 bg-background">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex flex-col gap-2">
                    <span className="text-xl font-display font-bold tracking-tight">İçerik Keşif Platformu</span>
                    <p className="text-foreground/40 text-sm">© 2026. Tüm hakları saklıdır.</p>
                </div>

                <div className="flex gap-8 text-sm text-foreground/60">
                    <a href="#" className="hover:text-primary transition-colors">Twitter (X)</a>
                    <a href="#" className="hover:text-primary transition-colors">Instagram</a>
                    <a href="#" className="hover:text-primary transition-colors">Discord</a>
                    <a href="#" className="hover:text-primary transition-colors">Gizlilik</a>
                </div>
            </div>
        </footer>
    );
}
