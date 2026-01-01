"use client"
import { useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { getProjectsForUser } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";

export default function Projects() {
    const { user } = useUser();
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");

    const allProjects = getProjectsForUser(
        user?.id || "",
        user?.unsafeMetadata.role || "employee"
    );

    const filteredProjects = allProjects.filter((project) => {
        const matchesSearch =
            project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
        const matchesStatus =
            statusFilter === "all" || project.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const statuses = ["all", "on-track", "at-risk", "critical", "completed"];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        {user?.unsafeMetadata.role === "admin"
                            ? "All Projects"
                            : "My Projects"}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        {allProjects.length} project
                        {allProjects.length !== 1 ? "s" : ""} total
                    </p>
                </div>
                {user?.unsafeMetadata.role === "admin" && (
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        New Project
                    </Button>
                )}
            </div>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search projects..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-muted-foreground" />
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
                                className={cn(
                                    "capitalize text-xs",
                                    statusFilter === status && "shadow-soft"
                                )}
                            >
                                {status === "all"
                                    ? "All"
                                    : status.replace("-", " ")}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
            {/* Projects Grid */}
            {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filteredProjects.map((project, index) => (
                        <div
                            key={project.id}
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <ProjectCard project={project} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">
                        No projects found matching your criteria.
                    </p>
                </div>
            )}
        </div>
    );
}
