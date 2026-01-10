"use client";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Send,
    Loader2,
    ShieldAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { severityOptions } from "@/data/Roles";
import { postRiskData } from "@/data/riskData";
import { useUser } from "@clerk/nextjs";

interface ReportRiskModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    defaultProjectId?: string;
    projects: Array<{ _id: string; name: string }>;
}

export function ReportRiskModal({
    open,
    onOpenChange,
    defaultProjectId,
    projects
}: ReportRiskModalProps) {
    const {user} = useUser()
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        projectId: defaultProjectId || "",
        title: "",
        description: "",
        severity: "",
        mitigationPlan: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (
            !formData.projectId ||
            !formData.title ||
            !formData.description ||
            !formData.severity
        ) {
            toast.info("Please fill in all required fields.");
            return;
        }

        setIsSubmitting(true);

        try {
            await postRiskData({ ...formData, createdBy: user?.id });
        } catch (error) {
            toast.error("An error occurred while submitting the risk.");
            setIsSubmitting(false);
            return;
        }

        toast.success("The risk has been logged and the team has been notified.");

        setIsSubmitting(false);
        setFormData({
            projectId: "",
            title: "",
            description: "",
            severity: "",
            mitigationPlan: "",
        });
        onOpenChange(false);
    };

    const handleClose = () => {
        if (!isSubmitting) {
            setFormData({
                projectId: defaultProjectId || "",
                title: "",
                description: "",
                severity: "",
                mitigationPlan: "",
            });
            onOpenChange(false);
        }
    };
    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-135 gap-0 p-0 overflow-hidden">
                {/* Header with gradient */}
                <div className="relative bg-linear-to-r from-critical/10 via-warning/10 to-critical/5 p-6 border-b border-border">
                    <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                    <DialogHeader className="relative">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2.5 rounded-xl bg-critical/10 border border-critical/20">
                                <ShieldAlert className="w-5 h-5 text-critical" />
                            </div>
                            <div>
                                <DialogTitle className="text-xl">
                                    Report a Risk
                                </DialogTitle>
                                <DialogDescription className="mt-1">
                                    Identify potential issues before they become
                                    problems
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Project Selection */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">
                            Project <span className="text-critical">*</span>
                        </Label>
                        <Select
                            value={formData.projectId}
                            onValueChange={(value) =>
                                setFormData({ ...formData, projectId: value })
                            }
                        >
                            <SelectTrigger className="h-11">
                                <SelectValue placeholder="Select a project" />
                            </SelectTrigger>
                            <SelectContent>
                                {projects.map((project,i) => (
                                    <SelectItem
                                        key={i}
                                        value={project._id}
                                    >
                                        {project.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Risk Title */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">
                            Risk Title <span className="text-critical">*</span>
                        </Label>
                        <Input
                            placeholder="Brief description of the risk"
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    title: e.target.value,
                                })
                            }
                            className="h-11"
                        />
                    </div>

                    {/* Severity Selection */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">
                            Severity Level{" "}
                            <span className="text-critical">*</span>
                        </Label>
                        <div className="grid grid-cols-3 gap-3">
                            {severityOptions.map((option) => {
                                const Icon = option.icon;
                                const isSelected = formData.severity === option.value;
                                return (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() =>
                                            setFormData({
                                                ...formData,
                                                severity: option.value,
                                            })
                                        }
                                        className={cn(
                                            "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200",
                                            isSelected
                                                ? `${option.bg} border-current ${option.color}`
                                                : "border-border hover:border-muted-foreground/30 bg-background"
                                        )}
                                    >
                                        <Icon
                                            className={cn(
                                                "w-5 h-5",
                                                isSelected
                                                    ? option.color
                                                    : "text-muted-foreground"
                                            )}
                                        />
                                        <span
                                            className={cn(
                                                "text-sm font-medium",
                                                isSelected
                                                    ? option.color
                                                    : "text-foreground"
                                            )}
                                        >
                                            {option.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">
                            Description <span className="text-critical">*</span>
                        </Label>
                        <Textarea
                            placeholder="Provide details about the risk, its potential impact, and how it was identified..."
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    description: e.target.value,
                                })
                            }
                            rows={3}
                            className="resize-none"
                        />
                    </div>

                    {/* Mitigation Plan */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">
                            Suggested Mitigation{" "}
                            <span className="text-muted-foreground text-xs">
                                (Optional)
                            </span>
                        </Label>
                        <Textarea
                            placeholder="What steps could be taken to prevent or minimize this risk?"
                            value={formData.mitigationPlan}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    mitigationPlan: e.target.value,
                                })
                            }
                            rows={2}
                            className="resize-none"
                        />
                    </div>

                    <DialogFooter className="pt-4 gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            disabled={isSubmitting}
                            className="flex-1 sm:flex-none"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 sm:flex-none bg-critical hover:bg-critical/90"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <Send className="w-4 h-4 mr-2" />
                                    Report Risk
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
