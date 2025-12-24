"use client";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Shield, Users, Briefcase, ArrowRight } from "lucide-react";
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
import { ForgotPasswordDialog } from "./ForgotPasswordDialog";

const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [selectedRole, setSelectedRole] = useState("admin");
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
    return (
        <Card className="border-0 shadow-elevated">
            <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl">Welcome back</CardTitle>
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
                                ({ role, label, icon: Icon, description }) => (
                                    <button
                                        key={role}
                                        type="button"
                                        onClick={() => {
                                            setSelectedRole(role);
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
                                                selectedRole === role
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
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="h-11"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                            <ForgotPasswordDialog
                                trigger={
                                    <button
                                        type="button"
                                        className="text-xs text-primary hover:underline font-medium"
                                    >
                                        Forgot password?
                                    </button>
                                }
                            />
                        </div>
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
                            <span className="animate-pulse">Signing in...</span>
                        ) : (
                            <>
                                Sign in as {selectedRole}
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </>
                        )}
                    </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-border justify-between text-center">
                    <p className="text-sm text-muted-foreground">
                        {`Don't have an account? `}
                        <Link
                            href="/signup"
                            className="text-primary hover:underline font-medium"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default LoginForm;
