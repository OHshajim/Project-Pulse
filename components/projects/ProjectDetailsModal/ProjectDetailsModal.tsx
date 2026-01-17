import { useState } from "react";
import { Project, User } from "@/types";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    FolderOpen,
    Users,
    AlertTriangle,
    Clock,
    CheckCircle2,
    AlertCircle,
    Activity,
    MessageSquare,
    BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { HealthScore } from "@/components/HealthScore";
import OverviewTab from "./components/OverviewTab";
import TeamTab from "./components/TeamTab";
import RiskTab from "./components/RiskTab";
import ReviewTab from "./components/ReviewTab";
import ActivityTab from "./components/ActivityTab";

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
                        <OverviewTab feedback={feedback} project={project} checkIns={checkIns} openRisks={openRisks}/>

                        {/* Team Tab */}
                        <TeamTab client={client} employees={employees}/>

                        {/* Risks Tab */}
                        <RiskTab risks={risks} openRisks={openRisks} />

                        {/* Reviews Tab */}
                        <ReviewTab feedback={feedback} checkIns={checkIns} />

                        {/* Activity Tab */}
                        <ActivityTab activities={activities} />
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
