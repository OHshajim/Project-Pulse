import Footer from "@/components/Footer";
import CTASection from "@/components/home/CTASection";
import FeaturesSection from "@/components/home/FeaturesSection";
import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import IntegrationsSection from "@/components/home/IntegrationsSection";
import ShowcaseSection from "@/components/home/ShowcaseSection";
import StatsSection from "@/components/home/StatsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import Navbar from "@/components/Navbar";

export default function Home() {
	return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main>
                <HeroSection />
                <StatsSection />
                <FeaturesSection />
                <ShowcaseSection />
                <IntegrationsSection />
                <TestimonialsSection />
                <HowItWorksSection />
                <CTASection />
            </main>
            <Footer />
        </div>
    );
}
