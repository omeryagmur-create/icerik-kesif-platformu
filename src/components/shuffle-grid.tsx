"use client"

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const ShuffleHero = () => {
  const scrollToForm = () => {
    document.getElementById('early-access-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
      <div>
        <span className="block mb-4 text-xs md:text-sm text-primary font-medium uppercase tracking-widest">
          Keşfetmenin Akıllı Yolu
        </span>
        <h3 className="text-4xl md:text-6xl font-display font-bold text-foreground leading-tight">
          Zevkine Göre Öneriler, Zaman Kaybı Yok
        </h3>
        <p className="text-base md:text-lg text-muted-foreground my-4 md:my-6">
          Tek bir yerden kitap, dizi, film ve müzik keşfet. Yapay zeka destekli sezgisel algoritmamızla senin için en anlamlı olanı bul.
        </p>
        <button
          onClick={scrollToForm}
          className={cn(
            "bg-primary text-white font-bold py-4 px-8 rounded-full text-lg",
            "transition-all hover:bg-primary-hover active:scale-95 shadow-[0_0_20px_rgba(139,92,246,0.3)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer"
          )}
        >
          Erken Erişim İçin Kayıt Ol →
        </button>
      </div>
      <ShuffleGrid />
    </section>
  );
};

const shuffle = (array: (typeof squareData)[0][]) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  { id: 1, src: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80" },
  { id: 2, src: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80" },
  { id: 3, src: "https://images.unsplash.com/photo-1514525253361-bee8d4a46db2?auto=format&fit=crop&w=800&q=80" },
  { id: 4, src: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80" },
  { id: 5, src: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80" },
  { id: 6, src: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=800&q=80" },
  { id: 7, src: "https://images.unsplash.com/photo-1512044459824-406a4bb69194?auto=format&fit=crop&w=800&q=80" },
  { id: 8, src: "https://images.unsplash.com/photo-1535016120720-40c646bebbbb?auto=format&fit=crop&w=800&q=80" },
  { id: 9, src: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80" },
  { id: 10, src: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80" },
  { id: 11, src: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=800&q=80" },
  { id: 12, src: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80" },
  { id: 13, src: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80" },
  { id: 14, src: "https://images.unsplash.com/photo-1586899028174-e7098604235b?auto=format&fit=crop&w=800&q=80" },
  { id: 15, src: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80" },
  { id: 16, src: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80" },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full rounded-md overflow-hidden bg-muted"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};
