import GradientText from "@/components/animations/GradientText";
import ParticleField from "@/components/animations/ParticleField";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Target,
    Users,
    Rocket,
    Award,
    Linkedin,
    Twitter,
    Globe,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const values = [
    {
        icon: Target,
        title: "Mission-Driven",
        description:
            "We believe every team deserves powerful tools to achieve their goals.",
    },
    {
        icon: Users,
        title: "Customer-First",
        description:
            "Your success is our success. We build what you need, not what we think you need.",
    },
    {
        icon: Rocket,
        title: "Innovation",
        description:
            "We constantly push boundaries to deliver cutting-edge project management solutions.",
    },
    {
        icon: Award,
        title: "Excellence",
        description:
            "We hold ourselves to the highest standards in everything we do.",
    },
];

const team = [
    {
        name: "Sarah Chen",
        role: "CEO & Co-Founder",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
        bio: "Former PM at Google with 15+ years in tech.",
    },
    {
        name: "Marcus Johnson",
        role: "CTO & Co-Founder",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        bio: "Ex-engineering lead at Stripe and Meta.",
    },
    {
        name: "Emily Rodriguez",
        role: "Head of Product",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
        bio: "Product veteran from Asana and Notion.",
    },
    {
        name: "David Kim",
        role: "Head of Design",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
        bio: "Award-winning designer, ex-Apple.",
    },
];

const milestones = [
    { year: "2019", event: "Founded in San Francisco" },
    { year: "2020", event: "Launched v1.0, 1K users" },
    { year: "2021", event: "Series A, 50K users" },
    { year: "2022", event: "Global expansion, 200K users" },
    { year: "2023", event: "Enterprise launch, 500K+ users" },
    { year: "2024", event: "AI features, industry leader" },
];

const About = () => {
    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            <ParticleField />

            <main className="relative z-10">
                {/* Hero Section */}
                <section className="pt-32 pb-20 px-6">
                    <div className="container mx-auto text-center">
                        <ScrollReveal>
                            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                                Our Story
                            </span>
                        </ScrollReveal>

                        <ScrollReveal delay={0.1}>
                            <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                Building the future of{" "}
                                <GradientText animate>
                                    project management
                                </GradientText>
                            </h1>
                        </ScrollReveal>

                        <ScrollReveal delay={0.2}>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                                {` We started ProjectFlow with a simple belief:
                                project management shouldn't be painful. Today,
                                we're helping over 500,000 teams worldwide
                                deliver their best work.`}
                            </p>
                        </ScrollReveal>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-20 px-6 bg-muted/30">
                    <div className="container mx-auto">
                        <ScrollReveal>
                            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                                Our Values
                            </h2>
                            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                                The principles that guide everything we do
                            </p>
                        </ScrollReveal>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {values.map((value, index) => (
                                <ScrollReveal
                                    key={value.title}
                                    delay={index * 0.1}
                                >
                                    <Card className="p-6 text-center h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                                        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                            <value.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground" />
                                        </div>
                                        <h3 className="text-xl font-semibold mb-2">
                                            {value.title}
                                        </h3>
                                        <p className="text-muted-foreground text-sm">
                                            {value.description}
                                        </p>
                                    </Card>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Timeline Section */}
                <section className="py-20 px-6">
                    <div className="container mx-auto max-w-4xl">
                        <ScrollReveal>
                            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                                Our Journey
                            </h2>
                        </ScrollReveal>

                        <div className="relative">
                            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />

                            {milestones.map((milestone, index) => (
                                <ScrollReveal
                                    key={milestone.year}
                                    delay={index * 0.1}
                                    direction={
                                        index % 2 === 0 ? "left" : "right"
                                    }
                                >
                                    <div
                                        className={`relative flex items-center mb-8 ${
                                            index % 2 === 0
                                                ? "justify-start"
                                                : "justify-end"
                                        }`}
                                    >
                                        <div
                                            className={`w-5/12 ${
                                                index % 2 === 0
                                                    ? "text-right pr-8"
                                                    : "text-left pl-8 order-2"
                                            }`}
                                        >
                                            <Card className="p-4 inline-block hover:shadow-lg transition-shadow">
                                                <span className="text-primary font-bold text-lg">
                                                    {milestone.year}
                                                </span>
                                                <p className="text-foreground">
                                                    {milestone.event}
                                                </p>
                                            </Card>
                                        </div>
                                        <div className="absolute left-1/2 w-4 h-4 bg-primary rounded-full -translate-x-1/2 shadow-lg shadow-primary/50" />
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="py-20 px-6 bg-muted/30">
                    <div className="container mx-auto">
                        <ScrollReveal>
                            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                                Meet Our Team
                            </h2>
                            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                                The passionate people behind ProjectFlow
                            </p>
                        </ScrollReveal>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                            {team.map((member, index) => (
                                <ScrollReveal
                                    key={member.name}
                                    delay={index * 0.1}
                                    direction="scale"
                                >
                                    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                                        <div className="aspect-square overflow-hidden">
                                            <Image
                                                height={500}
                                                width={500}
                                                src={member.image}
                                                alt={member.name}
                                                loading="lazy"
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-5">
                                            <h3 className="font-semibold text-lg">
                                                {member.name}
                                            </h3>
                                            <p className="text-primary text-sm mb-2">
                                                {member.role}
                                            </p>
                                            <p className="text-muted-foreground text-sm mb-4">
                                                {member.bio}
                                            </p>
                                            <div className="flex gap-3 text-muted-foreground hover:text-primary transition-colors">
                                                    <Linkedin className="w-5 h-5" />
                                                    <Twitter className="w-5 h-5" />
                                                    <Globe className="w-5 h-5" />
                                            </div>
                                        </div>
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
                                Join our growing team
                            </h2>
                            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                                {`We're always looking for talented people to help
                                us build the future.`}
                            </p>
                            <div className="flex gap-4 justify-center">
                                <Button
                                    asChild
                                    size="lg"
                                    className="shadow-lg shadow-primary/25"
                                >
                                    <Link href="/contact">Get in Touch</Link>
                                </Button>
                                <Button asChild size="lg" variant="outline">
                                    <a href="#careers">View Careers</a>
                                </Button>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default About;
