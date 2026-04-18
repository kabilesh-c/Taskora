import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { DarkFeatureBlock } from '@/components/landing/DarkFeatureBlock';
import { StatsBar } from '@/components/landing/StatsBar';
import { FeatureCardsGrid } from '@/components/landing/FeatureCardsGrid';
import { Features } from '@/components/landing/Features';
import { UpcomingPlans } from '@/components/landing/UpcomingPlans';
import { Testimonials } from '@/components/landing/Testimonials';
import { Footer } from '@/components/landing/Footer';
import TargetCursor from '@/components/ui/TargetCursor';
import Waves from '@/components/ui/Waves';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bordup-bg font-sans selection:bg-purple-200 selection:text-purple-900 overflow-x-hidden relative">
      <TargetCursor 
        targetSelector=".cursor-target" 
        spinDuration={2} 
        hideDefaultCursor={true} 
        hoverDuration={0.2} 
        parallaxOn={true} 
      />
      
      {/* Full-Page Waves Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <Waves
          lineColor="#717070"
          backgroundColor="transparent"
          waveSpeedX={0.0125}
          waveSpeedY={0.01}
          waveAmpX={40}
          waveAmpY={20}
          friction={0.9}
          tension={0.01}
          maxCursorMove={120}
          xGap={18}
          yGap={48}
          className="opacity-60"
        />
      </div>

      <div className="relative z-10">
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
    </div>
  );
}
