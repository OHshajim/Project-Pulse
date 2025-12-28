import { Shield, Users, Briefcase } from "lucide-react";
export const roles: {
    role: string;
    label: string;
    icon: typeof Shield;
    description: string;
}[] = [
    {
        role: "admin",
        label: "Admin",
        icon: Shield,
        description: "Full system access",
    },
    {
        role: "employee",
        label: "Employee",
        icon: Briefcase,
        description: "Project check-ins & risks",
    },
    {
        role: "client",
        label: "Client",
        icon: Users,
        description: "View projects & feedback",
    },
];
