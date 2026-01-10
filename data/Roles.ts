import { Shield, Users, Briefcase, AlertCircle, AlertTriangle, Flame } from "lucide-react";
export const roles: {
    role: string;
    label: string;
    icon: typeof Shield;
    description: string;
}[] = [
    {
        role: "EMPLOYEE",
        label: "Employee",
        icon: Briefcase,
        description: "Project check-ins & risks",
    },
    {
        role: "CLIENT",
        label: "Client",
        icon: Users,
        description: "View projects & feedback",
    },
];

export const severityOptions = [
    {
        value: "low",
        label: "Low",
        icon: AlertCircle,
        color: "text-muted-foreground",
        bg: "bg-muted",
    },
    {
        value: "medium",
        label: "Medium",
        icon: AlertTriangle,
        color: "text-warning",
        bg: "bg-warning/10",
    },
    {
        value: "high",
        label: "High",
        icon: Flame,
        color: "text-critical",
        bg: "bg-critical/10",
    },
];