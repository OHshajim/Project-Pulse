"use client";
import { useEffect, useState } from "react";
import { RiskCard } from "@/components/RiskCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Filter } from "lucide-react";
import { Risk } from "@/types";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { ViewRiskModal } from "@/components/risk/ViewRiskModal";
import { ReportRiskModal } from "@/components/risk/ReportRiskModal";
import { getAllProjects } from "@/data/projectData";
import { getAllRisks } from "@/data/riskData";

export default function Risks() {
    const { user } = useUser();
    const [projects, setProjects] = useState([]);
    const [risks, setRisks] = useState<Risk[]>([]);
    const [severityFilter, setSeverityFilter] = useState<string>("all");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [reportRiskOpen, setReportRiskOpen] = useState(false);
    const [viewRiskOpen, setViewRiskOpen] = useState(false);
    const [selectedRisk, setSelectedRisk] = useState<Risk | null>(null);

    const filteredRisks = risks.filter((risk) => {
        const matchesSeverity =
            severityFilter === "all" || risk.severity === severityFilter;
        const matchesStatus =
            statusFilter === "all" || risk.status === statusFilter;
        return matchesSeverity && matchesStatus;
    });

    const severities = ["all", "high", "medium", "low"];
    const statuses = ["all", "open", "resolved"];

    const getSeverityCount = (severity: string) => {
        if (severity === "all")
            return risks.filter((r) => r.status === "open").length;
        return risks.filter(
            (r) => r.severity === severity && r.status === "open"
        ).length;
    };

    const handleRiskClick = (risk: Risk) => {
        setSelectedRisk(risk);
        setViewRiskOpen(true);
    };

    const handleResolveRisk = () => {
        toast.info("The risk has been marked as resolved.",{ duration: 4000 });
    };
    
    useEffect(() => {
        const loadProjects = async () => {
            const { projects } = await getAllProjects(user?.id || "");
            setProjects(projects??[]);
        };
        const loadTasks = async () => {
            const res = await getAllRisks(user?.id || "");
            setRisks(res.risks ?? []);
        };
        loadProjects();
        loadTasks();
    }, [user?.id]);

    return (
        <div>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Risk Management</h1>
                        <p className="text-muted-foreground mt-1">
                            Track and manage project risks
                        </p>
                    </div>
                    {user?.unsafeMetadata.role === "ADMIN" && (
                        <Button onClick={() => setReportRiskOpen(true)}>
                            <Plus className="w-4 h-4 mr-2" />
                            Report Risk
                        </Button>
                    )}
                </div>

                {/* Risk Summary */}
                <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                        <Badge variant="critical" className="px-3 py-1">
                            {getSeverityCount("high")} High
                        </Badge>
                        <Badge variant="warning" className="px-3 py-1">
                            {getSeverityCount("medium")} Medium
                        </Badge>
                        <Badge variant="muted" className="px-3 py-1">
                            {getSeverityCount("low")} Low
                        </Badge>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                            Severity:
                        </span>
                        <div className="flex gap-1">
                            {severities.map((severity) => (
                                <Button
                                    key={severity}
                                    variant={
                                        severityFilter === severity
                                            ? "default"
                                            : "ghost"
                                    }
                                    size="sm"
                                    onClick={() => setSeverityFilter(severity)}
                                    className="capitalize text-xs"
                                >
                                    {severity}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                            Status:
                        </span>
                        <div className="flex gap-1">
                            {statuses.map((status) => (
                                <Button
                                    key={status}
                                    variant={
                                        statusFilter === status
                                            ? "default"
                                            : "ghost"
                                    }
                                    size="sm"
                                    onClick={() => setStatusFilter(status)}
                                    className="capitalize text-xs"
                                >
                                    {status}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Risks Grid */}
                {filteredRisks.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {filteredRisks.map((risk, index) => (
                            <div
                                key={risk._id}
                                style={{ animationDelay: `${index * 50}ms` }}
                                onClick={() => handleRiskClick(risk)}
                                className="cursor-pointer"
                            >
                                <RiskCard risk={risk} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">
                            No risks found matching your filters.
                        </p>
                    </div>
                )}
            </div>

            {/* Modals */}
            <ReportRiskModal
                open={reportRiskOpen}
                onOpenChange={setReportRiskOpen}
                projects={projects}
            />
            <ViewRiskModal
                open={viewRiskOpen}
                onOpenChange={setViewRiskOpen}
                risk={selectedRisk}
                onResolve={handleResolveRisk}
            />
        </div>
    );
}
