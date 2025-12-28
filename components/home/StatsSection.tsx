"use client"
import { useEffect, useRef, useState } from "react";
import { TrendingUp, Clock, Target, Zap } from "lucide-react";

const stats = [
    {
        icon: TrendingUp,
        value: 98,
        suffix: "%",
        label: "Project Success Rate",
        color: "text-success",
    },
    {
        icon: Clock,
        value: 40,
        suffix: "%",
        label: "Time Saved on Average",
        color: "text-primary",
    },
    {
        icon: Target,
        value: 50,
        suffix: "K+",
        label: "Projects Completed",
        color: "text-warning",
    },
    {
        icon: Zap,
        value: 24,
        suffix: "/7",
        label: "Support Available",
        color: "text-critical",
    },
];

const AnimatedCounter = ({
    target,
    suffix,
    isVisible,
}: {
    target: number;
    suffix: string;
    isVisible: boolean;
}) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isVisible) return;

        let start = 0;
        const duration = 2000;
        const increment = target / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [target, isVisible]);

    return (
        <span className="tabular-nums">
            {count}
            {suffix}
        </span>
    );
};

const StatsSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="py-20 relative overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-sidebar via-sidebar/95 to-sidebar" />

            {/* Animated grid pattern */}
            <div className="absolute inset-0 opacity-10">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(hsl(var(--sidebar-primary)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--sidebar-primary)) 1px, transparent 1px)`,
                        backgroundSize: "50px 50px",
                    }}
                />
            </div>

            {/* Glowing orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sidebar-primary/20 rounded-full blur-3xl" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className={`text-center group transition-all duration-700 ${
                                isVisible
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-8"
                            }`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            {/* Icon */}
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-sidebar-accent mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                                <stat.icon
                                    className={`w-8 h-8 ${stat.color}`}
                                />
                            </div>

                            {/* Number */}
                            <div
                                className={`text-4xl md:text-5xl font-bold ${stat.color} mb-2`}
                            >
                                <AnimatedCounter
                                    target={stat.value}
                                    suffix={stat.suffix}
                                    isVisible={isVisible}
                                />
                            </div>

                            {/* Label */}
                            <p className="text-sidebar-foreground/70 text-sm md:text-base">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
