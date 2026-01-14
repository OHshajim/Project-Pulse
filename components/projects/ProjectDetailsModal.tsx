import { useState } from "react";
import { Project, WeeklyCheckIn, ClientFeedback, Risk, User } from "@/types";
import {
    getUserById,
    getRisksForProject,
    getActivitiesForProject,
    getFeedbackForProject,
    getCheckInsForProject,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    FolderOpen,
    Calendar,
    Users,
    AlertTriangle,
    TrendingUp,
    Clock,
    CheckCircle2,
    AlertCircle,
    Activity,
    Star,
    MessageSquare,
    FileText,
    Shield,
    Mail,
    Briefcase,
    Target,
    BarChart3,
    ThumbsUp,
    Flag,
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

const getSeverityConfig = (severity: string) => {
    switch (severity) {
        case "high":
            return {
                color: "text-critical",
                bg: "bg-critical/10",
                border: "border-critical/30",
            };
        case "medium":
            return {
                color: "text-warning",
                bg: "bg-warning/10",
                border: "border-warning/30",
            };
        case "low":
            return {
                color: "text-muted-foreground",
                bg: "bg-muted/50",
                border: "border-border",
            };
        default:
            return {
                color: "text-muted-foreground",
                bg: "bg-muted/50",
                border: "border-border",
            };
    }
};

// Team Member Card Component
function TeamMemberCard({
    user,
    role,
}: {
    user: User;
    role: "client" | "employee";
}) {
    return (
        <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 border border-border hover:bg-muted/50 transition-colors">
            <div
                className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold",
                    role === "client"
                        ? "bg-primary/10 text-primary"
                        : "bg-secondary text-secondary-foreground"
                )}
            >
                {user.avatar}
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{user.name}</p>
                <div className="flex items-center gap-2 mt-1">
                    <Mail className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground truncate">
                        {user.email}
                    </span>
                </div>
            </div>
            <Badge
                variant={role === "client" ? "default" : "secondary"}
                className="capitalize"
            >
                {role}
            </Badge>
        </div>
    );
}

// Risk Item Component
function RiskItem({ risk }: { risk: Risk }) {
    const config = getSeverityConfig(risk.severity);
    const reporter = getUserById(risk.createdBy);

    return (
        <div
            className={cn(
                "p-4 rounded-xl border transition-all hover:shadow-soft",
                config.bg,
                config.border
            )}
        >
            <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                    <Shield className={cn("w-4 h-4", config.color)} />
                    <h4 className="font-medium">{risk.title}</h4>
                </div>
                <div className="flex items-center gap-2">
                    <Badge
                        variant="outline"
                        className={cn("text-xs capitalize", config.color)}
                    >
                        {risk.severity}
                    </Badge>
                    <Badge
                        variant={risk.status === "open" ? "warning" : "success"}
                        className="text-xs capitalize"
                    >
                        {risk.status}
                    </Badge>
                </div>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
                {risk.description}
            </p>
            {risk.mitigationPlan && (
                <div className="p-3 rounded-lg bg-background/50 border border-border/50 mb-3">
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                        Mitigation Plan
                    </p>
                    <p className="text-sm">{risk.mitigationPlan}</p>
                </div>
            )}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                    <span>Reported by</span>
                    <div className="flex items-center gap-1">
                        <div className="w-5 h-5 rounded-md bg-muted flex items-center justify-center text-[10px] font-medium">
                            {reporter?.avatar}
                        </div>
                        <span>{reporter?.name}</span>
                    </div>
                </div>
                <span>{format(new Date(risk.createdAt), "MMM d, yyyy")}</span>
            </div>
        </div>
    );
}

