"use client"
import { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollRevealProps {
    children: ReactNode;
    delay?: number;
    direction?: "up" | "down" | "left" | "right" | "scale";
    className?: string;
    duration?: number;
}

const ScrollReveal = ({
    children,
    delay = 0,
    direction = "up",
    className = "",
    duration = 0.6,
}: ScrollRevealProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    const getTransform = () => {
        if (isVisible) return "translate(0, 0) scale(1)";

        switch (direction) {
            case "up":
                return "translate(0, 40px) scale(1)";
            case "down":
                return "translate(0, -40px) scale(1)";
            case "left":
                return "translate(40px, 0) scale(1)";
            case "right":
                return "translate(-40px, 0) scale(1)";
            case "scale":
                return "translate(0, 0) scale(0.9)";
            default:
                return "translate(0, 40px) scale(1)";
        }
    };

    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: getTransform(),
                transition: `all ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s`,
            }}
        >
            {children}
        </div>
    );
};

export default ScrollReveal;
