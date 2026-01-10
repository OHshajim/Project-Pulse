import { Project } from "@/types";
import { mockUsers } from "@/data/mockData";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Users, AlertTriangle, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { HealthScore } from "./HealthScore";

interface ProjectCardProps {
    project: Project;
    onClick?: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
    const {employeeIds: employees, clientId: client} = project;

    const getStatusBadgeVariant = () => {
        switch (project.status) {
            case "on-track":
                return "success";
            case "at-risk":
                return "warning";
            case "critical":
                return "critical";
            case "completed":
                return "default";
        }
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    };
    return (
        <Card
            className={cn(
                "group cursor-pointer hover-lift overflow-hidden",
                project.status === "critical" &&
                    "border-critical/40 bg-critical/20"
            )}
            onClick={onClick}
        >
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                            <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                                {project.name}
                            </h3>
                            {project.status === "critical" && (
                                <AlertTriangle className="w-4 h-4 text-critical animate-pulse-subtle shrink-0" />
                            )}
                            <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity ml-auto flex-shrink-0" />
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                            {project.description}
                        </p>
                    </div>
                    <HealthScore
                        score={project.healthScore}
                        size="sm"
                        showLabel={false}
                    />
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <Badge
                        variant={getStatusBadgeVariant()}
                        className="capitalize"
                    >
                        {project.status.replace("-", " ")}
                    </Badge>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>
                            {formatDate(project.startDate)} -{" "}
                            {formatDate(project.endDate)}
                        </span>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-semibold">
                            {project.progress}%
                        </span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                </div>

                <div className="pt-3 border-t border-border/50 space-y-2">
                    {/* Client */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground w-12">
                            Client
                        </span>

                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-md bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center">
                                {client?.name?.[0]?.toUpperCase()}
                            </div>

                            <span className="text-sm font-medium leading-none">
                                {client?.name}
                            </span>
                        </div>
                    </div>

                    {/* Team */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground w-12">
                            Team
                        </span>

                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <div className="flex -space-x-2">
                                {employees.slice(0, 3).map((emp, index) => (
                                    <div
                                        key={index}
                                        className="w-7 h-7 rounded-md bg-secondary text-secondary-foreground text-xs font-semibold flex items-center justify-center border-2 border-background hover:z-10"
                                        title={emp.name}
                                    >
                                        {emp.name?.[0]?.toUpperCase()}
                                    </div>
                                ))}

                                {employees.length > 3 && (
                                    <div className="w-7 h-7 rounded-md bg-muted text-muted-foreground text-xs font-semibold flex items-center justify-center border-2 border-background">
                                        +{employees.length - 3}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
