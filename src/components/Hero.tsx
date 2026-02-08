'use client';

import { motion } from 'framer-motion';

export function Hero() {
    const scrollToForm = () => {
        document.getElementById('early-access-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 text-center overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full -z-10" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
            >
                <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-tight">
                    Keşfetmenin Akıllı Yolu
                </h1>

                <p className="text-xl md:text-2xl text-foreground/80 mb-12 max-w-2xl mx-auto">
                    Tek bir yerden kitap, dizi, film ve müzik keşfet.
                    Zevkine göre öneriler, zaman kaybı yok.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                        onClick={scrollToForm}
                        className="px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-full text-lg font-semibold transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:scale-105 active:scale-95 cursor-pointer"
                    >
                        Erken Erişim İçin Kayıt Ol →
                    </button>
                    <p className="text-sm text-foreground/50 italic">
                        Tamamen ücretsiz, reklamsız ve sade.
                    </p>
                </div>
            </motion.div>

            {/* Decorative Video Placeholder / Image */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-16 w-full max-w-5xl aspect-video rounded-2xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden shadow-2xl"
            >
                <div className="w-full h-full flex items-center justify-center text-foreground/20">
                    {/* Buraya sonrasında spesifikasyondaki gibi video gelecek */}
                    <div className="flex flex-col items-center gap-4">
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-display text-lg tracking-widest uppercase italic">Platform Preview Coming Soon</span>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
