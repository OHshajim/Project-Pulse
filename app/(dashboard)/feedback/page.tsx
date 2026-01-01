"use client";
import { useState } from "react";
import {
    getProjectsForUser,
    mockFeedback,
    mockProjects,
} from "@/data/mockData";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { MessageSquare, Send, Star, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { StarRating } from "@/components/ui/StarRating";

export default function Feedback() {
    const { user } = useUser();
    const myProjects = getProjectsForUser(user?.id || "", "client").filter(
        (p) => p.status !== "completed"
    );

    const [selectedProject, setSelectedProject] = useState("");
    const [satisfaction, setSatisfaction] = useState(0);
    const [communication, setCommunication] = useState(0);
    const [comments, setComments] = useState("");
    const [flagIssue, setFlagIssue] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedProject || !satisfaction || !communication) {
            toast.info("Please select a project and provide ratings.");
            return;
        }
        toast.success("Thank you for your feedback!");
        // Reset form
        setSelectedProject("");
        setSatisfaction(0);
        setCommunication(0);
        setComments("");
        setFlagIssue(false);
    };

    const myRecentFeedback = mockFeedback
        .filter((f) => f.clientId === user?.id)
        .sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
        );

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Project Feedback</h1>
                <p className="text-muted-foreground mt-1">
                    Share your experience with our team
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Feedback Form */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-primary" />
                                Weekly Feedback
                            </CardTitle>
                            <CardDescription>
                                Your feedback helps us improve project delivery
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Project</Label>
                                    <Select
                                        value={selectedProject}
                                        onValueChange={setSelectedProject}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a project" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {myProjects.map((project) => (
                                                <SelectItem
                                                    key={project.id}
                                                    value={project.id}
                                                >
                                                    {project.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <StarRating
                                        value={satisfaction}
                                        onChange={setSatisfaction}
                                        label="Overall Satisfaction"
                                    />
                                    <StarRating
                                        value={communication}
                                        onChange={setCommunication}
                                        label="Communication Quality"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>
                                        Additional Comments (Optional)
                                    </Label>
                                    <Textarea
                                        placeholder="Share any specific feedback, concerns, or suggestions..."
                                        value={comments}
                                        onChange={(e) =>
                                            setComments(e.target.value)
                                        }
                                        rows={4}
                                    />
                                </div>
                                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={cn(
                                                "p-2 rounded-lg",
                                                flagIssue
                                                    ? "bg-critical/10 text-critical"
                                                    : "bg-muted text-muted-foreground"
                                            )}
                                        >
                                            <AlertTriangle className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">
                                                Flag an Issue
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Alert the team to a critical
                                                concern
                                            </p>
                                        </div>
                                    </div>
                                    <Switch
                                        checked={flagIssue}
                                        onCheckedChange={setFlagIssue}
                                    />
                                </div>
                                <Button type="submit" className="w-full">
                                    <Send className="w-4 h-4 mr-2" />
                                    Submit Feedback
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
                {/* Recent Feedback */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold">
                        Your Feedback History
                    </h2>
                    <div className="space-y-3">
                        {myRecentFeedback.map((feedback) => {
                            const project = mockProjects.find(
                                (p) => p.id === feedback.projectId
                            );
                            return (
                                <Card
                                    key={feedback.id}
                                    className="animate-fade-in"
                                >
                                    <CardContent className="pt-4">
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="font-medium text-sm">
                                                {project?.name}
                                            </h3>
                                            {feedback.hasFlaggedIssue && (
                                                <Badge
                                                    variant="critical"
                                                    className="text-[10px]"
                                                >
                                                    <AlertTriangle className="w-3 h-3 mr-1" />
                                                    Flagged
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-4 mb-2">
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={cn(
                                                            "w-3 h-3",
                                                            i <
                                                                feedback.satisfactionRating
                                                                ? "text-warning fill-current"
                                                                : "text-muted"
                                                        )}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-xs text-muted-foreground">
                                                Week of {feedback.weekOf}
                                            </span>
                                        </div>
                                        {feedback.comments && (
                                            <p className="text-sm text-muted-foreground line-clamp-2">
                                                {feedback.comments}
                                            </p>
                                        )}
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
