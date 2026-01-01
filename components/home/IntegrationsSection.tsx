"use client"
import { useEffect, useRef, useState } from "react";
import {
    Slack,
    Github,
    Figma,
    Trello,
    Chrome,
    Cloud,
    Database,
    Mail,
} from "lucide-react";

const integrations = [
    { icon: Slack, name: "Slack", delay: 0 },
    { icon: Github, name: "GitHub", delay: 100 },
    { icon: Figma, name: "Figma", delay: 200 },
    { icon: Trello, name: "Trello", delay: 300 },
    { icon: Chrome, name: "Chrome", delay: 400 },
    { icon: Cloud, name: "Cloud", delay: 500 },
    { icon: Database, name: "Database", delay: 600 },
    { icon: Mail, name: "Email", delay: 700 },
];

const IntegrationsSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="py-24 bg-secondary/20 relative overflow-hidden"
        >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            <div className="container mx-auto px-6">
                {/* Header */}
                <div
                    className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
                        isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-8"
                    }`}
                >
                    <span className="inline-block px-4 py-1.5 bg-accent text-accent-foreground text-sm font-medium rounded-full mb-4">
                        Integrations
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Connect Your Favorite Tools
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Seamlessly integrate with the tools you already use and
                        love.
                    </p>
                </div>

                {/* Integration Icons - Floating Grid */}
                <div className="flex flex-wrap justify-center gap-6 mx-auto px-4">
                    {integrations.map((item, index) => (
                        <div
                            key={index}
                            className={`group relative transition-all duration-700 ${
                                isVisible
                                    ? "opacity-100 scale-100"
                                    : "opacity-0 scale-50"
                            }`}
                            style={{ transitionDelay: `${item.delay}ms` }}
                        >
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-card border border-border/50 shadow-soft flex items-center justify-center group-hover:shadow-elevated group-hover:border-primary/30 group-hover:-translate-y-2 transition-all duration-300">
                                <item.icon className="w-8 h-8 md:w-10 md:h-10 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>

                            {/* Tooltip */}
                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                                    {item.name}
                                </span>
                            </div>

                            {/* Glow effect on hover */}
                            <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                        </div>
                    ))}
                </div>

                {/* Plus more text */}
                <p
                    className={`text-center text-muted-foreground mt-16 transition-all duration-700 delay-500 ${
                        isVisible ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <span className="text-primary font-semibold">+50 more</span>{" "}
                    integrations available
                </p>
            </div>
        </section>
    );
};

export default IntegrationsSection;
