import { TabsContent } from '@/components/ui/tabs';
import { getUserById } from '@/data/mockData';
import { format } from 'date-fns';
import { Activity, AlertTriangle, FileText, MessageSquare } from 'lucide-react';

const ActivityTab = ({ activities }) => {
    return (
        <TabsContent value="activity" className="p-6 m-0">
            {activities.length > 0 ? (
                <div className="relative">
                    <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />
                    <div className="space-y-4">
                        {activities.map((activity, index) => {
                            const activityUser = getUserById(activity.userId);
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
                                        animationDelay: `${index * 50}ms`,
                                    }}
                                >
                                    <div className="absolute left-3 w-5 h-5 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                                        <Icon className="w-2.5 h-2.5 text-primary" />
                                    </div>
                                    <div className="flex-1 p-3 rounded-lg bg-muted/30 border border-border">
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="w-6 h-6 rounded-md bg-muted flex items-center justify-center text-[10px] font-medium">
                                                {activityUser?.avatar || "?"}
                                            </div>
                                            <span className="text-sm font-medium">
                                                {activityUser?.name}
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {activity.description}
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-2">
                                            {format(
                                                new Date(activity.timestamp),
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
    );
};

export default ActivityTab;