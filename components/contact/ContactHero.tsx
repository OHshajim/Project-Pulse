import GradientText from "@/components/animations/GradientText";
import ScrollReveal from "../animations/ScrollReveal";

const ContactHero = () => {
    return (
        <section className="pt-32 pb-20 px-6">
            <div className="container mx-auto text-center">
                <ScrollReveal>
                    <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                        Get in Touch
                    </span>
                </ScrollReveal>

                <ScrollReveal delay={0.1}>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        {`We'd love to `}
                        <GradientText animate>hear from you</GradientText>
                    </h1>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        {` Have questions about ProjectFlow? Want to
                                schedule a demo? We're here to help.`}
                    </p>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default ContactHero;