import { HealthScore } from "@/components/HealthScore";
import { Progress } from "@/components/ui/progress";
import { TabsContent } from "@/components/ui/tabs";
import { AlertTriangle, Calendar, Clock, FileText, MessageSquare, Star, Target, ThumbsUp, TrendingUp } from "lucide-react";
import { format } from "date-fns";

const OverviewTab = ({ feedback, project, checkIns, openRisks }) => {
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

    const endDate = new Date(project.endDate);
    const today = new Date();
    const daysRemaining = Math.ceil(
        (endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    return (
        <TabsContent value="overview" className="p-6 space-y-6 m-0">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-muted/30 border border-border text-center">
                    <TrendingUp className="w-5 h-5 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold text-primary">
                        {project.progress}%
                    </p>
                    <p className="text-xs text-muted-foreground">Progress</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/30 border border-border text-center">
                    <Star className="w-5 h-5 mx-auto mb-2 text-warning" />
                    <p className="text-2xl font-bold">{avgSatisfaction}</p>
                    <p className="text-xs text-muted-foreground">
                        Avg. Satisfaction
                    </p>
                </div>
                <div className="p-4 rounded-xl bg-muted/30 border border-border text-center">
                    <AlertTriangle className="w-5 h-5 mx-auto mb-2 text-critical" />
                    <p className="text-2xl font-bold">{openRisks.length}</p>
                    <p className="text-xs text-muted-foreground">Open Risks</p>
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
                        <span className="font-medium">Project Progress</span>
                    </div>
                    <span className="text-lg font-bold text-primary">
                        {project.progress}%
                    </span>
                </div>
                <Progress value={project.progress} className="h-3 mb-2" />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{project.progress}% completed</span>
                    <span>{100 - project.progress}% remaining</span>
                </div>
            </div>

            {/* Timeline & Health */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-muted/30 border border-border">
                    <div className="flex items-center gap-2 mb-4">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">Timeline</span>
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
                                    (new Date(project.endDate).getTime() -
                                        new Date(project.startDate).getTime()) /
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
                        <span className="font-medium">Health Metrics</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <HealthScore score={project.healthScore} size="md" />
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <MessageSquare className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm">
                                    {avgCommunication}/5 Communication
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
    );
};

export default OverviewTab;