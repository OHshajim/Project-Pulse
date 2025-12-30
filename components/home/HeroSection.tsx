"use client"
import { Button } from "@/components/ui/button";
import {
    ArrowRight,
    Shield,
    BarChart3,
    Users,
    Sparkles,
    Play,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const HeroSection = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 20,
                y: (e.clientY / window.innerHeight) * 20,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-accent/20">
            {/* Animated background grid */}
            <div className="absolute inset-0 opacity-[0.03]">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
                        backgroundSize: "40px 40px",
                    }}
                />
            </div>

            {/* Floating orbs with parallax */}
            <div
                className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl"
                style={{
                    transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
                }}
            />
            <div
                className="absolute top-1/3 -left-32 w-[400px] h-[400px] bg-success/10 rounded-full blur-3xl"
                style={{
                    transform: `translate(${-mousePosition.x * 0.5}px, ${
                        mousePosition.y * 0.5
                    }px)`,
                }}
            />
            <div
                className="absolute -bottom-40 left-1/3 w-[600px] h-[600px] bg-accent/40 rounded-full blur-3xl"
                style={{
                    transform: `translate(${mousePosition.x * 0.3}px, ${
                        -mousePosition.y * 0.3
                    }px)`,
                }}
            />

            {/* Gradient line decorations */}
            <div className="absolute top-20 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            <div className="container mx-auto px-6 relative z-10 pt-20">
                <div className="max-w-5xl mx-auto text-center">
                    {/* Animated Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 via-accent to-primary/10 rounded-full border border-primary/20 mb-8 animate-fade-in group cursor-pointer hover:border-primary/40 transition-colors">
                        <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                        <span className="text-sm font-medium text-foreground">
                            Now with AI-Powered Insights
                        </span>
                        <ArrowRight className="w-3 h-3 text-primary group-hover:translate-x-1 transition-transform" />
                    </div>

                    {/* Main headline with gradient */}
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 animate-slide-up">
                        <span className="text-foreground">Manage Projects</span>
                        <br />
                        <span className="bg-gradient-to-r from-primary via-success to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]">
                            Like Never Before
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p
                        className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-slide-up leading-relaxed"
                        style={{ animationDelay: "0.1s" }}
                    >
                        The all-in-one platform that helps teams plan, track,
                        and deliver
                        <span className="text-foreground font-medium">
                            {" "}
                            exceptional results
                        </span>
                        .
                    </p>

                    {/* CTA Buttons */}
                    <div
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up"
                        style={{ animationDelay: "0.2s" }}
                    >
                        <Button
                            asChild
                            size="lg"
                            className="px-8 py-7 text-lg font-semibold shadow-elevated hover:shadow-lg transition-all duration-300 hover:scale-105 group relative overflow-hidden"
                        >
                            <Link href="/signup">
                                <span className="relative z-10 flex items-center">
                                    Start Free Trial
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-primary to-success opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="px-8 py-7 text-lg font-semibold hover:bg-accent group border-2 transition-all duration-300"
                        >
                            <Link
                                href="/resources"
                                className="flex items-center gap-2"
                            >
                                <Play className="w-5 h-5 text-primary" />
                                Watch Demo
                            </Link>
                        </Button>
                    </div>

                    {/* Trust badges */}
                    <div
                        className="mt-16 animate-fade-in"
                        style={{ animationDelay: "0.4s" }}
                    >
                        <p className="text-sm text-muted-foreground mb-6">
                            Trusted by teams at
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-8 opacity-50">
                            {[
                                "Microsoft",
                                "Google",
                                "Meta",
                                "Amazon",
                                "Apple",
                            ].map((company) => (
                                <div
                                    key={company}
                                    className="text-lg font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-default"
                                >
                                    {company}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Animated Stats Cards */}
                    <div
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 animate-slide-up"
                        style={{ animationDelay: "0.5s" }}
                    >
                        {[
                            {
                                icon: Users,
                                value: "10K+",
                                label: "Active Teams",
                                color: "from-primary/20 to-primary/5",
                            },
                            {
                                icon: BarChart3,
                                value: "50K+",
                                label: "Projects Delivered",
                                color: "from-success/20 to-success/5",
                            },
                            {
                                icon: Shield,
                                value: "99.9%",
                                label: "Uptime SLA",
                                color: "from-warning/20 to-warning/5",
                            },
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className={`group relative p-6 rounded-2xl bg-gradient-to-br ${stat.color} border border-border/30 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated`}
                            >
                                <div className="flex items-center justify-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-card flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <stat.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-2xl font-bold text-foreground">
                                            {stat.value}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {stat.label}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
