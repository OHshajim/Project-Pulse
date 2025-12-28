import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import ScrollReveal from "../animations/ScrollReveal";

const contactMethods = [
    {
        icon: Mail,
        title: "Email Us",
        description: "Our team will respond within 24 hours",
        contact: "ajshajimmax@gmail.com",
    },
    {
        icon: Phone,
        title: "Call Us",
        description: "Mon-Fri from 8am to 5pm PST",
        contact: "(+88) 01741-942510",
    },
    {
        icon: MapPin,
        title: "Visit Us",
        description: "Come say hello at our HQ",
        contact: "123 Innovation Way, SF, CA",
    },
];

const ContactMethod = () => {
    return (
        <section className="py-12 px-6">
            <div className="container mx-auto">
                <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {contactMethods.map((method, index) => (
                        <ScrollReveal key={method.title} delay={index * 0.1}>
                            <Card className="p-6 text-center h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
                                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-colors">
                                    <method.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                                </div>
                                <h3 className="font-semibold text-lg mb-1">
                                    {method.title}
                                </h3>
                                <p className="text-muted-foreground text-sm mb-2">
                                    {method.description}
                                </p>
                                <p className="text-primary font-medium text-sm">
                                    {method.contact}
                                </p>
                            </Card>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ContactMethod;
