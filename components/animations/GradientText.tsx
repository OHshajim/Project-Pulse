import { ReactNode } from "react";

interface GradientTextProps {
    children: ReactNode;
    className?: string;
    animate?: boolean;
}

const GradientText = ({
    children,
    className = "",
    animate = false,
}: GradientTextProps) => {
    return (
        <span
            className={`bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent-foreground to-success ${
                animate ? "animate-gradient bg-[length:200%_auto]" : ""
            } ${className}`}
        >
            {children}
        </span>
    );
};

export default GradientText;
