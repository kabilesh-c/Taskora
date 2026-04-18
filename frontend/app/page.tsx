import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { DarkFeatureBlock } from '@/components/landing/DarkFeatureBlock';
import { StatsBar } from '@/components/landing/StatsBar';
import { FeatureCardsGrid } from '@/components/landing/FeatureCardsGrid';
import { Features } from '@/components/landing/Features';
import { UpcomingPlans } from '@/components/landing/UpcomingPlans';
import { Testimonials } from '@/components/landing/Testimonials';
import { Footer } from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bordup-bg font-sans selection:bg-purple-200 selection:text-purple-900 overflow-x-hidden">
      <Navbar />
      
      <main>
        <Hero />
        <DarkFeatureBlock />
        <StatsBar />
        <FeatureCardsGrid />
        <Features />
        <UpcomingPlans />
        <Testimonials />
      </main>

      <Footer />
    </div>
  );
}
