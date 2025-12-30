import GradientText from "@/components/animations/GradientText";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    FileText,
    Video,
    Users,
    BookOpen,
    ArrowRight,
    Play,
    Download,
    ExternalLink,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const resourceCategories = [
    {
        icon: FileText,
        title: "Documentation",
        description: "Comprehensive guides and API references",
        count: "50+ articles",
        color: "primary",
    },
    {
        icon: Video,
        title: "Video Tutorials",
        description: "Step-by-step video walkthroughs",
        count: "30+ videos",
        color: "success",
    },
    {
        icon: Users,
        title: "Community",
        description: "Connect with other ProjectFlow users",
        count: "10K+ members",
        color: "warning",
    },
    {
        icon: BookOpen,
        title: "Blog",
        description: "Tips, tricks, and industry insights",
        count: "Weekly posts",
        color: "primary",
    },
];

const featuredGuides = [
    {
        title: "Getting Started with ProjectFlow",
        description:
            "Learn the basics and set up your first project in under 10 minutes.",
        type: "Guide",
        duration: "10 min read",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    },
    {
        title: "Advanced Project Templates",
        description: "Create reusable templates to speed up your workflow.",
        type: "Tutorial",
        duration: "15 min read",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
    },
    {
        title: "Team Collaboration Best Practices",
        description: "Tips for maximizing team productivity with ProjectFlow.",
        type: "Best Practices",
        duration: "8 min read",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop",
    },
];

const videos = [
    {
        title: "ProjectFlow Complete Overview",
        duration: "12:34",
        thumbnail:
            "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&h=340&fit=crop",
    },
    {
        title: "Setting Up Your First Project",
        duration: "8:45",
        thumbnail:
            "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=340&fit=crop",
    },
    {
        title: "Advanced Reporting Features",
        duration: "15:22",
        thumbnail:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=340&fit=crop",
    },
];

const downloads = [
    { title: "ProjectFlow for Windows", size: "85 MB", icon: Download },
    { title: "ProjectFlow for macOS", size: "92 MB", icon: Download },
    { title: "Mobile App (iOS/Android)", size: "45 MB", icon: ExternalLink },
    { title: "Browser Extension", size: "2 MB", icon: Download },
];

const Resources = () => {
    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            <main className="relative z-10">
                {/* Hero Section */}
                <section className="pt-32 pb-20 px-6">
                    <div className="container mx-auto text-center">
                        <ScrollReveal>
                            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                                Resources & Learning
                            </span>
                        </ScrollReveal>

                        <ScrollReveal delay={0.1}>
                            <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                Everything you need to{" "}
                                <GradientText animate>
                                    master ProjectFlow
                                </GradientText>
                            </h1>
                        </ScrollReveal>

                        <ScrollReveal delay={0.2}>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                Guides, tutorials, videos, and downloads to help
                                you get the most out of our platform.
                            </p>
                        </ScrollReveal>
                    </div>
                </section>

                {/* Resource Categories */}
                <section className="py-12 px-6">
                    <div className="container mx-auto">
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {resourceCategories.map((category, index) => (
                                <ScrollReveal
                                    key={category.title}
                                    delay={index * 0.1}
                                >
                                    <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                                        <div
                                            className={`w-12 h-12 bg-${category.color}/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                                        >
                                            <category.icon
                                                className={`w-6 h-6 text-${category.color}`}
                                            />
                                        </div>
                                        <h3 className="font-semibold text-lg mb-1">
                                            {category.title}
                                        </h3>
                                        <p className="text-muted-foreground text-sm mb-3">
                                            {category.description}
                                        </p>
                                        <span className="text-primary text-sm font-medium">
                                            {category.count}
                                        </span>
                                    </Card>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured Guides */}
                <section className="py-20 px-6 bg-muted/30">
                    <div className="container mx-auto">
                        <ScrollReveal>
                            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                                Featured Guides
                            </h2>
                            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                                Our most popular resources to help you succeed
                            </p>
                        </ScrollReveal>

                        <div className="grid md:grid-cols-3 gap-8">
                            {featuredGuides.map((guide, index) => (
                                <ScrollReveal
                                    key={guide.title}
                                    delay={index * 0.15}
                                    direction="scale"
                                >
                                    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer">
                                        <div className="aspect-video overflow-hidden">
                                            <Image
                                                width={500}
                                                height={500}
                                                loading="lazy"
                                                src={guide.image}
                                                alt={guide.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                                                    {guide.type}
                                                </span>
                                                <span className="text-muted-foreground text-xs">
                                                    {guide.duration}
                                                </span>
                                            </div>
                                            <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                                                {guide.title}
                                            </h3>
                                            <p className="text-muted-foreground text-sm">
                                                {guide.description}
                                            </p>
                                        </div>
                                    </Card>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Video Tutorials */}
                <section className="py-20 px-6">
                    <div className="container mx-auto">
                        <ScrollReveal>
                            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                                Video Tutorials
                            </h2>
                            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                                Learn visually with our step-by-step video
                                guides
                            </p>
                        </ScrollReveal>

                        <div className="grid md:grid-cols-3 gap-8">
                            {videos.map((video, index) => (
                                <ScrollReveal
                                    key={video.title}
                                    delay={index * 0.15}
                                >
                                    <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300">
                                        <div className="aspect-video relative overflow-hidden">
                                            <Image
                                                width={500}
                                                height={500}
                                                loading="lazy"
                                                src={video.thumbnail}
                                                alt={video.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/50">
                                                    <Play className="w-6 h-6 text-primary-foreground ml-1" />
                                                </div>
                                            </div>
                                            <span className="absolute bottom-2 right-2 px-2 py-1 bg-foreground/80 text-background text-xs rounded">
                                                {video.duration}
                                            </span>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold group-hover:text-primary transition-colors">
                                                {video.title}
                                            </h3>
                                        </div>
                                    </Card>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Downloads */}
                <section className="py-20 px-6 bg-muted/30">
                    <div className="container mx-auto max-w-4xl">
                        <ScrollReveal>
                            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                                Downloads
                            </h2>
                            <p className="text-muted-foreground text-center mb-12">
                                Get ProjectFlow on all your devices
                            </p>
                        </ScrollReveal>

                        <div className="grid md:grid-cols-2 gap-4">
                            {downloads.map((item, index) => (
                                <ScrollReveal
                                    key={item.title}
                                    delay={index * 0.1}
                                >
                                    <Card className="p-4 flex-row flex items-center justify-between hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary transition-colors">
                                                <item.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium">
                                                    {item.title}
                                                </h4>
                                                <p className="text-muted-foreground text-sm">
                                                    {item.size}
                                                </p>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </Card>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 px-6">
                    <div className="container mx-auto text-center">
                        <ScrollReveal>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                Need more help?
                            </h2>
                            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                                Our support team is always ready to assist you
                                with any questions.
                            </p>
                            <Button
                                asChild
                                size="lg"
                                className="shadow-lg shadow-primary/25"
                            >
                                <Link href="/contact">Contact Support</Link>
                            </Button>
                        </ScrollReveal>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Resources;
