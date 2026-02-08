'use client';

import { motion } from 'framer-motion';
import { Book, Film, Music, Brain } from 'lucide-react';

const features = [
    {
        icon: Book,
        title: 'Kitap Önerileri',
        description: 'Ruh haline, temaya ve düşünce tarzına göre derinlikli kitap keşifleri.',
        color: 'text-blue-400',
    },
    {
        icon: Film,
        title: 'Film & Dizi Keşfi',
        description: '"Buna benzer ama daha iyi" mantığıyla geliştirilen akıllı eşleşmeler.',
        color: 'text-red-400',
    },
    {
        icon: Music,
        title: 'Müzik Önerileri',
        description: 'Tek bir şarkıdan başlayarak müzik zevkinizin derinliklerine yolculuk.',
        color: 'text-purple-400',
    },
    {
        icon: Brain,
        title: 'Anlamlı Eşleşmeler',
        description: 'Popüler listeler değil, sizi gerçekten anlayan sezgisel bir algoritma.',
        color: 'text-green-400',
    },
];

export function Features() {
    return (
        <section className="py-24 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
                    Keşfetmek Hiç Bu Kadar Kişisel Olmamıştı
                </h2>
                <p className="text-foreground/60 max-w-2xl mx-auto">
                    Algoritmaların gürültüsünden uzaklaşın. Sadece sizin için anlamlı olan içeriklere odaklanın.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all hover:bg-card/80 group"
                    >
                        <div className={`w-12 h-12 rounded-lg bg-background flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                            <feature.icon className={`w-6 h-6 ${feature.color}`} />
                        </div>
                        <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                        <p className="text-foreground/60 leading-relaxed text-sm">
                            {feature.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
