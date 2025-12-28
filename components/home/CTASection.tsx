import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const benefits = [
    "Free 14-day trial",
    "No credit card required",
    "Cancel anytime",
];

const CTASection = () => {
    return (
        <section className="py-24 bg-gradient-to-br from-primary/5 via-accent/30 to-background relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                        Ready to Transform Your Project Management?
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground mb-8">
                        Join thousands of teams already using our platform to
                        deliver projects on time and within budget.
                    </p>

                    {/* Benefits */}
                    <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 text-sm text-muted-foreground"
                            >
                                <CheckCircle2 className="w-5 h-5 text-success" />
                                <span>{benefit}</span>
                            </div>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <Button
                        asChild
                        size="lg"
                        className="px-10 py-7 text-lg font-semibold shadow-elevated hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                        <Link href="/signup">
                            Start Your Free Trial
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
