import GlowingOrb from "@/components/animations/GlowingOrb";
import ContactForm from "@/components/contact/ContactForm";
import ContactHero from "@/components/contact/ContactHero";
import ContactMethod from "@/components/contact/ContactMethod";


const Contact = () => {

    return (
        <div className="min-h-screen bg-background relative ">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <GlowingOrb
                    position={{ x: 20, y: 30 }}
                    size={400}
                    color="primary"
                    intensity={0.3}
                />
                <GlowingOrb
                    position={{ x: 80, y: 70 }}
                    size={300}
                    color="success"
                    intensity={0.2}
                />
            </div>
            <main className="relative z-10">
                {/* Hero Section */}
                <ContactHero/>

                {/* Contact Methods */}
                <ContactMethod/>

                {/* Contact Form Section */}
                <ContactForm/>
            </main>
        </div>
    );
};

export default Contact;
