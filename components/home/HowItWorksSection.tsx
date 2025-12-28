"use client"
import { useEffect, useRef, useState } from "react";
import { ClipboardList, Settings, Rocket } from "lucide-react";

const steps = [
    {
        icon: ClipboardList,
        step: "01",
        title: "Create Your Project",
        description:
            "Set up your project in minutes with our intuitive wizard. Define goals, timelines, and team roles.",
    },
    {
        icon: Settings,
        step: "02",
        title: "Configure & Customize",
        description:
            "Tailor workflows to your needs. Set up automations, notifications, and integrate your favorite tools.",
    },
    {
        icon: Rocket,
        step: "03",
        title: "Launch & Track",
        description:
            "Go live and monitor progress in real-time. Get insights, manage risks, and celebrate milestones.",
    },
];

const HowItWorksSection = () => {
    const [activeStep, setActiveStep] = useState(-1);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number(
                            entry.target.getAttribute("data-step")
                        );
                        setActiveStep((prev) => Math.max(prev, index));
                    }
                });
            },
            { threshold: 0.5 }
        );

        const stepElements = sectionRef.current?.querySelectorAll(".step-item");
        stepElements?.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 bg-background">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        How It Works
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Get started in three simple steps and transform how you
                        manage projects.
                    </p>
                </div>

                {/* Steps */}
                <div className="relative max-w-4xl mx-auto">
                    {/* Connecting Line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 hidden md:block" />

                    {steps.map((item, index) => (
                        <div
                            key={index}
                            data-step={index}
                            className={`step-item relative flex items-center gap-8 mb-16 last:mb-0 transition-all duration-700 ${
                                activeStep >= index
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 translate-x-8"
                            } ${
                                index % 2 === 0
                                    ? "md:flex-row"
                                    : "md:flex-row-reverse"
                            }`}
                            style={{ transitionDelay: `${index * 200}ms` }}
                        >
                            {/* Step Number Circle */}
                            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10">
                                <div
                                    className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-500 ${
                                        activeStep >= index
                                            ? "bg-primary text-primary-foreground scale-100"
                                            : "bg-muted text-muted-foreground scale-90"
                                    }`}
                                >
                                    {item.step}
                                </div>
                            </div>

                            {/* Content Card */}
                            <div
                                className={`flex-1 p-8 bg-card rounded-2xl border border-border/50 shadow-soft transition-all duration-500 hover:shadow-elevated ${
                                    index % 2 === 0
                                        ? "md:mr-auto md:pr-20"
                                        : "md:ml-auto md:pl-20"
                                } md:w-5/12`}
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div
                                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
                                            activeStep >= index
                                                ? "bg-primary"
                                                : "bg-muted"
                                        }`}
                                    >
                                        <item.icon
                                            className={`w-6 h-6 transition-colors ${
                                                activeStep >= index
                                                    ? "text-primary-foreground"
                                                    : "text-muted-foreground"
                                            }`}
                                        />
                                    </div>
                                    <span className="md:hidden text-sm font-semibold text-primary">
                                        Step {item.step}
                                    </span>
                                </div>
                                <h3 className="text-xl font-semibold text-foreground mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
