"use client"
import { useEffect, useRef, useState } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
    {
        name: "Sarah Chen",
        role: "Product Manager",
        company: "TechFlow Inc.",
        avatar: "SC",
        rating: 5,
        text: "This platform completely transformed how we manage projects. The real-time insights are game-changing.",
        gradient: "from-primary/20 to-accent",
    },
    {
        name: "Marcus Johnson",
        role: "Engineering Lead",
        company: "InnovateLabs",
        avatar: "MJ",
        rating: 5,
        text: "Finally, a tool that our entire team actually enjoys using. The collaboration features are unmatched.",
        gradient: "from-success/20 to-primary/20",
    },
    {
        name: "Emily Rodriguez",
        role: "Operations Director",
        company: "ScaleUp Co.",
        avatar: "ER",
        rating: 5,
        text: "We reduced project delays by 60% in just three months. The ROI speaks for itself.",
        gradient: "from-warning/20 to-success/20",
    },
];

const TestimonialsSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);
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

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section
            ref={sectionRef}
            className="py-24 bg-background relative overflow-hidden"
        >
            {/* Floating orbs */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse-subtle" />
            <div
                className="absolute bottom-20 right-10 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse-subtle"
                style={{ animationDelay: "2s" }}
            />

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div
                    className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
                        isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-8"
                    }`}
                >
                    <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                        Testimonials
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Loved by Teams Worldwide
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        See what our customers have to say about their
                        experience.
                    </p>
                </div>

                {/* Testimonials Cards */}
                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className={`group relative p-8 rounded-2xl border border-border/50 bg-gradient-to-br ${
                                testimonial.gradient
                            } backdrop-blur-sm transition-all duration-700 hover:scale-105 hover:shadow-elevated ${
                                isVisible
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-12"
                            } ${
                                activeIndex === index
                                    ? "ring-2 ring-primary/50 shadow-lg"
                                    : ""
                            }`}
                            style={{ transitionDelay: `${index * 150}ms` }}
                            onMouseEnter={() => setActiveIndex(index)}
                        >
                            {/* Quote Icon */}
                            <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/20 group-hover:text-primary/40 transition-colors" />

                            {/* Rating */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-4 h-4 fill-warning text-warning"
                                    />
                                ))}
                            </div>

                            {/* Text */}
                            <p className="text-foreground/90 mb-6 leading-relaxed italic">
                                {`"${testimonial.text}"`}
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <p className="font-semibold text-foreground">
                                        {testimonial.name}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {testimonial.role} ·{" "}
                                        {testimonial.company}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Dots indicator */}
                <div className="flex justify-center gap-2 mt-8">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                                activeIndex === index
                                    ? "bg-primary w-8"
                                    : "bg-border hover:bg-primary/50"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
