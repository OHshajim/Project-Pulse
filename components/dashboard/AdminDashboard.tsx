import {
    mockProjects,
    mockRisks,
    mockCheckIns,
    mockActivities,
} from "@/data/mockData";
import { StatsCard } from "@/components/StatsCard";
import { ProjectCard } from "@/components/ProjectCard";
import { RiskCard } from "@/components/RiskCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    FolderKanban,
    AlertTriangle,
    TrendingUp,
    ClipboardCheck,
    Activity,
} from "lucide-react";
import { ActivityTimeline } from "../ActivityTimeline";

export function AdminDashboard() {
    const activeProjects = mockProjects.filter((p) => p.status !== "completed");
    const criticalProjects = mockProjects.filter(
        (p) => p.status === "critical"
    );
    const atRiskProjects = mockProjects.filter((p) => p.status === "at-risk");
    const openRisks = mockRisks.filter((r) => r.status === "open");
    const highSeverityRisks = openRisks.filter((r) => r.severity === "high");

    const avgHealthScore = Math.round(
        activeProjects.reduce((sum, p) => sum + p.healthScore, 0) /
            activeProjects.length
    );

    // Projects missing check-ins this week
    const projectsMissingCheckIn = mockProjects
        .filter((p) => p.status !== "completed")
        .filter(
            (p) =>
                !mockCheckIns.some(
                    (c) => c.projectId === p.id && c.weekOf === "2024-03-18"
                )
        )
        .slice(0, 2);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Admin Dashboard
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Monitor project health and team performance
                    </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/5 border border-primary/20">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    <span className="text-sm font-medium text-primary">
                        All systems operational
                    </span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                    title="Active Projects"
                    value={activeProjects.length}
                    subtitle={`${criticalProjects.length} critical`}
                    icon={FolderKanban}
                    variant="default"
                />
                <StatsCard
                    title="Avg Health Score"
                    value={`${avgHealthScore}%`}
                    icon={TrendingUp}
                    variant={avgHealthScore >= 70 ? "success" : "warning"}
                    trend={{ value: 5, isPositive: true }}
                />
                <StatsCard
                    title="Open Risks"
                    value={openRisks.length}
                    subtitle={`${highSeverityRisks.length} high severity`}
                    icon={AlertTriangle}
                    variant={
                        highSeverityRisks.length > 0 ? "critical" : "warning"
                    }
                />
                <StatsCard
                    title="Weekly Check-ins"
                    value={`${mockCheckIns.length}/${
                        activeProjects.length * 2
                    }`}
                    subtitle="This week"
                    icon={ClipboardCheck}
                />
            </div>

            {/* Projects by Health Status */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">
                        Projects by Health Status
                    </h2>
                    <div className="flex gap-2">
                        <Badge variant="success">
                            {
                                mockProjects.filter(
                                    (p) => p.status === "on-track"
                                ).length
                            }{" "}
                            On Track
                        </Badge>
                        <Badge variant="warning">
                            {atRiskProjects.length} At Risk
                        </Badge>
                        <Badge variant="critical">
                            {criticalProjects.length} Critical
                        </Badge>
                    </div>
                </div>

                {criticalProjects.length > 0 && (
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium text-critical flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4" />
                            Critical Projects Requiring Attention
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {criticalProjects.map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {atRiskProjects.length > 0 && (
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium text-warning">
                            At Risk Projects
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {atRiskProjects.map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* High Severity Risks */}
                <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-xl font-semibold">
                        High Priority Risks
                    </h2>
                    <div className="space-y-3">
                        {highSeverityRisks.length > 0 ? (
                            highSeverityRisks.map((risk) => (
                                <RiskCard key={risk.id} risk={risk} />
                            ))
                        ) : (
                            <Card>
                                <CardContent className="py-8 text-center text-muted-foreground">
                                    No high-severity risks at the moment
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Activity className="w-5 h-5" />
                        Recent Activity
                    </h2>
                    <Card>
                        <CardContent className="pt-6">
                            <ActivityTimeline
                                activities={mockActivities.slice(0, 6)}
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Missing Check-ins Alert */}
            {projectsMissingCheckIn.length > 0 && (
                <Card className="border-warning/30 bg-warning/5">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2 text-warning">
                            <ClipboardCheck className="w-5 h-5" />
                            Projects Missing Weekly Check-ins
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {projectsMissingCheckIn.map((project) => (
                                <Badge key={project.id} variant="outline">
                                    {project.name}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