// Feedback Item Component
function FeedbackItem({ feedback }: { feedback: ClientFeedback }) {
    const client = getUserById(feedback.clientId);

    return (
        <div className="p-4 rounded-xl bg-muted/30 border border-border hover:shadow-soft transition-all">
            <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                        {client?.avatar}
                    </div>
                    <div>
                        <p className="font-medium">{client?.name}</p>
                        <p className="text-xs text-muted-foreground">
                            Week of{" "}
                            {format(new Date(feedback.weekOf), "MMM d, yyyy")}
                        </p>
                    </div>
                </div>
                {feedback.hasFlaggedIssue && (
                    <Badge variant="critical" className="text-xs">
                        <Flag className="w-3 h-3 mr-1" />
                        Issue Flagged
                    </Badge>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="p-3 rounded-lg bg-background/50 border border-border/50">
                    <p className="text-xs text-muted-foreground mb-1">
                        Satisfaction
                    </p>
                    <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                className={cn(
                                    "w-4 h-4",
                                    star <= feedback.satisfactionRating
                                        ? "text-warning fill-warning"
                                        : "text-muted-foreground/30"
                                )}
                            />
                        ))}
                    </div>
                </div>
                <div className="p-3 rounded-lg bg-background/50 border border-border/50">
                    <p className="text-xs text-muted-foreground mb-1">
                        Communication
                    </p>
                    <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                className={cn(
                                    "w-4 h-4",
                                    star <= feedback.communicationRating
                                        ? "text-primary fill-primary"
                                        : "text-muted-foreground/30"
                                )}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {feedback.comments && (
                <div className="p-3 rounded-lg bg-background/50 border border-border/50">
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                        Comments
                    </p>
                    <p className="text-sm">{feedback.comments}</p>
                </div>
            )}
        </div>
    );
}

