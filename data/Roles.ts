import { Shield, Users, Briefcase } from "lucide-react";
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
