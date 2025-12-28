"use client"
import ScrollReveal from "../animations/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Send,
    MessageSquare,
    Clock,
    CheckCircle,
} from "lucide-react";
import { useState } from "react";
const ContactForm = () => {
        const [formData, setFormData] = useState({
            name: "",
            email: "",
            company: "",
            subject: "",
            message: "",
        });
        const [isSubmitting, setIsSubmitting] = useState(false);
        const [isSubmitted, setIsSubmitted] = useState(false);

        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            setIsSubmitting(true);

            // Simulate form submission
            await new Promise((resolve) => setTimeout(resolve, 1500));

            setIsSubmitting(false);
            setIsSubmitted(true);
            // toast.success("Message sent successfully!", {
            //     description: "We'll get back to you within 24 hours.",
            // });

            // Reset form after delay
            setTimeout(() => {
                setFormData({
                    name: "",
                    email: "",
                    company: "",
                    subject: "",
                    message: "",
                });
                setIsSubmitted(false);
            }, 3000);
        };

        const handleChange = (
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
            setFormData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
            }));
        };
    return (
        <section className="py-20 px-6">
            <div className="container mx-auto max-w-6xl">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left - Info */}
                    <ScrollReveal direction="left">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                Send us a message
                            </h2>
                            <p className="text-muted-foreground mb-8">
                                {`Fill out the form and our team will get
                                        back to you within 24 hours. We're
                                        excited to learn about your project.`}
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <MessageSquare className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">
                                            Quick Response
                                        </h4>
                                        <p className="text-muted-foreground text-sm">
                                            We typically respond within a few
                                            hours during business days.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Clock className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">
                                            Business Hours
                                        </h4>
                                        <p className="text-muted-foreground text-sm">
                                            Monday - Friday, 8:00 AM - 5:00 PM
                                            PST
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Right - Form */}
                    <ScrollReveal direction="right">
                        <Card className="p-8 shadow-xl">
                            {isSubmitted ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle className="w-8 h-8 text-success" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">
                                        Message Sent!
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {`Thank you for reaching out.
                                                We'll be in touch soon.`}
                                    </p>
                                </div>
                            ) : (
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">
                                                Full Name
                                            </Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                placeholder="John Doe"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="h-12"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="john@company.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="h-12"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="company">
                                                Company
                                            </Label>
                                            <Input
                                                id="company"
                                                name="company"
                                                placeholder="Your Company"
                                                value={formData.company}
                                                onChange={handleChange}
                                                className="h-12"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="subject">
                                                Subject
                                            </Label>
                                            <Input
                                                id="subject"
                                                name="subject"
                                                placeholder="How can we help?"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                className="h-12"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message">Message</Label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            placeholder="Tell us about your project..."
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            className="resize-none"
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full h-12 text-base"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center gap-2">
                                                <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                                Sending...
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                <Send className="w-4 h-4" />
                                                Send Message
                                            </span>
                                        )}
                                    </Button>
                                </form>
                            )}
                        </Card>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;