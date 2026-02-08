'use client';

import { Heart, Coffee, Star } from 'lucide-react';

export function SupportSection() {
    return (
        <section className="py-24 px-6 border-t border-border/50">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 flex items-center gap-3">
                        <Heart className="text-red-500 fill-red-500 w-8 h-8" />
                        Bağımsız Geliştiriciye Destek Ol
                    </h2>
                    <p className="text-foreground/70 mb-8 leading-relaxed">
                        Bu proje reklamlar veya büyük sermayelerle değil, topluluk desteği ve tutkuyla geliştiriliyor.
                        Her kahve bağışı, geliştirme sürecini hızlandırıyor ve platformun daha kaliteli özelliklere sahip olmasını sağlıyor.
                    </p>
                    <ul className="space-y-4 mb-8">
                        <li className="flex items-center gap-3 text-foreground/80">
                            <Star className="w-5 h-5 text-secondary" />
                            <span>Geliştirme sürecine dahil olabilirsiniz</span>
                        </li>
                        <li className="flex items-center gap-3 text-foreground/80">
                            <Star className="w-5 h-5 text-secondary" />
                            <span>Lansman öncesi beta testlerine katılın</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-card p-8 rounded-3xl border border-border flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
                        <Coffee className="w-10 h-10 text-secondary" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">Bir Kahve Ismarla</h3>
                    <p className="text-foreground/50 mb-8 text-sm">
                        Destek olmak için Buy Me a Coffee platformunu kullanabilirsiniz.
                    </p>
                    <a
                        href="#"
                        className="w-full py-4 bg-secondary hover:bg-secondary/90 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-secondary/20"
                    >
                        Destek Ol (Coffee)
                    </a>
                </div>
            </div>
        </section>
    );
}
