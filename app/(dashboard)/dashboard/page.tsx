"use client"
import { AdminDashboard } from "@/components/dashboard/AdminDashboard";
import { ClientDashboard } from "@/components/dashboard/ClientDashboard";
import { EmployeeDashboard } from "@/components/dashboard/EmployeeDashboard";
import { useUser } from "@clerk/nextjs";

export default function Dashboard() {
    const { user } = useUser();
    const renderDashboard = () => {
        switch (user?.unsafeMetadata.role) {
            case "ADMIN":
                return <AdminDashboard />;
            case "EMPLOYEE":
                return <EmployeeDashboard />;
            case "CLIENT":
                return <ClientDashboard />;
            default:
                return null;
        }
    };
    return <div>{renderDashboard()}</div>;
};
