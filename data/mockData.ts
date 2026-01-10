import { Activity, ClientFeedback, Project, Risk, User, WeeklyCheckIn } from "@/types";

export const mockUsers: User[] = [
    {
        id: "1",
        name: "Sarah Chen",
        email: "sarah@company.com",
        role: "ADMIN",
        avatar: "SC",
    },
    {
        id: "2",
        name: "Marcus Johnson",
        email: "marcus@company.com",
        role: "EMPLOYEE",
        avatar: "MJ",
    },
    {
        id: "3",
        name: "Emily Rodriguez",
        email: "emily@company.com",
        role: "EMPLOYEE",
        avatar: "ER",
    },
    {
        id: "4",
        name: "David Kim",
        email: "david@company.com",
        role: "EMPLOYEE",
        avatar: "DK",
    },
    {
        id: "5",
        name: "Alex Thompson",
        email: "alex@client.com",
        role: "CLIENT",
        avatar: "AT",
    },
    {
        id: "6",
        name: "Jordan Lee",
        email: "jordan@client.com",
        role: "CLIENT",
        avatar: "JL",
    },
];

export const mockProjects: Project[] = [
    {
        id: "1",
        name: "E-Commerce Platform Redesign",
        description:
            "Complete overhaul of the client's e-commerce platform with modern UI/UX and improved performance.",
        startDate: "2024-01-15",
        endDate: "2024-06-30",
        status: "on-track",
        healthScore: 87,
        clientId: "5",
        employeeIds: ["2", "3"],
        progress: 68,
    },
    {
        id: "2",
        name: "Mobile Banking App",
        description:
            "Native mobile application for banking operations with biometric authentication.",
        startDate: "2024-02-01",
        endDate: "2024-08-15",
        status: "at-risk",
        healthScore: 64,
        clientId: "6",
        employeeIds: ["2", "4"],
        progress: 42,
    },
    {
        id: "3",
        name: "Healthcare Dashboard",
        description:
            "Real-time patient monitoring dashboard for healthcare providers.",
        startDate: "2024-03-01",
        endDate: "2024-07-31",
        status: "critical",
        healthScore: 45,
        clientId: "5",
        employeeIds: ["3", "4"],
        progress: 28,
    },
    {
        id: "4",
        name: "Inventory Management System",
        description: "Cloud-based inventory tracking and management solution.",
        startDate: "2023-10-01",
        endDate: "2024-03-31",
        status: "completed",
        healthScore: 92,
        clientId: "6",
        employeeIds: ["2"],
        progress: 100,
    },
];

export const mockCheckIns: WeeklyCheckIn[] = [
    {
        id: "1",
        projectId: "1",
        employeeId: "2",
        weekOf: "2024-03-18",
        progressSummary:
            "Completed the product catalog redesign and started working on the checkout flow improvements.",
        blockers: "Waiting for final design assets from the client.",
        confidenceLevel: 4,
        completionPercentage: 68,
        createdAt: "2024-03-22T10:30:00Z",
    },
    {
        id: "2",
        projectId: "2",
        employeeId: "4",
        weekOf: "2024-03-18",
        progressSummary:
            "Implemented biometric authentication. Testing phase in progress.",
        blockers:
            "Performance issues on older Android devices need investigation.",
        confidenceLevel: 3,
        completionPercentage: 42,
        createdAt: "2024-03-21T15:45:00Z",
    },
    {
        id: "3",
        projectId: "3",
        employeeId: "3",
        weekOf: "2024-03-18",
        progressSummary:
            "Backend API integration ongoing. Facing challenges with real-time data sync.",
        blockers:
            "Hospital IT team availability is limited for integration testing.",
        confidenceLevel: 2,
        completionPercentage: 28,
        createdAt: "2024-03-20T09:15:00Z",
    },
];

export const mockFeedback: ClientFeedback[] = [
    {
        id: "1",
        projectId: "1",
        clientId: "5",
        weekOf: "2024-03-18",
        satisfactionRating: 5,
        communicationRating: 4,
        comments: "Great progress this week! The new designs look fantastic.",
        hasFlaggedIssue: false,
        createdAt: "2024-03-22T14:00:00Z",
    },
    {
        id: "2",
        projectId: "2",
        clientId: "6",
        weekOf: "2024-03-18",
        satisfactionRating: 3,
        communicationRating: 3,
        comments: "Concerned about the timeline. Need more frequent updates.",
        hasFlaggedIssue: true,
        createdAt: "2024-03-21T16:30:00Z",
    },
    {
        id: "3",
        projectId: "3",
        clientId: "5",
        weekOf: "2024-03-18",
        satisfactionRating: 2,
        communicationRating: 2,
        comments: "Integration delays are impacting our operations planning.",
        hasFlaggedIssue: true,
        createdAt: "2024-03-20T11:00:00Z",
    },
];

