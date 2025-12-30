import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleField from "@/components/animations/ParticleField";

export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <ParticleField />
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
        </>
    );
}
