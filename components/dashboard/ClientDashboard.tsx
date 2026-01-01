import {
    getProjectsForUser,
    mockFeedback,
    mockActivities,
} from "@/data/mockData";
import { StatsCard } from "@/components/StatsCard";
import { ProjectCard } from "@/components/ProjectCard";
import { ActivityTimeline } from "@/components/ActivityTimeline";
import { HealthScore } from "@/components/HealthScore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    FolderKanban,
    MessageSquare,
    TrendingUp,
    Plus,
    Star,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";

export function ClientDashboard() {
    const { user } = useUser();
    const myProjects = getProjectsForUser(user?.id || "", "client");
    const myFeedback = mockFeedback.filter((f) => f.clientId === user?.id);

    const activeProjects = myProjects.filter((p) => p.status !== "completed");
    const avgHealthScore =
        activeProjects.length > 0
            ? Math.round(
                  activeProjects.reduce((sum, p) => sum + p.healthScore, 0) /
                      activeProjects.length
              )
            : 0;

    // Projects needing feedback this week
    const projectsNeedingFeedback = activeProjects.filter(
        (p) =>
            !myFeedback.some(
                (f) => f.projectId === p.id && f.weekOf === "2024-03-18"
            )
    );

    const projectActivities = mockActivities.filter((a) =>
        myProjects.some((p) => p.id === a.projectId)
    );

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        Welcome back, {user?.unsafeMetadata.name}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                       {` Here's an overview of your projects and feedback.`}
                    </p>
                </div>
                <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Submit Feedback
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatsCard
                    title="Active Projects"
                    value={activeProjects.length}
                    subtitle={`${
                        myProjects.filter((p) => p.status === "completed")
                            .length
                    } completed`}
                    icon={FolderKanban}
                />
                <StatsCard
                    title="Portfolio Health"
                    value={`${avgHealthScore}%`}
                    icon={TrendingUp}
                    variant={
                        avgHealthScore >= 70
                            ? "success"
                            : avgHealthScore >= 50
                            ? "warning"
                            : "critical"
                    }
                />
                <StatsCard
                    title="Feedback Pending"
                    value={projectsNeedingFeedback.length}
                    subtitle="This week"
                    icon={MessageSquare}
                    variant={
                        projectsNeedingFeedback.length > 0
                            ? "warning"
                            : "success"
                    }
                />
            </div>

            {/* Feedback Prompt */}
            {projectsNeedingFeedback.length > 0 && (
                <Card className="border-primary/30 bg-primary/5">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-primary" />
                            Your Feedback Matters
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-3">
                            Help us improve! Share your feedback for these
                            projects this week.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {projectsNeedingFeedback.map((project) => (
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

            {/* Portfolio Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-xl font-semibold">Your Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {activeProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>

                    {myProjects.filter((p) => p.status === "completed").length >
                        0 && (
                        <div className="pt-4">
                            <h3 className="text-sm font-medium text-muted-foreground mb-3">
                                Completed Projects
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {myProjects
                                    .filter((p) => p.status === "completed")
                                    .map((project) => (
                                        <ProjectCard
                                            key={project.id}
                                            project={project}
                                        />
                                    ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6">
                    {/* Overall Health */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">
                                Portfolio Health
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex justify-center py-4">
                            <HealthScore score={avgHealthScore} size="lg" />
                        </CardContent>
                    </Card>

                    {/* Recent Feedback */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">
                                Your Recent Feedback
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {myFeedback.slice(0, 3).map((feedback) => {
                                const project = myProjects.find(
                                    (p) => p.id === feedback.projectId
                                );
                                return (
                                    <div
                                        key={feedback.id}
                                        className="p-3 rounded-lg bg-muted/50"
                                    >
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-medium truncate">
                                                {project?.name}
                                            </span>
                                            <div className="flex items-center gap-1 text-warning">
                                                <Star className="w-3 h-3 fill-current" />
                                                <span className="text-xs">
                                                    {
                                                        feedback.satisfactionRating
                                                    }
                                                    /5
                                                </span>
                                            </div>
                                        </div>
                                        {feedback.comments && (
                                            <p className="text-xs text-muted-foreground line-clamp-2">
                                                {feedback.comments}
                                            </p>
                                        )}
                                        <p className="text-[10px] text-muted-foreground mt-1">
                                            Week of {feedback.weekOf}
                                        </p>
                                    </div>
                                );
                            })}
                        </CardContent>
                    </Card>

                    {/* Project Activity */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">
                                Recent Activity
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ActivityTimeline
                                activities={projectActivities.slice(0, 5)}
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
