import { Risk } from "@/types";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    AlertTriangle,
    Flame,
    AlertCircle,
    CheckCircle2,
    Clock,
    User,
    Calendar,
    FolderOpen,
    Shield,
    Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface ViewRiskModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    risk: Risk | null;
    onResolve?: (riskId: string) => void;
}

const getSeverityConfig = (severity: string) => {
    switch (severity) {
        case "high":
            return {
                icon: Flame,
                color: "text-critical",
                bg: "bg-critical/10",
                border: "border-critical/20",
                label: "High Severity",
            };
        case "medium":
            return {
                icon: AlertTriangle,
                color: "text-warning",
                bg: "bg-warning/10",
                border: "border-warning/20",
                label: "Medium Severity",
            };
        default:
            return {
                icon: AlertCircle,
                color: "text-muted-foreground",
                bg: "bg-muted",
                border: "border-border",
                label: "Low Severity",
            };
    }
};

export function ViewRiskModal({
    open,
    onOpenChange,
    risk,
    onResolve,
}: ViewRiskModalProps) {
    if (!risk) return null;
    const {projectId: project, createdBy: creator } = risk;
    const severityConfig = getSeverityConfig(risk.severity);
    const SeverityIcon = severityConfig.icon;

    const handleResolve = () => {
        onResolve?.(risk._id);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-150 gap-0 p-0 overflow-hidden">
                {/* Header with severity-based gradient */}
                <div
                    className={cn(
                        "relative p-6 border-b",
                        risk.severity === "high" &&
                            "bg-linear-to-r from-critical/10 via-critical/5 to-background",
                        risk.severity === "medium" &&
                            "bg-linear-to-r from-warning/10 via-warning/5 to-background",
                        risk.severity === "low" &&
                            "bg-linear-to-r from-muted via-muted/50 to-background"
                    )}
                >
                    <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                    <DialogHeader className="relative">
                        <div className="flex items-start gap-4">
                            <div
                                className={cn(
                                    "p-3 rounded-xl border",
                                    severityConfig.bg,
                                    severityConfig.border
                                )}
                            >
                                <SeverityIcon
                                    className={cn(
                                        "w-6 h-6",
                                        severityConfig.color
                                    )}
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                    <Badge
                                        variant={
                                            risk.status === "open"
                                                ? "warning"
                                                : "success"
                                        }
                                        className="text-xs"
                                    >
                                        {risk.status === "open" ? (
                                            <>
                                                <Clock className="w-3 h-3 mr-1" />{" "}
                                                Open
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle2 className="w-3 h-3 mr-1" />{" "}
                                                Resolved
                                            </>
                                        )}
                                    </Badge>
                                    <Badge
                                        variant="outline"
                                        className={cn(
                                            "text-xs",
                                            severityConfig.color
                                        )}
                                    >
                                        {severityConfig.label}
                                    </Badge>
                                </div>
                                <DialogTitle className="text-xl leading-tight pr-8">
                                    {risk.title}
                                </DialogTitle>
                            </div>
                        </div>
                    </DialogHeader>
                </div>

                <div className="p-6 space-y-6">
                    {/* Meta Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border">
                            <FolderOpen className="w-4 h-4 text-muted-foreground" />
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Project
                                </p>
                                <p className="text-sm font-medium">
                                    {project?.name || "Unknown"}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Reported by
                                </p>
                                <p className="text-sm font-medium">
                                    {creator?.name || "Unknown"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-muted-foreground" />
                            <h3 className="text-sm font-semibold">
                                Risk Description
                            </h3>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed pl-6">
                            {risk.description}
                        </p>
                    </div>

                    {/* Mitigation Plan */}
                    {risk.mitigationPlan && (
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Lightbulb className="w-4 h-4 text-warning" />
                                <h3 className="text-sm font-semibold">
                                    Mitigation Plan
                                </h3>
                            </div>
                            <div className="pl-6 p-3 rounded-lg bg-warning/5 border border-warning/10">
                                <p className="text-sm text-foreground leading-relaxed">
                                    {risk.mitigationPlan}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Timestamps */}
                    <div className="flex items-center gap-6 pt-2 border-t border-border">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>
                                Created:{" "}
                                {format(
                                    new Date(risk.createdAt),
                                    "MMM d, yyyy 'at' h:mm a"
                                )}
                            </span>
                        </div>
                        {risk.resolvedAt && (
                            <div className="flex items-center gap-2 text-xs text-success">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>
                                    Resolved:{" "}
                                    {format(
                                        new Date(risk.resolvedAt),
                                        "MMM d, yyyy"
                                    )}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                <DialogFooter className="p-6 pt-0 gap-3">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Close
                    </Button>
                    {risk.status === "open" && onResolve && (
                        <Button
                            onClick={handleResolve}
                            className="bg-success hover:bg-success/90"
                        >
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Mark as Resolved
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
