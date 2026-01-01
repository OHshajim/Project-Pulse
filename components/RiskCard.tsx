import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Clock, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockProjects, mockUsers } from "@/data/mockData";
import { Risk } from "@/types";

interface RiskCardProps {
    risk: Risk;
}

export function RiskCard({ risk }: RiskCardProps) {
    const project = mockProjects.find((p) => p.id === risk.projectId);
    const createdBy = mockUsers.find((u) => u.id === risk.createdBy);

    const getSeverityVariant = () => {
        switch (risk.severity) {
            case "high":
                return "critical";
            case "medium":
                return "warning";
            case "low":
                return "muted";
        }
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <Card
            className={cn(
                "hover-lift overflow-hidden",
                risk.status === "resolved" && "opacity-70",
                risk.severity === "high" &&
                    risk.status === "open" &&
                    "border-critical/40"
            )}
        >
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                        <div
                            className={cn(
                                "p-2.5 rounded-xl",
                                risk.status === "resolved"
                                    ? "bg-success/10 text-success"
                                    : risk.severity === "high"
                                    ? "bg-critical/10 text-critical animate-pulse-subtle"
                                    : "bg-warning/10 text-warning"
                            )}
                        >
                            {risk.status === "resolved" ? (
                                <CheckCircle className="w-5 h-5" />
                            ) : (
                                <AlertTriangle className="w-5 h-5" />
                            )}
                        </div>
                        <div className="min-w-0">
                            <h3 className="font-semibold text-foreground leading-tight">
                                {risk.title}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                <span className="truncate">
                                    {project?.name}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                        <Badge
                            variant={getSeverityVariant()}
                            className="capitalize"
                        >
                            {risk.severity}
                        </Badge>
                        <Badge
                            variant={
                                risk.status === "resolved"
                                    ? "success"
                                    : "outline"
                            }
                            className="capitalize"
                        >
                            {risk.status}
                        </Badge>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {risk.description}
                </p>

                <div className="p-4 bg-muted/30 rounded-xl border border-border/50">
                    <p className="text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">
                        Mitigation Plan
                    </p>
                    <p className="text-sm leading-relaxed">
                        {risk.mitigationPlan}
                    </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border/50 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" />
                        <span>{createdBy?.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{formatDate(risk.createdAt)}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
