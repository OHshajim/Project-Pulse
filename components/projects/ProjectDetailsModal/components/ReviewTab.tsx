import { Badge } from '@/components/ui/badge';
import { getUserById } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { ClientFeedback, WeeklyCheckIn } from '@/types';
import { TabsContent } from '@radix-ui/react-tabs';
import { format } from 'date-fns';
import { AlertTriangle, FileText, Flag, Star, Target, ThumbsUp } from 'lucide-react';

const ReviewTab = ({ feedback , checkIns}) => {
    return (
        <TabsContent value="reviews" className="p-6 space-y-6 m-0">
            {/* Client Feedback */}
            <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Client Feedback ({feedback.length})
                </h3>
                {feedback.length > 0 ? (
                    <div className="space-y-4">
                        {feedback.map((f) => (
                            <FeedbackItem key={f.id} feedback={f} />
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
                            <CheckInItem key={c.id} checkIn={c} />
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
    );
};

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

export default ReviewTab;