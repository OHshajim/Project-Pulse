"use client"
import {
    BarChart3,
    Shield,
    Users,
    Clock,
    Bell,
    TrendingUp,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const features = [
    {
        icon: BarChart3,
        title: "Real-Time Analytics",
        description:
            "Track project progress with live dashboards and comprehensive reporting tools.",
    },
    {
        icon: Shield,
        title: "Risk Management",
        description:
            "Identify and mitigate risks before they impact your project timeline.",
    },
    {
        icon: Users,
        title: "Team Collaboration",
        description:
            "Seamlessly collaborate with your team members across all project phases.",
    },
    {
        icon: Clock,
        title: "Time Tracking",
        description:
            "Monitor time spent on tasks and optimize resource allocation efficiently.",
    },
    {
        icon: Bell,
        title: "Smart Notifications",
        description:
            "Stay informed with intelligent alerts about project milestones and deadlines.",
    },
    {
        icon: TrendingUp,
        title: "Performance Insights",
        description:
            "Gain actionable insights to continuously improve project delivery.",
    },
];

const FeaturesSection = () => {
    const [visibleCards, setVisibleCards] = useState<number[]>([]);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number(
                            entry.target.getAttribute("data-index")
                        );
                        setVisibleCards((prev) => [
                            ...new Set([...prev, index]),
                        ]);
                    }
                });
            },
            { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
        );

        const cards = sectionRef.current?.querySelectorAll(".feature-card");
        cards?.forEach((card) => observer.observe(card));

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 bg-secondary/30">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Everything You Need to Succeed
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Powerful features designed to help you manage projects
                        efficiently and deliver outstanding results.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            data-index={index}
                            className={`feature-card group p-8 bg-card rounded-xl border border-border/50 shadow-soft hover:shadow-elevated transition-all duration-500 hover:-translate-y-1 ${
                                visibleCards.includes(index)
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-8"
                            }`}
                            style={{
                                transitionDelay: visibleCards.includes(index)
                                    ? `${index * 100}ms`
                                    : "0ms",
                            }}
                        >
                            <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                                <feature.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
