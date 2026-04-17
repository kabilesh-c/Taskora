import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { StatsBar } from '@/components/landing/StatsBar';
import { Features } from '@/components/landing/Features';
import { ProductPreview } from '@/components/landing/ProductPreview';
import { OnboardingPreview } from '@/components/landing/OnboardingPreview';
import { Testimonials } from '@/components/landing/Testimonials';
import { CTASection } from '@/components/landing/CTASection';
import { Footer } from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/30 selection:text-primary-900">
      <Navbar />
      
      <main>
        <Hero />
        <StatsBar />
        <Features />
        <ProductPreview />
        <OnboardingPreview />
        <Testimonials />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
