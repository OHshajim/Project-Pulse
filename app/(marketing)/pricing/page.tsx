import GradientText from "@/components/animations/GradientText";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Sparkles, Zap, Crown, ArrowRight } from "lucide-react";
import Link from "next/link";

const plans = [
    {
        name: "Starter",
        price: 0,
        period: "forever",
        description: "Perfect for individuals and small projects",
        icon: Zap,
        features: [
            "Up to 3 projects",
            "Basic analytics",
            "5 team members",
            "Email support",
            "1GB storage",
        ],
        cta: "Get Started Free",
        popular: false,
    },
    {
        name: "Professional",
        price: 29,
        period: "per month",
        description: "Best for growing teams and businesses",
        icon: Sparkles,
        features: [
            "Unlimited projects",
            "Advanced analytics",
            "25 team members",
            "Priority support",
            "50GB storage",
            "Custom integrations",
            "API access",
        ],
        cta: "Start Free Trial",
        popular: true,
    },
    {
        name: "Enterprise",
        price: 99,
        period: "per month",
        description: "For large organizations with custom needs",
        icon: Crown,
        features: [
            "Everything in Pro",
            "Unlimited team members",
            "Dedicated support",
            "Custom contracts",
            "Unlimited storage",
            "SSO & SAML",
            "Advanced security",
            "Custom training",
        ],
        cta: "Contact Sales",
        popular: false,
    },
];

const faqs = [
    {
        question: "Can I change plans later?",
        answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.",
    },
    {
        question: "Is there a free trial?",
        answer: "Yes! We offer a 14-day free trial on all paid plans. No credit card required.",
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards, PayPal, and wire transfers for enterprise customers.",
    },
    {
        question: "Can I cancel anytime?",
        answer: "Absolutely. Cancel your subscription at any time with no hidden fees or penalties.",
    },
];

const Pricing = () => {
    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            <main className="relative z-10">
                {/* Hero Section */}
                <section className="pt-32 pb-20 px-6">
                    <div className="container mx-auto text-center">
                        <ScrollReveal>
                            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                                Simple, Transparent Pricing
                            </span>
                        </ScrollReveal>

                        <ScrollReveal delay={0.1}>
                            <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                Choose the perfect plan for{" "}
                                <GradientText animate>your team</GradientText>
                            </h1>
                        </ScrollReveal>

                        <ScrollReveal delay={0.2}>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                Start free and scale as you grow. No hidden
                                fees, no surprises.
                            </p>
                        </ScrollReveal>
                    </div>
                </section>

                {/* Pricing Cards */}
                <section className="py-20 px-6">
                    <div className="container mx-auto">
                        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {plans.map((plan, index) => (
                                <ScrollReveal
                                    key={plan.name}
                                    delay={index * 0.15}
                                    direction="scale"
                                >
                                    <Card
                                        className={`relative p-8 h-full flex flex-col transition-all duration-500 hover:-translate-y-2 ${
                                            plan.popular
                                                ? "border-primary shadow-lg shadow-primary/20 scale-105"
                                                : "hover:border-primary/50"
                                        }`}
                                    >
                                        {plan.popular && (
                                            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                                <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                                                    Most Popular
                                                </span>
                                            </div>
                                        )}

                                        <div className="mb-6">
                                            <div
                                                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                                                    plan.popular
                                                        ? "bg-primary text-primary-foreground"
                                                        : "bg-primary/10 text-primary"
                                                }`}
                                            >
                                                <plan.icon className="w-6 h-6" />
                                            </div>

                                            <h3 className="text-2xl font-bold mb-2">
                                                {plan.name}
                                            </h3>
                                            <p className="text-muted-foreground text-sm">
                                                {plan.description}
                                            </p>
                                        </div>

                                        <div className="mb-6">
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-4xl font-bold">
                                                    ${plan.price}
                                                </span>
                                                <span className="text-muted-foreground">
                                                    /{plan.period}
                                                </span>
                                            </div>
                                        </div>

                                        <ul className="space-y-3 mb-8 flex-grow">
                                            {plan.features.map((feature) => (
                                                <li
                                                    key={feature}
                                                    className="flex items-center gap-3"
                                                >
                                                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                                                    <span className="text-sm">
                                                        {feature}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>

                                        <Button
                                            asChild
                                            className={`w-full ${
                                                plan.popular
                                                    ? ""
                                                    : "variant-outline"
                                            }`}
                                            variant={
                                                plan.popular
                                                    ? "default"
                                                    : "outline"
                                            }
                                        >
                                            <Link
                                                href="/signup"
                                                className="flex items-center justify-center gap-2"
                                            >
                                                {plan.cta}
                                                <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        </Button>
                                    </Card>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-20 px-6 bg-muted/30">
                    <div className="container mx-auto max-w-4xl">
                        <ScrollReveal>
                            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                                Frequently Asked Questions
                            </h2>
                        </ScrollReveal>

                        <div className="grid md:grid-cols-2 gap-6">
                            {faqs.map((faq, index) => (
                                <ScrollReveal
                                    key={faq.question}
                                    delay={index * 0.1}
                                >
                                    <Card className="p-6 hover:shadow-lg transition-shadow">
                                        <h4 className="font-semibold mb-2">
                                            {faq.question}
                                        </h4>
                                        <p className="text-muted-foreground text-sm">
                                            {faq.answer}
                                        </p>
                                    </Card>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-6">
                    <div className="container mx-auto text-center">
                        <ScrollReveal>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                Ready to get started?
                            </h2>
                            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                                Join thousands of teams already using
                                ProjectFlow to deliver projects on time.
                            </p>
                            <Button
                                asChild
                                size="lg"
                                className="shadow-lg shadow-primary/25"
                            >
                                <Link href="/signup">Start Your Free Trial</Link>
                            </Button>
                        </ScrollReveal>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Pricing;
