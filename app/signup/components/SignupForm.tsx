"use client";

import { useState } from "react";
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
import {
    Activity,
    Shield,
    Users,
    Briefcase,
    ArrowRight,
    ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const SignupForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [selectedRole, setSelectedRole] = useState<string>("employee");
    const [isLoading, setIsLoading] = useState(false);

    const roles: {
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // if (!name.trim()) {
        //     toast({
        //         title: "Name required",
        //         description: "Please enter your full name",
        //         variant: "destructive",
        //     });
        //     return;
        // }

        // if (!email.trim()) {
        //     toast({
        //         title: "Email required",
        //         description: "Please enter your email address",
        //         variant: "destructive",
        //     });
        //     return;
        // }

        // if (password.length < 6) {
        //     toast({
        //         title: "Password too short",
        //         description: "Password must be at least 6 characters",
        //         variant: "destructive",
        //     });
        //     return;
        // }

        // if (password !== confirmPassword) {
        //     toast({
        //         title: "Passwords don't match",
        //         description: "Please make sure your passwords match",
        //         variant: "destructive",
        //     });
        //     return;
        // }

        // setIsLoading(true);

        // // Simulate signup
        // await new Promise((resolve) => setTimeout(resolve, 800));

        // // For demo, auto-login after signup
        // const success = login(email, selectedRole);

        // if (success) {
        //     toast({
        //         title: "Account created!",
        //         description: "Welcome to ProjectPulse",
        //     });
        //     navigate("/dashboard");
        // } else {
        //     toast({
        //         title: "Signup failed",
        //         description: "Please try again",
        //         variant: "destructive",
        //     });
        // }
        setIsLoading(false);
    };
    return (
        <div className="w-full max-w-md animate-fade-in">
            <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                    <Activity className="w-5 h-5 text-primary-foreground" />
                </div>
                <h1 className="font-bold text-xl">ProjectPulse</h1>
            </div>

            <Card className="border-0 shadow-elevated">
                <CardHeader className="text-center pb-2">
                    <CardTitle className="text-2xl">Create account</CardTitle>
                    <CardDescription>
                        Sign up to get started with ProjectPulse
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-5">
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
                                            onClick={() =>
                                                setSelectedRole(role)
                                            }
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
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="h-11"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-11"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="h-11"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    className="h-11"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-11"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="animate-pulse">
                                    Creating account...
                                </span>
                            ) : (
                                <>
                                    Create account
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-border text-center">
                        <p className="text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="text-primary hover:underline font-medium"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SignupForm;
