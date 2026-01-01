import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    variant?: "default" | "success" | "warning" | "critical";
}

export function StatsCard({
    title,
    value,
    subtitle,
    icon: Icon,
    trend,
    variant = "default",
}: StatsCardProps) {
    const getIconStyles = () => {
        switch (variant) {
            case "success":
                return "bg-success/10 text-success";
            case "warning":
                return "bg-warning/10 text-warning";
            case "critical":
                return "bg-critical/10 text-critical";
            default:
                return "bg-primary/10 text-primary";
        }
    };

    const getBorderAccent = () => {
        switch (variant) {
            case "success":
                return "border-l-success";
            case "warning":
                return "border-l-warning";
            case "critical":
                return "border-l-critical";
            default:
                return "border-l-primary";
        }
    };

    return (
        <Card
            className={cn(
                "hover-lift border-l-4 overflow-hidden",
                getBorderAccent()
            )}
        >
            <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">
                            {title}
                        </p>
                        <p className="text-3xl font-bold tracking-tight">
                            {value}
                        </p>
                        {subtitle && (
                            <p className="text-sm text-muted-foreground">
                                {subtitle}
                            </p>
                        )}
                        {trend && (
                            <div
                                className={cn(
                                    "flex items-center gap-1 text-sm font-medium mt-2",
                                    trend.isPositive
                                        ? "text-success"
                                        : "text-critical"
                                )}
                            >
                                {trend.isPositive ? (
                                    <TrendingUp className="w-4 h-4" />
                                ) : (
                                    <TrendingDown className="w-4 h-4" />
                                )}
                                <span>
                                    {Math.abs(trend.value)}% from last week
                                </span>
                            </div>
                        )}
                    </div>
                    <div className={cn("p-3 rounded-xl", getIconStyles())}>
                        <Icon className="w-6 h-6" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
