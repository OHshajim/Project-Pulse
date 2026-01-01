"use client"
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    FolderKanban,
    ClipboardCheck,
    AlertTriangle,
    Users,
    LogOut,
    Activity,
    MessageSquare,
    Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useClerk, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function Sidebar() {
    const { user } = useUser();
    const { signOut } = useClerk();
    const location = usePathname();

    const adminLinks = [
        { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
        { to: "/projects", icon: FolderKanban, label: "Projects" },
        { to: "/risks", icon: AlertTriangle, label: "Risks" },
        { to: "/team", icon: Users, label: "Team" },
    ];

    const employeeLinks = [
        { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
        { to: "/projects", icon: FolderKanban, label: "My Projects" },
        { to: "/check-ins", icon: ClipboardCheck, label: "Check-ins" },
        { to: "/risks", icon: AlertTriangle, label: "Risks" },
    ];

    const clientLinks = [
        { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
        { to: "/projects", icon: FolderKanban, label: "My Projects" },
        { to: "/feedback", icon: MessageSquare, label: "Feedback" },
    ];

    const getLinks = () => {
        switch (user?.unsafeMetadata.role) {
            case "ADMIN":
                return adminLinks;
            case "EMPLOYEE":
                return employeeLinks;
            case "CLIENT":
                return clientLinks;
            default:
                return [];
        }
    };

    const links = getLinks();

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar text-sidebar-foreground flex flex-col z-50">
            {/* Logo */}
            <div className="p-6 border-b border-sidebar-border">
                <Link href={"/"}>
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sidebar-primary to-sidebar-primary/70 flex items-center justify-center shadow-lg">
                            <Activity className="w-5 h-5 text-sidebar-primary-foreground" />
                        </div>
                        <div>
                            <h1 className="font-bold text-lg text-sidebar-foreground tracking-tight">
                                ProjectPulse
                            </h1>
                            <p className="text-[11px] text-sidebar-foreground/50 font-medium">
                                Health Tracker
                            </p>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
                {links.map((link, index) => {
                    const isActive = location === link.to;
                    return (
                        <Link
                            key={link.to}
                            href={link.to}
                            style={{ animationDelay: `${index * 50}ms` }}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 animate-fade-in",
                                isActive
                                    ? "bg-sidebar-accent text-sidebar-primary shadow-soft"
                                    : "text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                            )}
                        >
                            <link.icon
                                className={cn(
                                    "w-5 h-5 transition-colors",
                                    isActive && "text-sidebar-primary"
                                )}
                            />
                            {link.label}
                            {isActive && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-sidebar-primary" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Pro Badge */}
            <div className="px-4 pb-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-sidebar-accent to-sidebar-accent/50 border border-sidebar-border">
                    <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-sidebar-primary" />
                        <span className="text-xs font-semibold text-sidebar-foreground">
                            Pro Features
                        </span>
                    </div>
                    <p className="text-[11px] text-sidebar-foreground/60 leading-relaxed">
                        Unlock advanced analytics and reports
                    </p>
                </div>
            </div>

            {/* User Section */}
            <div className="p-4 border-t border-sidebar-border">
                <div className="flex items-center gap-3 px-3 py-3 mb-2 rounded-xl bg-sidebar-accent/30">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sidebar-primary/30 to-sidebar-primary/10 text-sidebar-primary text-sm font-bold flex items-center justify-center">
                        {/* {user?.avatar} */}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate text-sidebar-foreground">
                            {user?.unsafeMetadata.name}
                        </p>
                        <p className="text-[11px] text-sidebar-foreground/50 capitalize font-medium">
                            {user?.unsafeMetadata.role}
                        </p>
                    </div>
                </div>
                <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 h-10"
                    onClick={() => signOut({ redirectUrl: "/" })}
                >
                    <LogOut className="w-4 h-4" />
                    Sign out
                </Button>
            </div>
        </aside>
    );
}
