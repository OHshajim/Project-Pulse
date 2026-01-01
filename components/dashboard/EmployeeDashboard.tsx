import { useUser } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    FolderKanban,
    AlertTriangle,
    ClipboardCheck,
    Plus,
} from "lucide-react";
import { getProjectsForUser, mockCheckIns, mockRisks } from "@/data/mockData";
import { RiskCard } from "../RiskCard";
import { StatsCard } from "../StatsCard";
import { ProjectCard } from "../ProjectCard";

export function EmployeeDashboard() {
    const { user } = useUser();
    const myProjects = getProjectsForUser(user?.id || "", "employee");
    const myRisks = mockRisks.filter((r) =>
        myProjects.some((p) => p.id === r.projectId)
    );
    const openRisks = myRisks.filter((r) => r.status === "open");

    // Check if check-ins are pending for this week
    const projectsNeedingCheckIn = myProjects
        .filter((p) => p.status !== "completed")
        .filter(
            (p) =>
                !mockCheckIns.some(
                    (c) =>
                        c.projectId === p.id &&
                        c.employeeId === user?.id &&
                        c.weekOf === "2024-03-18"
                )
        );

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">My Dashboard</h1>
                    <p className="text-muted-foreground mt-1">
                        Track your projects and pending tasks
                    </p>
                </div>
                <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    New Check-in
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatsCard
                    title="Assigned Projects"
                    value={
                        myProjects.filter((p) => p.status !== "completed")
                            .length
                    }
                    subtitle={`${
                        myProjects.filter((p) => p.status === "completed")
                            .length
                    } completed`}
                    icon={FolderKanban}
                />
                <StatsCard
                    title="Pending Check-ins"
                    value={projectsNeedingCheckIn.length}
                    subtitle="Due this week"
                    icon={ClipboardCheck}
                    variant={
                        projectsNeedingCheckIn.length > 0
                            ? "warning"
                            : "success"
                    }
                />
                <StatsCard
                    title="Open Risks"
                    value={openRisks.length}
                    subtitle="Requires attention"
                    icon={AlertTriangle}
                    variant={openRisks.length > 0 ? "warning" : "default"}
                />
            </div>

            {/* Pending Check-ins Alert */}
            {projectsNeedingCheckIn.length > 0 && (
                <Card className="border-warning/30 bg-warning/5">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2 text-warning">
                            <ClipboardCheck className="w-5 h-5" />
                            Weekly Check-ins Due
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-3">
                            You have {projectsNeedingCheckIn.length} project(s)
                            waiting for your weekly check-in
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {projectsNeedingCheckIn.map((project) => (
                                <Button
                                    key={project.id}
                                    variant="outline"
                                    size="sm"
                                >
                                    {project.name}
                                </Button>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* My Projects */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">My Projects</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {myProjects
                        .filter((p) => p.status !== "completed")
                        .map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                </div>
            </div>

            {/* My Open Risks */}
            {openRisks.length > 0 && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Open Risks</h2>
                        <Button variant="outline" size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Report Risk
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {openRisks.map((risk) => (
                            <RiskCard key={risk.id} risk={risk} />
                        ))}
                    </div>
                </div>
            )}

            {/* Recent Check-ins */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">My Recent Check-ins</h2>
                <Card>
                    <CardContent className="pt-6">
                        <div className="space-y-4">
                            {mockCheckIns
                                .filter((c) => c.employeeId === user?.id)
                                .slice(0, 3)
                                .map((checkIn) => {
                                    const project = myProjects.find(
                                        (p) => p.id === checkIn.projectId
                                    );
                                    return (
                                        <div
                                            key={checkIn.id}
                                            className="p-4 rounded-lg bg-muted/50 space-y-2"
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium">
                                                    {project?.name}
                                                </span>
                                                <Badge variant="muted">
                                                    Week of {checkIn.weekOf}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {checkIn.progressSummary}
                                            </p>
                                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                                <span>
                                                    Confidence:{" "}
                                                    {checkIn.confidenceLevel}/5
                                                </span>
                                                <span>
                                                    Completion:{" "}
                                                    {
                                                        checkIn.completionPercentage
                                                    }
                                                    %
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
