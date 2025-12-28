"use client"
import { useEffect, useRef, useState } from "react";

interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
    staggerDelay?: number;
}

const TextReveal = ({
    text,
    className = "",
    delay = 0,
    staggerDelay = 0.03,
}: TextRevealProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    const words = text.split(" ");

    return (
        <span ref={ref} className={`inline ${className}`}>
            {words.map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block mr-2">
                    {word.split("").map((char, charIndex) => {
                        const totalIndex =
                            words
                                .slice(0, wordIndex)
                                .reduce((acc, w) => acc + w.length, 0) +
                            charIndex;

                        return (
                            <span
                                key={charIndex}
                                className="inline-block transition-all duration-500"
                                style={{
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible
                                        ? "translateY(0) rotateX(0)"
                                        : "translateY(20px) rotateX(-90deg)",
                                    transitionDelay: `${
                                        delay + totalIndex * staggerDelay
                                    }s`,
                                }}
                            >
                                {char}
                            </span>
                        );
                    })}
                </span>
            ))}
        </span>
    );
};

export default TextReveal;