export const mockRisks: Risk[] = [
    {
        id: "1",
        projectId: "2",
        createdBy: "4",
        title: "Android Performance Issues",
        description:
            "Biometric authentication causes significant lag on Android devices older than 3 years.",
        severity: "medium",
        status: "open",
        mitigationPlan:
            "Implement fallback PIN authentication for older devices. Optimize native code.",
        createdAt: "2024-03-19T08:00:00Z",
    },
    {
        id: "2",
        projectId: "3",
        createdBy: "3",
        title: "Integration Dependency",
        description:
            "Hospital IT team availability is limiting our ability to test real-time data sync.",
        severity: "high",
        status: "open",
        mitigationPlan:
            "Request dedicated integration window. Prepare mock data for parallel testing.",
        createdAt: "2024-03-18T14:00:00Z",
    },
    {
        id: "3",
        projectId: "3",
        createdBy: "4",
        title: "Data Privacy Compliance",
        description:
            "HIPAA compliance requirements need additional security audit.",
        severity: "high",
        status: "open",
        mitigationPlan:
            "Engage external security auditor. Implement additional encryption layers.",
        createdAt: "2024-03-15T10:00:00Z",
    },
    {
        id: "4",
        projectId: "1",
        createdBy: "2",
        title: "Design Asset Delays",
        description:
            "Client taking longer than expected to provide final design assets.",
        severity: "low",
        status: "resolved",
        mitigationPlan:
            "Proceed with placeholder assets. Weekly design review meetings.",
        createdAt: "2024-03-10T09:00:00Z",
        resolvedAt: "2024-03-20T12:00:00Z",
    },
];

export const mockActivities: Activity[] = [
    {
        id: "1",
        projectId: "1",
        type: "check-in",
        userId: "2",
        description: "Marcus submitted weekly check-in",
        timestamp: "2024-03-22T10:30:00Z",
    },
    {
        id: "2",
        projectId: "1",
        type: "feedback",
        userId: "5",
        description: "Alex provided weekly feedback (5/5 satisfaction)",
        timestamp: "2024-03-22T14:00:00Z",
    },
    {
        id: "3",
        projectId: "2",
        type: "risk",
        userId: "4",
        description: "David reported new risk: Android Performance Issues",
        timestamp: "2024-03-19T08:00:00Z",
    },
    {
        id: "4",
        projectId: "2",
        type: "check-in",
        userId: "4",
        description: "David submitted weekly check-in",
        timestamp: "2024-03-21T15:45:00Z",
    },
    {
        id: "5",
        projectId: "2",
        type: "feedback",
        userId: "6",
        description: "Jordan flagged an issue in feedback",
        timestamp: "2024-03-21T16:30:00Z",
    },
    {
        id: "6",
        projectId: "3",
        type: "risk",
        userId: "3",
        description: "Emily reported high-severity risk",
        timestamp: "2024-03-18T14:00:00Z",
    },
    {
        id: "7",
        projectId: "3",
        type: "status-change",
        userId: "1",
        description: "Project status changed to Critical",
        timestamp: "2024-03-20T09:00:00Z",
    },
    {
        id: "8",
        projectId: "4",
        type: "status-change",
        userId: "1",
        description: "Project marked as Completed",
        timestamp: "2024-03-31T17:00:00Z",
    },
];

export function getUserById(id: string): User | undefined {
    return mockUsers.find((u) => u.id === id);
}

export function getProjectById(id: string): Project | undefined {
    return mockProjects.find((p) => p.id === id);
}

export function getProjectsForUser(userId: string, role: string): Project[] {
    if (role === "ADMIN") return mockProjects;
    if (role === "CLIENT")
        return mockProjects.filter((p) => p.clientId === userId);
    if (role === "EMPLOYEE")
        return mockProjects.filter((p) => p.employeeIds.includes(userId));
    return [];
}

export function getRisksForProject(projectId: string): Risk[] {
    return mockRisks.filter((r) => r.projectId === projectId);
}

export function getActivitiesForProject(projectId: string): Activity[] {
    return mockActivities
        .filter((a) => a.projectId === projectId)
        .sort(
            (a, b) =>
                new Date(b.timestamp).getTime() -
                new Date(a.timestamp).getTime()
        );
}
