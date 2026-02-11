'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import toast from 'react-hot-toast';
import { Loader2, Sparkles, Send, Users } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

// NOT: Bu URL'i Google Apps Script'ten aldığınız URL ile değiştirin.
// NEXT_PUBLIC_GOOGLE_SCRIPT_URL ortam değişkeni Vercel panelinden de tanımlanmalıdır.
const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || '';

export function WaitlistHero() {
    const t = useTranslations('Hero');
    const locale = useLocale();

    const isRussian = locale === 'ru';

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [honeypot, setHoneypot] = useState('');
    const [subscriberCount, setSubscriberCount] = useState<number | null>(null);

    // Mouse animation values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const fetchCount = async () => {
        try {
            // Doğrudan Google'a değil, kendi Proxy API'mize istek atıyoruz (CORS çözümüdür)
            const response = await fetch('/api/count', {
                method: 'GET',
                cache: 'no-store'
            });

            if (!response.ok) throw new Error(`Server error! status: ${response.status}`);

            const data = await response.json();
            if (data && typeof data.count === 'number') {
                setSubscriberCount(data.count);
            } else {
                console.warn('WaitlistHero: Count data missing in response:', data);
            }
        } catch (error) {
            console.error('WaitlistHero: Count fetch failed:', error);
        }
    };

    // Smooth springs for mouse movement
    const springX = useSpring(mouseX, { damping: 50, stiffness: 400 });
    const springY = useSpring(mouseY, { damping: 50, stiffness: 400 });

    // Transforms for parallax-like effect on blobs
    const blobX1 = useTransform(springX, (val) => val * 0.05);
    const blobY1 = useTransform(springY, (val) => val * 0.05);
    const blobX2 = useTransform(springX, (val) => val * -0.05);
    const blobY2 = useTransform(springY, (val) => val * -0.05);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX - window.innerWidth / 2);
            mouseY.set(e.clientY - window.innerHeight / 2);
        };

        window.addEventListener('mousemove', handleMouseMove);
        fetchCount();
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Honeypot kontrolü (bot engelleme)
        if (honeypot !== '') return;

        if (!GOOGLE_SCRIPT_URL) {
            toast.error('Geliştirici Notu: Google Script URL tanımlanmamış.');
            return;
        }

        setLoading(true);

        try {
            // Google Apps Script POST isteği
            // ÖNEMLİ: GAS 'no-cors' modu olmadan tarayıcıda bağlantı hatası verir.
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            // 'no-cors' modunda response okunamaz, direkt başarılı kabul ediyoruz.
            setSubmitted(true);
            toast.success('Waitlist güncellendi! 🚀');

            // Sayıyı bir saniye sonra güncelle (Sheet'in işlenmesi için zaman tanı)
            setTimeout(fetchCount, 2000);
        } catch (error) {
            console.error('GAS Error:', error);
            toast.error('Bağlantı hatası oluştu. Lütfen tekrar deneyin.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pb-40 overflow-hidden bg-[#0a0a0a]">
            {/* Interactive Background Blobs */}
            <motion.div
                style={{ x: blobX1, y: blobY1 }}
                className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-primary/20 blur-[150px] rounded-full"
            />
            <motion.div
                style={{ x: blobX2, y: blobY2 }}
                className="absolute bottom-[-15%] right-[-10%] w-[60%] h-[60%] bg-secondary/15 blur-[150px] rounded-full"
            />
            <div className="absolute top-[30%] right-[15%] w-[35%] h-[35%] bg-accent/10 blur-[160px] rounded-full animate-pulse" />

            {/* Background Texture/Noise */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay" />

            {/* Vignette effect to center focus */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,10,10,0.8)_100%)]" />

            <div className="relative z-10 max-w-4xl w-full text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <h1
                        className={`font-display font-black mb-10 tracking-tighter text-white ${isRussian ? 'leading-tight' : 'text-6xl md:text-[7.5rem] leading-[0.85]'}`}
                        style={isRussian ? { fontSize: 'clamp(2rem, 5vw, 3.5rem)' } : {}}
                    >
                        {t('titlePrefix')} <br />
                        <span className={`bg-gradient-to-r from-primary via-purple-400 to-secondary bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(139,92,246,0.2)] ${isRussian ? 'whitespace-nowrap inline-block' : ''}`}>
                            {t('titleWaitlist')}
                        </span>
                    </h1>

                    <p className="text-lg md:text-2xl text-foreground/40 mb-14 max-w-2xl mx-auto leading-relaxed font-light">
                        {t.rich('description', {
                            highlight: (chunks) => <span className="text-foreground/80 font-medium">{chunks}</span>
                        })}
                    </p>

                    {!submitted ? (
                        <motion.form
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            onSubmit={handleSubmit}
                            className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto p-2.5 bg-white/[0.02] border border-white/10 rounded-[2.5rem] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] group focus-within:border-primary/30 transition-colors"
                        >
                            {/* Honeypot field - Botlar için tuzak */}
                            <input
                                type="text"
                                name="full_name_hidden"
                                style={{ display: 'none' }}
                                tabIndex={-1}
                                autoComplete="off"
                                value={honeypot}
                                onChange={(e) => setHoneypot(e.target.value)}
                            />

                            <div className="flex-1 flex items-center px-6">
                                <Send className="w-5 h-5 text-foreground/20 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="email"
                                    placeholder={t('emailPlaceholder')}
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-xl py-5 ml-4 text-white placeholder:text-foreground/10"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="group/btn relative px-12 py-5 bg-primary hover:bg-primary-hover text-white rounded-[2rem] font-black text-xl transition-all disabled:opacity-50 overflow-hidden shadow-[0_10px_20px_rgba(139,92,246,0.3)] hover:shadow-primary/40 active:scale-95"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                                <span className="relative flex items-center justify-center gap-3">
                                    {loading ? (
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                    ) : (
                                        <>
                                            {t('cta')}
                                            <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center group-hover/btn:bg-white/20 transition-colors">
                                                <span className="text-sm group-hover/btn:translate-x-0.5 transition-transform">→</span>
                                            </div>
                                        </>
                                    )}
                                </span>
                            </button>
                        </motion.form>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-8 bg-primary/5 border border-primary/20 rounded-[2.5rem] backdrop-blur-xl max-w-md mx-auto shadow-2xl"
                        >
                            <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
                                <Sparkles className="w-7 h-7 text-primary animate-pulse" />
                            </div>
                            <h3 className="text-2xl font-black text-white mb-2">{t('successTitle')}</h3>
                            <p className="text-foreground/50 text-base leading-relaxed">
                                {t('successMessage')}
                            </p>
                        </motion.div>
                    )}

                    <div className="mt-16 flex items-center justify-center gap-3 text-foreground/30 text-sm">
                        <Users className="w-5 h-5 text-primary/40" />
                        <span className="font-medium text-lg">
                            {t('countPrefix')} <strong className="text-foreground/80 font-black">{subscriberCount !== null ? subscriberCount : '...'}</strong> {t('countSuffix')}
                        </span>
                    </div>
                </motion.div>
            </div>

            {/* Premium Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 1.5 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer group"
                onClick={() => document.getElementById('discover')?.scrollIntoView({ behavior: 'smooth' })}
            >
                <div className="text-[9px] uppercase tracking-[0.4em] font-black text-foreground/20 group-hover:text-primary transition-colors">
                    {t('scroll')}
                </div>
                <div className="relative w-[1px] h-16 bg-white/[0.05]">
                    <motion.div
                        animate={{ top: ["0%", "70%", "0%"] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute left-0 w-full h-1/3 bg-gradient-to-b from-white to-transparent"
                    />
                </div>
            </motion.div>
        </section>
    );
}
