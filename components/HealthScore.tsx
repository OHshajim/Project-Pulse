import { cn } from "@/lib/utils";

interface HealthScoreProps {
    score: number;
    size?: "sm" | "md" | "lg";
    showLabel?: boolean;
}

export function HealthScore({
    score,
    size = "md",
    showLabel = true,
}: HealthScoreProps) {
    const getColor = () => {
        if (score >= 80) return "text-success";
        if (score >= 60) return "text-warning";
        return "text-critical";
    };

    const getStrokeColor = () => {
        if (score >= 80) return "stroke-success";
        if (score >= 60) return "stroke-warning";
        return "stroke-critical";
    };

    const getBgColor = () => {
        if (score >= 80) return "bg-success/10";
        if (score >= 60) return "bg-warning/10";
        return "bg-critical/10";
    };

    const getLabel = () => {
        if (score >= 80) return "On Track";
        if (score >= 60) return "At Risk";
        return "Critical";
    };

    const sizeClasses = {
        sm: "w-12 h-12",
        md: "w-16 h-16",
        lg: "w-24 h-24",
    };

    const textSize = {
        sm: "text-sm",
        md: "text-lg",
        lg: "text-2xl",
    };

    const circumference = 264;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <div className="flex flex-col items-center gap-1.5">
            <div className={cn("relative", sizeClasses[size])}>
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-muted/50"
                    />
                    <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        className={cn(
                            getStrokeColor(),
                            "transition-all duration-1000 ease-out"
                        )}
                        style={{
                            filter:
                                score >= 80
                                    ? "drop-shadow(0 0 4px hsl(var(--success) / 0.5))"
                                    : score >= 60
                                    ? "drop-shadow(0 0 4px hsl(var(--warning) / 0.5))"
                                    : "drop-shadow(0 0 4px hsl(var(--critical) / 0.5))",
                        }}
                    />
                </svg>
                <div
                    className={cn(
                        "absolute inset-0 flex items-center justify-center font-bold",
                        getColor(),
                        textSize[size]
                    )}
                >
                    {score}
                </div>
            </div>
            {showLabel && (
                <span
                    className={cn(
                        "px-2.5 py-1 rounded-full text-xs font-semibold",
                        getBgColor(),
                        getColor()
                    )}
                >
                    {getLabel()}
                </span>
            )}
        </div>
    );
}
