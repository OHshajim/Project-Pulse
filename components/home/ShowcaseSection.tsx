"use client"
import { useEffect, useRef, useState } from "react";
import { Check, ArrowUpRight } from "lucide-react";

const features = [
    "Intuitive drag-and-drop interface",
    "Real-time collaboration tools",
    "Advanced analytics dashboard",
    "Custom workflow automation",
];

const ShowcaseSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

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

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <section
            ref={sectionRef}
            className="py-24 bg-background relative overflow-hidden"
        >
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <div
                        className={`transition-all duration-700 ${
                            isVisible
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 -translate-x-12"
                        }`}
                    >
                        <span className="inline-block px-4 py-1.5 bg-success/10 text-success text-sm font-medium rounded-full mb-4">
                            Why Choose Us
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
                            Built for Modern Teams Who
                            <span className="block text-primary">
                                Ship Faster
                            </span>
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                            Experience a new way of managing projects with
                            intelligent automation, seamless collaboration, and
                            powerful insights that help your team deliver
                            exceptional results.
                        </p>

                        {/* Feature list */}
                        <ul className="space-y-4 mb-8">
                            {features.map((feature, index) => (
                                <li
                                    key={index}
                                    className={`flex items-center gap-3 transition-all duration-500 ${
                                        isVisible
                                            ? "opacity-100 translate-x-0"
                                            : "opacity-0 -translate-x-4"
                                    }`}
                                    style={{
                                        transitionDelay: `${
                                            300 + index * 100
                                        }ms`,
                                    }}
                                >
                                    <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                                        <Check className="w-4 h-4 text-success" />
                                    </div>
                                    <span className="text-foreground">
                                        {feature}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        {/* Learn more link */}
                        <a
                            href="#"
                            className="inline-flex items-center gap-2 text-primary font-semibold group"
                        >
                            Learn more about our features
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a>
                    </div>

                    {/* Right - Interactive Card */}
                    <div
                        className={`transition-all duration-700 delay-200 ${
                            isVisible
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 translate-x-12"
                        }`}
                    >
                        <div
                            ref={cardRef}
                            onMouseMove={handleMouseMove}
                            className="relative group"
                        >
                            {/* Glow effect following mouse */}
                            <div
                                className="absolute w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                style={{
                                    left: mousePosition.x - 128,
                                    top: mousePosition.y - 128,
                                }}
                            />

                            {/* Main card */}
                            <div className="relative bg-gradient-to-br from-card via-card to-accent/20 rounded-3xl border border-border/50 p-8 shadow-elevated overflow-hidden">
                                {/* Decorative lines */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full" />
                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-success/10 to-transparent rounded-tr-full" />

                                {/* Mock Dashboard UI */}
                                <div className="relative space-y-6">
                                    {/* Header bar */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                                                <div className="w-5 h-5 rounded bg-primary" />
                                            </div>
                                            <div>
                                                <div className="h-3 w-24 bg-foreground/20 rounded" />
                                                <div className="h-2 w-16 bg-muted-foreground/20 rounded mt-1.5" />
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-muted" />
                                            <div className="w-8 h-8 rounded-lg bg-muted" />
                                        </div>
                                    </div>

                                    {/* Progress bars */}
                                    <div className="space-y-4">
                                        {[85, 60, 45].map((progress, i) => (
                                            <div key={i} className="space-y-2">
                                                <div className="flex justify-between text-xs">
                                                    <div className="h-2 w-20 bg-muted-foreground/20 rounded" />
                                                    <span className="text-muted-foreground">
                                                        {progress}%
                                                    </span>
                                                </div>
                                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full transition-all duration-1000 ease-out ${
                                                            i === 0
                                                                ? "bg-success"
                                                                : i === 1
                                                                ? "bg-primary"
                                                                : "bg-warning"
                                                        }`}
                                                        style={{
                                                            width: isVisible
                                                                ? `${progress}%`
                                                                : "0%",
                                                            transitionDelay: `${
                                                                800 + i * 200
                                                            }ms`,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Cards grid */}
                                    <div className="grid grid-cols-3 gap-3">
                                        {[1, 2, 3].map((i) => (
                                            <div
                                                key={i}
                                                className={`h-20 rounded-xl bg-muted/50 border border-border/30 transition-all duration-500 hover:border-primary/30 hover:bg-accent/30 ${
                                                    isVisible
                                                        ? "opacity-100 scale-100"
                                                        : "opacity-0 scale-90"
                                                }`}
                                                style={{
                                                    transitionDelay: `${
                                                        1200 + i * 100
                                                    }ms`,
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ShowcaseSection;
