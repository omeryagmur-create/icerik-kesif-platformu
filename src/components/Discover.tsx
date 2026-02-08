'use client';

import { motion } from 'framer-motion';

export function Discover() {
    return (
        <section id="discover" className="relative py-32 px-6 overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10 opacity-50" />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-display font-black mb-6"
                    >
                        Neyi Hedefliyoruz?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-foreground/50 max-w-2xl mx-auto text-xl leading-relaxed font-light"
                    >
                        Algoritmaların sizi kutulara hapsedişine son veriyoruz. <br className="hidden md:block" />
                        Gerçek zevklerinize hitap eden, <span className="text-primary font-medium">özgürleştirici</span> bir keşif deneyimi.
                    </motion.p>
                </div>

                {/* Video Placeholder with premium styling */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative aspect-video rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#111] shadow-[0_0_100px_rgba(0,0,0,0.8)] mb-28 group"
                >
                    {/* Glass Overlay on hover */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-700 z-10" />

                    {/* Decorative Ring */}
                    <div className="absolute inset-0 border-[10px] border-white/5 rounded-[2.5rem] pointer-events-none z-20" />

                    <div className="absolute inset-0 flex flex-col items-center justify-center z-30">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-24 h-24 bg-white text-black rounded-full flex items-center justify-center shadow-2xl cursor-pointer"
                        >
                            <svg className="w-10 h-10 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.333-5.89a1.5 1.5 0 000-2.538L6.3 2.841z" />
                            </svg>
                        </motion.div>
                        <div className="mt-6 text-white/60 text-[10px] font-black tracking-[0.4em] uppercase">
                            Tanıtım Videosunu İzle
                        </div>
                    </div>

                    {/* Noise Texture on video */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none z-20" />
                </motion.div>

                {/* Mini Features Grid with more style */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
                    {[
                        { icon: "📚", title: "Kişisel Kitaplık", desc: "Sadece popüler olanları değil, düşünce yapınıza en uygun eserleri keşfedin.", color: "from-blue-500/10" },
                        { icon: "🎬", title: "Sinematik Keşif", desc: "Türler arası geçiş yapan akıllı önerilerle yeni favori dizinizi bulun.", color: "from-purple-500/10" },
                        { icon: "🎵", title: "Müzikal Yolculuk", desc: "Ruh halinize ve derin zevklerinize hitap eden, sıradanlıktan uzak müzikler.", color: "from-orange-500/10" }
                    ].map((feat, idx) => (
                        <motion.div
                            key={feat.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15 }}
                            className={`group relative p-8 rounded-[2rem] bg-gradient-to-b ${feat.color} to-transparent border border-white/5 hover:border-white/10 transition-all`}
                        >
                            <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-500">{feat.icon}</div>
                            <h3 className="text-2xl font-black mb-4 text-white">{feat.title}</h3>
                            <p className="text-foreground/40 leading-relaxed font-light">{feat.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

