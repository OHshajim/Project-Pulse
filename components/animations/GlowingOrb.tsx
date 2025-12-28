"use client"
import { useEffect, useState } from "react";

interface GlowingOrbProps {
    size?: number;
    color?: "primary" | "success" | "warning";
    position?: { x: number; y: number };
    intensity?: number;
}

const GlowingOrb = ({
    size = 300,
    color = "primary",
    position = { x: 50, y: 50 },
    intensity = 0.5,
}: GlowingOrbProps) => {
    const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 30;
            const y = (e.clientY / window.innerHeight - 0.5) * 30;
            setMouseOffset({ x, y });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const colorMap = {
        primary: "from-primary/40 via-primary/20 to-transparent",
        success: "from-success/40 via-success/20 to-transparent",
        warning: "from-warning/40 via-warning/20 to-transparent",
    };

    return (
        <div
            className={`absolute rounded-full bg-gradient-radial ${colorMap[color]} blur-3xl animate-pulse-subtle pointer-events-none`}
            style={{
                width: size,
                height: size,
                left: `calc(${position.x}% + ${mouseOffset.x}px)`,
                top: `calc(${position.y}% + ${mouseOffset.y}px)`,
                transform: "translate(-50%, -50%)",
                opacity: intensity,
            }}
        />
    );
};

export default GlowingOrb;
