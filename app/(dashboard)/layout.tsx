"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isLoaded, isSignedIn } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.push("/login");
        }
    }, [isLoaded, isSignedIn, router]);

    if (!isLoaded || !isSignedIn) {
        return <div>Loading...</div>; // Prevent flash of unauthorized content
    }

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
