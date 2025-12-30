import CTASection from "@/components/home/CTASection";
import FeaturesSection from "@/components/home/FeaturesSection";
import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import IntegrationsSection from "@/components/home/IntegrationsSection";
import ShowcaseSection from "@/components/home/ShowcaseSection";
import StatsSection from "@/components/home/StatsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";

export default function Home() {
	return (
        <main className="min-h-screen bg-background">
            <HeroSection />
            <StatsSection />
            <FeaturesSection />
            <ShowcaseSection />
            <IntegrationsSection />
            <TestimonialsSection />
            <HowItWorksSection />
            <CTASection />
        </main>
    );
}
