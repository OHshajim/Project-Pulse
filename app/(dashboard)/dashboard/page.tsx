"use client"
import { EmployeeDashboard } from "@/components/dashboard/EmployeeDashboard";
import { useUser } from "@clerk/nextjs";

export default function Dashboard() {
    const { user } = useUser();
    const renderDashboard = () => {
        switch (user?.unsafeMetadata.role) {
            case "admin":
                return < ></>;
            case "employee":
                return <EmployeeDashboard />;
            case "client":
                return <></>;
            default:
                return null;
        }
    };
    return <div>{renderDashboard()}</div>;
};
