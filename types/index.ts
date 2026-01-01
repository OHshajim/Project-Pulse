export type UserRole = "admin" | "employee" | "client";

export type ProjectStatus = "on-track" | "at-risk" | "critical" | "completed";

export type RiskSeverity = "low" | "medium" | "high";

export type RiskStatus = "open" | "resolved";

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    status: ProjectStatus;
    healthScore: number;
    clientId: string;
    employeeIds: string[];
    progress: number;
}

export interface WeeklyCheckIn {
    id: string;
    projectId: string;
    employeeId: string;
    weekOf: string;
    progressSummary: string;
    blockers: string;
    confidenceLevel: 1 | 2 | 3 | 4 | 5;
    completionPercentage: number;
    createdAt: string;
}

export interface ClientFeedback {
    id: string;
    projectId: string;
    clientId: string;
    weekOf: string;
    satisfactionRating: 1 | 2 | 3 | 4 | 5;
    communicationRating: 1 | 2 | 3 | 4 | 5;
    comments?: string;
    hasFlaggedIssue: boolean;
    createdAt: string;
}

export interface Risk {
    id: string;
    projectId: string;
    createdBy: string;
    title: string;
    description: string;
    severity: RiskSeverity;
    status: RiskStatus;
    mitigationPlan: string;
    createdAt: string;
    resolvedAt?: string;
}

export interface Activity {
    id: string;
    projectId: string;
    type: "check-in" | "feedback" | "risk" | "status-change";
    userId: string;
    description: string;
    timestamp: string;
}

export function getHealthColor(score: number): string {
    if (score >= 80) return "health-excellent";
    if (score >= 60) return "health-warning";
    return "health-critical";
}

export function getHealthLabel(score: number): string {
    if (score >= 80) return "On Track";
    if (score >= 60) return "At Risk";
    return "Critical";
}

export function getStatusColor(status: ProjectStatus): string {
    switch (status) {
        case "on-track":
            return "bg-success text-success-foreground";
        case "at-risk":
            return "bg-warning text-warning-foreground";
        case "critical":
            return "bg-critical text-critical-foreground";
        case "completed":
            return "bg-primary text-primary-foreground";
    }
}
