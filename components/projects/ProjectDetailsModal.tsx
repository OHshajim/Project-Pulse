import { Project } from "@/types";
import {
    getUserById,
    getRisksForProject,
    getActivitiesForProject,
} from "@/data/mockData";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    FolderOpen,
    Calendar,
    Users,
    AlertTriangle,
    TrendingUp,
    Clock,
    CheckCircle2,
    AlertCircle,
    ExternalLink,
    Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { HealthScore } from "@/components/HealthScore";

interface ProjectDetailsModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    project: Project | null;
}

const getStatusConfig = (status: string) => {
    switch (status) {
        case "on-track":
            return {
                color: "text-success",
                bg: "bg-success/10",
                label: "On Track",
                icon: CheckCircle2,
            };
        case "at-risk":
            return {
                color: "text-warning",
                bg: "bg-warning/10",
                label: "At Risk",
                icon: AlertTriangle,
            };
        case "critical":
            return {
                color: "text-critical",
                bg: "bg-critical/10",
                label: "Critical",
                icon: AlertCircle,
            };
        case "completed":
            return {
                color: "text-primary",
                bg: "bg-primary/10",
                label: "Completed",
                icon: CheckCircle2,
            };
        default:
            return {
                color: "text-muted-foreground",
                bg: "bg-muted",
                label: status,
                icon: Clock,
            };
    }
};

export function ProjectDetailsModal({
    open,
    onOpenChange,
    project,
}: ProjectDetailsModalProps) {
    if (!project) return null;

    const client = getUserById(project.clientId);
    const employees = project.employeeIds
        .map((id) => getUserById(id))
        .filter(Boolean);
    const risks = getRisksForProject(project.id);
    const activities = getActivitiesForProject(project.id).slice(0, 5);
    const statusConfig = getStatusConfig(project.status);
    const StatusIcon = statusConfig.icon;

    const openRisks = risks.filter((r) => r.status === "open");
    const highRisks = openRisks.filter((r) => r.severity === "high");

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-175 max-h-[90vh] gap-0 p-0 overflow-hidden">
                {/* Header */}
                <div className="relative bg-linear-to-r from-primary/10 via-accent/5 to-background p-6 border-b border-border">
                    <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                    <DialogHeader className="relative">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                                <FolderOpen className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                    <Badge
                                        variant="outline"
                                        className={cn(
                                            "text-xs",
                                            statusConfig.color
                                        )}
                                    >
                                        <StatusIcon className="w-3 h-3 mr-1" />
                                        {statusConfig.label}
                                    </Badge>
                                    {highRisks.length > 0 && (
                                        <Badge
                                            variant="critical"
                                            className="text-xs"
                                        >
                                            {highRisks.length} High Risk
                                            {highRisks.length > 1 ? "s" : ""}
                                        </Badge>
                                    )}
                                </div>
                                <DialogTitle className="text-xl leading-tight">
                                    {project.name}
                                </DialogTitle>
                                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                    {project.description}
                                </p>
                            </div>
                        </div>
                    </DialogHeader>
                </div>

                <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                    {/* Health & Progress */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Health Score */}
                        <div className="flex items-center gap-6 p-4 rounded-xl bg-muted/30 border border-border">
                            <HealthScore
                                score={project.healthScore}
                                size="md"
                            />
                            <div>
                                <p className="text-sm font-medium">
                                    Project Health
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Based on check-ins, risks, and feedback
                                </p>
                            </div>
                        </div>

                        {/* Progress */}
                        <div className="p-4 rounded-xl bg-muted/30 border border-border">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4 text-primary" />
                                    <span className="text-sm font-medium">
                                        Progress
                                    </span>
                                </div>
                                <span className="text-lg font-bold text-primary">
                                    {project.progress}%
                                </span>
                            </div>
                            <Progress
                                value={project.progress}
                                className="h-2"
                            />
                            <p className="text-xs text-muted-foreground mt-2">
                                {100 - project.progress}% remaining
                            </p>
                        </div>
                    </div>

                    {/* Timeline & Team */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-muted/30 border border-border">
                            <div className="flex items-center gap-2 mb-3">
                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm font-medium">
                                    Timeline
                                </span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">
                                        Start Date
                                    </span>
                                    <span className="font-medium">
                                        {format(
                                            new Date(project.startDate),
                                            "MMM d, yyyy"
                                        )}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">
                                        End Date
                                    </span>
                                    <span className="font-medium">
                                        {format(
                                            new Date(project.endDate),
                                            "MMM d, yyyy"
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-muted/30 border border-border">
                            <div className="flex items-center gap-2 mb-3">
                                <Users className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm font-medium">
                                    Team
                                </span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">
                                        Client
                                    </span>
                                    <span className="font-medium">
                                        {client?.name || "N/A"}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">
                                        Team Members
                                    </span>
                                    <div className="flex -space-x-2">
                                        {employees.slice(0, 3).map((emp) => (
                                            <div
                                                key={emp?.id}
                                                className="w-6 h-6 rounded-full bg-primary/10 border-2 border-background flex items-center justify-center text-[10px] font-medium"
                                                title={emp?.name}
                                            >
                                                {emp?.avatar}
                                            </div>
                                        ))}
                                        {employees.length > 3 && (
                                            <div className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center text-[10px] font-medium">
                                                +{employees.length - 3}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Risks Summary */}
                    {risks.length > 0 && (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4 text-warning" />
                                    <span className="text-sm font-medium">
                                        Active Risks ({openRisks.length})
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                {openRisks.slice(0, 3).map((risk) => (
                                    <div
                                        key={risk.id}
                                        className={cn(
                                            "flex items-center gap-3 p-3 rounded-lg border",
                                            risk.severity === "high" &&
                                                "bg-critical/5 border-critical/20",
                                            risk.severity === "medium" &&
                                                "bg-warning/5 border-warning/20",
                                            risk.severity === "low" &&
                                                "bg-muted/50 border-border"
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                "w-2 h-2 rounded-full",
                                                risk.severity === "high" &&
                                                    "bg-critical",
                                                risk.severity === "medium" &&
                                                    "bg-warning",
                                                risk.severity === "low" &&
                                                    "bg-muted-foreground"
                                            )}
                                        />
                                        <span className="text-sm flex-1 truncate">
                                            {risk.title}
                                        </span>
                                        <Badge
                                            variant="outline"
                                            className="text-[10px] capitalize"
                                        >
                                            {risk.severity}
                                        </Badge>
                                    </div>
                                ))}
                                {openRisks.length > 3 && (
                                    <p className="text-xs text-muted-foreground text-center">
                                        +{openRisks.length - 3} more risks
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Recent Activity */}
                    {activities.length > 0 && (
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Activity className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm font-medium">
                                    Recent Activity
                                </span>
                            </div>
                            <div className="space-y-2">
                                {activities.map((activity) => {
                                    const activityUser = getUserById(
                                        activity.userId
                                    );
                                    return (
                                        <div
                                            key={activity.id}
                                            className="flex items-start gap-3 text-sm"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-medium mt-0.5">
                                                {activityUser?.avatar || "?"}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-foreground truncate">
                                                    {activity.description}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {format(
                                                        new Date(
                                                            activity.timestamp
                                                        ),
                                                        "MMM d, h:mm a"
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-6 pt-0 flex justify-end gap-3">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Close
                    </Button>
                    <Button>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Full Details
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