// Check-in Item Component
function CheckInItem({ checkIn }: { checkIn: WeeklyCheckIn }) {
    const employee = getUserById(checkIn.employeeId);

    const getConfidenceLabel = (level: number) => {
        switch (level) {
            case 5:
                return { label: "Very High", color: "text-success" };
            case 4:
                return { label: "High", color: "text-success" };
            case 3:
                return { label: "Medium", color: "text-warning" };
            case 2:
                return { label: "Low", color: "text-critical" };
            case 1:
                return { label: "Very Low", color: "text-critical" };
            default:
                return { label: "Unknown", color: "text-muted-foreground" };
        }
    };

    const confidence = getConfidenceLabel(checkIn.confidenceLevel);

    return (
        <div className="p-4 rounded-xl bg-muted/30 border border-border hover:shadow-soft transition-all">
            <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-secondary text-secondary-foreground flex items-center justify-center font-bold">
                        {employee?.avatar}
                    </div>
                    <div>
                        <p className="font-medium">{employee?.name}</p>
                        <p className="text-xs text-muted-foreground">
                            Week of{" "}
                            {format(new Date(checkIn.weekOf), "MMM d, yyyy")}
                        </p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                        <Target className="w-3 h-3 text-primary" />
                        <span className="text-sm font-bold text-primary">
                            {checkIn.completionPercentage}%
                        </span>
                    </div>
                    <span className={cn("text-xs", confidence.color)}>
                        {confidence.label} Confidence
                    </span>
                </div>
            </div>

            <div className="space-y-3">
                <div className="p-3 rounded-lg bg-background/50 border border-border/50">
                    <div className="flex items-center gap-2 mb-1">
                        <ThumbsUp className="w-3 h-3 text-success" />
                        <p className="text-xs font-medium text-muted-foreground">
                            Progress Summary
                        </p>
                    </div>
                    <p className="text-sm">{checkIn.progressSummary}</p>
                </div>

                {checkIn.blockers && (
                    <div className="p-3 rounded-lg bg-critical/5 border border-critical/20">
                        <div className="flex items-center gap-2 mb-1">
                            <AlertTriangle className="w-3 h-3 text-critical" />
                            <p className="text-xs font-medium text-critical">
                                Blockers
                            </p>
                        </div>
                        <p className="text-sm">{checkIn.blockers}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export function ProjectDetailsModal({
    open,
    onOpenChange,
    project,
}: ProjectDetailsModalProps) {
    const [activeTab, setActiveTab] = useState("overview");

    if (!project) return null;

    const client = getUserById(project.clientId);
    const employees = project.employeeIds
        .map((id) => getUserById(id))
        .filter(Boolean) as User[];
    const risks = getRisksForProject(project.id);
    const activities = getActivitiesForProject(project.id);
    const feedback = getFeedbackForProject(project.id);
    const checkIns = getCheckInsForProject(project.id);
    const statusConfig = getStatusConfig(project.status);
    const StatusIcon = statusConfig.icon;

    const openRisks = risks.filter((r) => r.status === "open");
    const highRisks = openRisks.filter((r) => r.severity === "high");

    // Calculate average ratings
    const avgSatisfaction =
        feedback.length > 0
            ? (
                  feedback.reduce((sum, f) => sum + f.satisfactionRating, 0) /
                  feedback.length
              ).toFixed(1)
            : "N/A";
    const avgCommunication =
        feedback.length > 0
            ? (
                  feedback.reduce((sum, f) => sum + f.communicationRating, 0) /
                  feedback.length
              ).toFixed(1)
            : "N/A";

    // Calculate days remaining
    const endDate = new Date(project.endDate);
    const today = new Date();
    const daysRemaining = Math.ceil(
        (endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-225 max-h-[90vh] gap-0 p-0 overflow-hidden">
                {/* Header */}
                <div className="relative bg-linear-to-r from-primary/10 via-accent/5 to-background p-6 border-b border-border">
                    <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                    <DialogHeader className="relative">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                                <FolderOpen className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2 flex-wrap">
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
                                    <Badge
                                        variant="secondary"
                                        className="text-xs"
                                    >
                                        {project.progress}% Complete
                                    </Badge>
                                </div>
                                <DialogTitle className="text-xl leading-tight">
                                    {project.name}
                                </DialogTitle>
                                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                    {project.description}
                                </p>
                            </div>
                            <HealthScore
                                score={project.healthScore}
                                size="md"
                            />
                        </div>
                    </DialogHeader>
                </div>

                {/* Tabs */}
                <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="flex-1"
                >
                    <div className="border-b border-border px-6">
                        <TabsList className="h-12 bg-transparent p-0 gap-4">
                            <TabsTrigger
                                value="overview"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12"
                            >
                                <BarChart3 className="w-4 h-4 mr-2" />
                                Overview
                            </TabsTrigger>
                            <TabsTrigger
                                value="team"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12"
                            >
                                <Users className="w-4 h-4 mr-2" />
                                Team ({employees.length + 1})
                            </TabsTrigger>
                            <TabsTrigger
                                value="risks"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12"
                            >
                                <AlertTriangle className="w-4 h-4 mr-2" />
                                Risks ({openRisks.length})
                            </TabsTrigger>
                            <TabsTrigger
                                value="reviews"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12"
                            >
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Reviews ({feedback.length + checkIns.length})
                            </TabsTrigger>
                            <TabsTrigger
                                value="activity"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12"
                            >
                                <Activity className="w-4 h-4 mr-2" />
                                Activity
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <ScrollArea className="h-[calc(90vh-280px)]">
                        {/* Overview Tab */}
                        <TabsContent
                            value="overview"
                            className="p-6 space-y-6 m-0"
                        >
                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="p-4 rounded-xl bg-muted/30 border border-border text-center">
                                    <TrendingUp className="w-5 h-5 mx-auto mb-2 text-primary" />
                                    <p className="text-2xl font-bold text-primary">
                                        {project.progress}%
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Progress
                                    </p>
                                </div>
                                <div className="p-4 rounded-xl bg-muted/30 border border-border text-center">
                                    <Star className="w-5 h-5 mx-auto mb-2 text-warning" />
                                    <p className="text-2xl font-bold">
                                        {avgSatisfaction}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Avg. Satisfaction
                                    </p>
                                </div>
                                <div className="p-4 rounded-xl bg-muted/30 border border-border text-center">
                                    <AlertTriangle className="w-5 h-5 mx-auto mb-2 text-critical" />
                                    <p className="text-2xl font-bold">
                                        {openRisks.length}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Open Risks
                                    </p>
                                </div>
                                <div className="p-4 rounded-xl bg-muted/30 border border-border text-center">
                                    <Clock className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
                                    <p className="text-2xl font-bold">
                                        {daysRemaining > 0 ? daysRemaining : 0}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Days Remaining
                                    </p>
                                </div>
                            </div>

                            {/* Progress Section */}
                            <div className="p-4 rounded-xl bg-muted/30 border border-border">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4 text-primary" />
                                        <span className="font-medium">
                                            Project Progress
                                        </span>
                                    </div>
                                    <span className="text-lg font-bold text-primary">
                                        {project.progress}%
                                    </span>
                                </div>
                                <Progress
                                    value={project.progress}
                                    className="h-3 mb-2"
                                />
                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                    <span>{project.progress}% completed</span>
                                    <span>
                                        {100 - project.progress}% remaining
                                    </span>
                                </div>
                            </div>

                            {/* Timeline & Health */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl bg-muted/30 border border-border">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Calendar className="w-4 h-4 text-muted-foreground" />
                                        <span className="font-medium">
                                            Timeline
                                        </span>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-muted-foreground">
                                                Start Date
                                            </span>
                                            <span className="text-sm font-medium">
                                                {format(
                                                    new Date(project.startDate),
                                                    "MMM d, yyyy"
                                                )}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-muted-foreground">
                                                End Date
                                            </span>
                                            <span className="text-sm font-medium">
                                                {format(
                                                    new Date(project.endDate),
                                                    "MMM d, yyyy"
                                                )}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-muted-foreground">
                                                Duration
                                            </span>
                                            <span className="text-sm font-medium">
                                                {Math.ceil(
                                                    (new Date(
                                                        project.endDate
                                                    ).getTime() -
                                                        new Date(
                                                            project.startDate
                                                        ).getTime()) /
                                                        (1000 * 60 * 60 * 24)
                                                )}{" "}
                                                days
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl bg-muted/30 border border-border">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Target className="w-4 h-4 text-muted-foreground" />
                                        <span className="font-medium">
                                            Health Metrics
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <HealthScore
                                            score={project.healthScore}
                                            size="md"
                                        />
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <MessageSquare className="w-4 h-4 text-muted-foreground" />
                                                <span className="text-sm">
                                                    {avgCommunication}/5
                                                    Communication
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FileText className="w-4 h-4 text-muted-foreground" />
                                                <span className="text-sm">
                                                    {checkIns.length} Check-ins
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <ThumbsUp className="w-4 h-4 text-muted-foreground" />
                                                <span className="text-sm">
                                                    {feedback.length} Reviews
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        {/* Team Tab */}
                        <TabsContent value="team" className="p-6 space-y-6 m-0">
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                                    <Briefcase className="w-4 h-4" />
                                    Client
                                </h3>
                                {client && (
                                    <TeamMemberCard
                                        user={client}
                                        role="client"
                                    />
                                )}
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                                    <Users className="w-4 h-4" />
                                    Team Members ({employees.length})
                                </h3>
                                <div className="space-y-3">
                                    {employees.map((employee) => (
                                        <TeamMemberCard
                                            key={employee.id}
                                            user={employee}
                                            role="employee"
                                        />
                                    ))}
                                </div>
                            </div>
                        </TabsContent>

                        {/* Risks Tab */}
                        <TabsContent
                            value="risks"
                            className="p-6 space-y-4 m-0"
                        >
                            {risks.length > 0 ? (
                                <>
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-sm font-medium text-muted-foreground">
                                            {openRisks.length} Open •{" "}
                                            {risks.length - openRisks.length}{" "}
                                            Resolved
                                        </h3>
                                    </div>
                                    <div className="space-y-4">
                                        {risks.map((risk) => (
                                            <RiskItem
                                                key={risk.id}
                                                risk={risk}
                                            />
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-12">
                                    <Shield className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4" />
                                    <p className="text-muted-foreground">
                                        No risks reported for this project
                                    </p>
                                </div>
                            )}
                        </TabsContent>

                        {/* Reviews Tab */}
                        <TabsContent
                            value="reviews"
                            className="p-6 space-y-6 m-0"
                        >
                            {/* Client Feedback */}
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                                    <Star className="w-4 h-4" />
                                    Client Feedback ({feedback.length})
                                </h3>
                                {feedback.length > 0 ? (
                                    <div className="space-y-4">
                                        {feedback.map((f) => (
                                            <FeedbackItem
                                                key={f.id}
                                                feedback={f}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 rounded-xl bg-muted/30 border border-border">
                                        <Star className="w-8 h-8 mx-auto text-muted-foreground/30 mb-2" />
                                        <p className="text-sm text-muted-foreground">
                                            No feedback received yet
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Weekly Check-ins */}
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                                    <FileText className="w-4 h-4" />
                                    Weekly Check-ins ({checkIns.length})
                                </h3>
                                {checkIns.length > 0 ? (
                                    <div className="space-y-4">
                                        {checkIns.map((c) => (
                                            <CheckInItem
                                                key={c.id}
                                                checkIn={c}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 rounded-xl bg-muted/30 border border-border">
                                        <FileText className="w-8 h-8 mx-auto text-muted-foreground/30 mb-2" />
                                        <p className="text-sm text-muted-foreground">
                                            No check-ins submitted yet
                                        </p>
                                    </div>
                                )}
                            </div>
                        </TabsContent>

                        {/* Activity Tab */}
                        <TabsContent value="activity" className="p-6 m-0">
                            {activities.length > 0 ? (
                                <div className="relative">
                                    <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />
                                    <div className="space-y-4">
                                        {activities.map((activity, index) => {
                                            const activityUser = getUserById(
                                                activity.userId
                                            );
                                            const getActivityIcon = () => {
                                                switch (activity.type) {
                                                    case "check-in":
                                                        return FileText;
                                                    case "feedback":
                                                        return MessageSquare;
                                                    case "risk":
                                                        return AlertTriangle;
                                                    case "status-change":
                                                        return Activity;
                                                    default:
                                                        return Activity;
                                                }
                                            };
                                            const Icon = getActivityIcon();

                                            return (
                                                <div
                                                    key={activity.id}
                                                    className="relative flex items-start gap-4 pl-10 animate-fade-in"
                                                    style={{
                                                        animationDelay: `${
                                                            index * 50
                                                        }ms`,
                                                    }}
                                                >
                                                    <div className="absolute left-3 w-5 h-5 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                                                        <Icon className="w-2.5 h-2.5 text-primary" />
                                                    </div>
                                                    <div className="flex-1 p-3 rounded-lg bg-muted/30 border border-border">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <div className="w-6 h-6 rounded-md bg-muted flex items-center justify-center text-[10px] font-medium">
                                                                {activityUser?.avatar ||
                                                                    "?"}
                                                            </div>
                                                            <span className="text-sm font-medium">
                                                                {
                                                                    activityUser?.name
                                                                }
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground">
                                                            {
                                                                activity.description
                                                            }
                                                        </p>
                                                        <p className="text-xs text-muted-foreground mt-2">
                                                            {format(
                                                                new Date(
                                                                    activity.timestamp
                                                                ),
                                                                "MMM d, yyyy • h:mm a"
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <Activity className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4" />
                                    <p className="text-muted-foreground">
                                        No activity recorded yet
                                    </p>
                                </div>
                            )}
                        </TabsContent>
                    </ScrollArea>
                </Tabs>

                <div className="p-6 pt-4 border-t border-border flex justify-end gap-3">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Close
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
