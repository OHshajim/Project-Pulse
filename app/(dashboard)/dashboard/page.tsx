"use client"
import { AdminDashboard } from "@/components/dashboard/AdminDashboard";
import { ClientDashboard } from "@/components/dashboard/ClientDashboard";
import { EmployeeDashboard } from "@/components/dashboard/EmployeeDashboard";
import { useUser } from "@clerk/nextjs";

export default function Dashboard() {
    const { user } = useUser();
    const renderDashboard = () => {
        switch (user?.unsafeMetadata.role) {
            case "admin":
                return <AdminDashboard />;
            case "employee":
                return <EmployeeDashboard />;
            case "client":
                return <ClientDashboard />;
            default:
                return null;
        }
    };
    return <div>{renderDashboard()}</div>;
};
