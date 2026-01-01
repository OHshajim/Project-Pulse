"use client"
import { Sidebar } from "@/components/dashboard/Sidebar";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function MarketingLayout({
        children,
    }: {
        children: React.ReactNode;
    }) {
        const { isSignedIn } = useAuth();
        if (!isSignedIn) redirect("/login");
        return (
            <div className="min-h-screen bg-background">
                <Sidebar />
                <main className="pl-64">
                    <div className="p-8 max-w-400 mx-auto">
                        <div className="animate-fade-in">{children}</div>
                    </div>
                </main>
            </div>
        );
    }
