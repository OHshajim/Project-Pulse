"use client"
import { useState } from "react";
import {
    getProjectsForUser,
    mockCheckIns,
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
import { Slider } from "@/components/ui/slider";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ClipboardCheck, Send, Calendar } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

export default function CheckIns() {
    const { user } = useUser();
    const myProjects = getProjectsForUser(user?.id || "", "employee").filter(
        (p) => p.status !== "completed"
    );

    const [selectedProject, setSelectedProject] = useState("");
    const [progressSummary, setProgressSummary] = useState("");
    const [blockers, setBlockers] = useState("");
    const [confidence, setConfidence] = useState([3]);
    const [completion, setCompletion] = useState([50]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.info("Check-in Submitted");
        // Reset form
        setSelectedProject("");
        setProgressSummary("");
        setBlockers("");
        setConfidence([3]);
        setCompletion([50]);
    };

    const myRecentCheckIns = mockCheckIns
        .filter((c) => c.employeeId === user?.id)
        .sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
        );

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Weekly Check-ins</h1>
                <p className="text-muted-foreground mt-1">
                    Submit your weekly progress updates
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Check-in Form */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <ClipboardCheck className="w-5 h-5 text-primary" />
                                New Check-in
                            </CardTitle>
                            <CardDescription>
                               {` Share your progress and any blockers you're
                                facing`}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >
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
                                <div className="space-y-2">
                                    <Label>Progress Summary</Label>
                                    <Textarea
                                        placeholder="What did you accomplish this week?"
                                        value={progressSummary}
                                        onChange={(e) =>
                                            setProgressSummary(
                                                e.target.value
                                            )
                                        }
                                        rows={4}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Blockers & Challenges</Label>
                                    <Textarea
                                        placeholder="Any obstacles or challenges you're facing?"
                                        value={blockers}
                                        onChange={(e) =>
                                            setBlockers(e.target.value)
                                        }
                                        rows={3}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <Label>Confidence Level</Label>
                                            <span className="text-sm font-medium text-primary">
                                                {confidence[0]}/5
                                            </span>
                                        </div>
                                        <Slider
                                            value={confidence}
                                            onValueChange={setConfidence}
                                            min={1}
                                            max={5}
                                            step={1}
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            How confident are you about
                                            meeting deadlines?
                                        </p>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <Label>
                                                Completion Percentage
                                            </Label>
                                            <span className="text-sm font-medium text-primary">
                                                {completion[0]}%
                                            </span>
                                        </div>
                                        <Slider
                                            value={completion}
                                            onValueChange={setCompletion}
                                            min={0}
                                            max={100}
                                            step={5}
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Estimated overall project
                                            completion
                                        </p>
                                    </div>
                                </div>
                                <Button type="submit" className="w-full">
                                    <Send className="w-4 h-4 mr-2" />
                                    Submit Check-in
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
                {/* Recent Check-ins */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold">
                        Recent Check-ins
                    </h2>
                    <div className="space-y-3">
                        {myRecentCheckIns.map((checkIn) => {
                            const project = mockProjects.find(
                                (p) => p.id === checkIn.projectId
                            );
                            return (
                                <Card
                                    key={checkIn.id}
                                    className="animate-fade-in"
                                >
                                    <CardContent className="pt-4">
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="font-medium text-sm">
                                                {project?.name}
                                            </h3>
                                            <Badge
                                                variant="muted"
                                                className="text-[10px]"
                                            >
                                                <Calendar className="w-3 h-3 mr-1" />
                                                {checkIn.weekOf}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                                            {checkIn.progressSummary}
                                        </p>
                                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <span className="w-2 h-2 rounded-full bg-primary" />
                                                Confidence:{" "}
                                                {checkIn.confidenceLevel}/5
                                            </span>
                                            <span>
                                                {
                                                    checkIn.completionPercentage
                                                }
                                                % done
                                            </span>
                                        </div>
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
