"use client";
import { useState } from "react";
// import { useAuth } from "@/contexts/AuthContext";
// import { UserRole } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Activity, Shield, Users, Briefcase, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Login() {
    const [email, setEmail] = useState("");
    const [selectedRole, setSelectedRole] = useState("admin");
    const [isLoading, setIsLoading] = useState(false);
    // const { login } = useAuth();
    // const navigate = useNavigate();
    // const { toast } = useToast();

    const roles: {
        role: string;
        // role: UserRole;
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

    // const demoEmails: Record<UserRole, string> = {
    //     admin: "sarah@company.com",
    //     employee: "marcus@company.com",
    //     client: "alex@client.com",
    // };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // // Simulate loading
        // await new Promise((resolve) => setTimeout(resolve, 500));

        // const success = login(email || demoEmails[selectedRole], selectedRole);

        // if (success) {
        //     toast({
        //         title: "Welcome back!",
        //         description: `Logged in as ${selectedRole}`,
        //     });
        //     navigate("/dashboard");
        // } else {
        //     toast({
        //         title: "Login failed",
        //         description: "Please try again",
        //         variant: "destructive",
        //     });
        // }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-background flex">
            {/* Left Panel - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-sidebar p-12 flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-sidebar via-sidebar to-primary/20" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-sidebar-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-2xl" />

                <div className="relative">
                    <div className="flex items-center gap-3 mb-16">
                        <div className="w-12 h-12 rounded-xl bg-sidebar-primary flex items-center justify-center">
                            <Image src="/logo.png" alt="ProjectPulse" width={300} height={300} className="rounded-full"/>
                        </div>
                        <div>
                            <h1 className="font-bold text-2xl text-sidebar-foreground">
                                ProjectPulse
                            </h1>
                            <p className="text-sm text-sidebar-foreground/60">
                                Project Health Tracker
                            </p>
                        </div>
                    </div>

                    <h2 className="text-4xl font-bold text-sidebar-foreground mb-6 leading-tight">
                        Monitor project health.
                        <br />
                        <span className="text-sidebar-primary">
                            Act before issues escalate.
                        </span>
                    </h2>
                    <p className="text-sidebar-foreground/70 text-lg max-w-md">
                        Real-time health scoring, structured feedback, and risk
                        management for modern software teams.
                    </p>
                </div>

                <div className="relative grid grid-cols-3 gap-4">
                    {[
                        {
                            label: "Health Score",
                            value: "87%",
                            color: "text-success",
                        },
                        {
                            label: "Active Projects",
                            value: "12",
                            color: "text-sidebar-primary",
                        },
                        {
                            label: "Risks Resolved",
                            value: "94%",
                            color: "text-sidebar-foreground",
                        },
                    ].map((stat, i) => (
                        <div
                            key={i}
                            className="p-4 rounded-xl bg-sidebar-accent/50 backdrop-blur-sm"
                        >
                            <p className={cn("text-2xl font-bold", stat.color)}>
                                {stat.value}
                            </p>
                            <p className="text-xs text-sidebar-foreground/60">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Panel - Login Form */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md animate-fade-in">
                    <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                            <Activity className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <h1 className="font-bold text-xl">ProjectPulse</h1>
                    </div>

                    <Card className="border-0 shadow-elevated">
                        <CardHeader className="text-center pb-2">
                            <CardTitle className="text-2xl">
                                Welcome back
                            </CardTitle>
                            <CardDescription>
                                Sign in to access your dashboard
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Select your role</Label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {roles.map(
                                            ({
                                                role,
                                                label,
                                                icon: Icon,
                                                description,
                                            }) => (
                                                <button
                                                    key={role}
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedRole(role);
                                                        // setEmail(
                                                        //     demoEmails[role]
                                                        // );
                                                    }}
                                                    className={cn(
                                                        "p-3 rounded-lg border-2 transition-all duration-200 text-left",
                                                        selectedRole === role
                                                            ? "border-primary bg-primary/5"
                                                            : "border-border hover:border-primary/30"
                                                    )}
                                                >
                                                    <Icon
                                                        className={cn(
                                                            "w-5 h-5 mb-2",
                                                            selectedRole ===
                                                                role
                                                                ? "text-primary"
                                                                : "text-muted-foreground"
                                                        )}
                                                    />
                                                    <p className="font-medium text-sm">
                                                        {label}
                                                    </p>
                                                    <p className="text-[10px] text-muted-foreground">
                                                        {description}
                                                    </p>
                                                </button>
                                            )
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        // placeholder={demoEmails[selectedRole]}
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        className="h-11"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Demo: Leave empty to use sample account
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        defaultValue="demo1234"
                                        className="h-11"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-11"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <span className="animate-pulse">
                                            Signing in...
                                        </span>
                                    ) : (
                                        <>
                                            Sign in as {selectedRole}
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </>
                                    )}
                                </Button>
                            </form>

                            <div className="mt-6 pt-6 border-t border-border">
                                <p className="text-xs text-center text-muted-foreground">
                                    This is a demo application. Select any role
                                    to explore the dashboard.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
