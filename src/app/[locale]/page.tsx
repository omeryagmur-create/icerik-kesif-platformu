import { WaitlistHero } from '@/components/WaitlistHero';
import { Discover } from '@/components/Discover';
import { SupportSection } from '@/components/SupportSection';
import { Footer } from '@/components/Footer';
import { Toaster } from 'react-hot-toast';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/30">
      <Toaster position="bottom-right" />

      {/* 0. Language Switcher */}
      <div className="absolute top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>

      {/* 1. Waitlist Hero (Top) */}
      <WaitlistHero />

      {/* 2. Video & Features (Discover) */}
      <Discover />

      {/* 3. Support (Coffee) */}
      <div className="bg-muted/10">
        <SupportSection />
      </div>

      {/* 4. Footer */}
      <Footer />
    </main>
  );
}
