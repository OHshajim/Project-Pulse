import { Activity } from "@/types";
import {
    ClipboardCheck,
    MessageSquare,
    AlertTriangle,
    RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityTimelineProps {
    activities: Activity[];
}

export function ActivityTimeline({ activities }: ActivityTimelineProps) {
    const getActivityIcon = (type: Activity["type"]) => {
        switch (type) {
            case "check-in":
                return ClipboardCheck;
            case "feedback":
                return MessageSquare;
            case "risk":
                return AlertTriangle;
            case "status-change":
                return RefreshCw;
        }
    };

    const getActivityColor = (type: Activity["type"]) => {
        switch (type) {
            case "check-in":
                return "bg-primary/10 text-primary";
            case "feedback":
                return "bg-success/10 text-success";
            case "risk":
                return "bg-warning/10 text-warning";
            case "status-change":
                return "bg-accent text-accent-foreground";
        }
    };

    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (days === 0) {
            const hours = Math.floor(diff / (1000 * 60 * 60));
            if (hours === 0) {
                const mins = Math.floor(diff / (1000 * 60));
                return `${mins}m ago`;
            }
            return `${hours}h ago`;
        }
        if (days === 1) return "Yesterday";
        if (days < 7) return `${days}d ago`;
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div className="space-y-1">
            {activities.map((activity, index) => {
                const Icon = getActivityIcon(activity.type);
                const isLast = index === activities.length - 1;

                return (
                    <div
                        key={activity.id}
                        className="flex gap-3 animate-fade-in relative"
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        {/* Timeline line */}
                        {!isLast && (
                            <div className="absolute left-[18px] top-10 w-0.5 h-[calc(100%-8px)] bg-border/50" />
                        )}

                        <div
                            className={cn(
                                "p-2.5 rounded-xl h-fit z-10",
                                getActivityColor(activity.type)
                            )}
                        >
                            <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0 pb-4">
                            <p className="text-sm text-foreground leading-relaxed">
                                {activity.description}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1 font-medium">
                                {formatTime(activity.timestamp)}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
