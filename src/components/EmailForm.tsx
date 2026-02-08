'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export function EmailForm() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // API call placeholder - will be implemented later
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(true);
                toast.success('Kayıt başarılı!');
                setEmail('');
            } else {
                toast.error(data.message || 'Mmm, bir şeyler ters gitti.');
            }
        } catch (error) {
            toast.error('Bağlantı hatası oluştu.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="early-access-form" className="py-24 px-6">
            <div className="max-w-3xl mx-auto p-12 rounded-[2.5rem] bg-gradient-to-br from-card to-muted border border-border shadow-2xl text-center relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 p-8 text-primary/10">
                    <Send className="w-32 h-32 -rotate-12" />
                </div>

                <div className="relative z-10">
                    <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
                        Yerini Ayırt
                    </h2>
                    <p className="text-foreground/70 mb-10 text-lg">
                        Sınırlı sayıdaki erken erişim kullanıcılarından biri ol ve lansmanda özel avantajlar kazan.
                    </p>

                    {!success ? (
                        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
                            <input
                                type="email"
                                placeholder="E-posta adresiniz"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-1 px-6 py-4 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-lg"
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? 'Kayıt Yapılıyor...' : 'Hemen Katıl'}
                            </button>
                        </form>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-6 bg-accent/10 border border-accent/20 rounded-2xl flex flex-col items-center gap-3"
                        >
                            <CheckCircle2 className="w-12 h-12 text-accent" />
                            <div className="text-lg font-bold text-accent">Kayıt Başarıyla Alındı!</div>
                            <p className="text-foreground/60">
                                Lansman yaklaştığında sizi ilk biz haberdar edeceğiz.
                            </p>
                        </motion.div>
                    )}

                    <p className="mt-6 text-sm text-foreground/40">
                        * Verileriniz güvende, sadece önemli güncellemeler gönderiyoruz.
                    </p>
                </div>
            </div>
        </section>
    );
}
