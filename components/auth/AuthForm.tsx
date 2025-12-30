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
import { ArrowRight, LayoutDashboard } from "lucide-react";
import Link from "next/link";
// import { toast } from "@/hooks/use-toast";
import Roles from "./Roles";
import { ForgotPasswordDialog } from "@/app/(auth)/login/components/ForgotPasswordDialog";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { toast } from "sonner";
import { redirect } from "next/navigation";

/* -------------------- COMPONENT -------------------- */
const AuthForm = ({ isSignUp }: { isSignUp: boolean }) => {
    const { signIn, isLoaded } = useSignIn();
    const { signUp ,isLoaded: signUpLoading} = useSignUp();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [selectedRole, setSelectedRole] = useState("employee");
    const [isLoading, setIsLoading] = useState(false);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const email = form.email.trim().toLowerCase();
        try {
            if (isSignUp) {
                if (!signUpLoading) return;
                const result = await signUp.create({
                    emailAddress: email,
                    password: form.password,
                    unsafeMetadata: {
                        role: selectedRole,
                        name: form.name,
                    },
                });
                 if (result.status === "complete") {
                     toast.success("Account created 🎉");
                     redirect("/dashboard");
                 } else {
                     console.log("Additional step required:", result);
                 }
            } else {
                if (!isLoaded) return;
                console.log("Email being sent to Clerk:", email);
                const result = await signIn.create({
                    identifier: email,
                    password: form.password,
                });

                if (result.status === "complete") {
                    toast.success("Welcome to Project Pulse 🎉");
                    redirect("/dashboard");
                } else {
                    console.log("Additional step required:", result);
                }
            }

        } catch (err: any) {
            console.log(err);
            console.log(err.errors?.[0]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md animate-fade-in">
            {/* Mobile Logo */}
            <Card className="border-0 shadow-elevated">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">
                        {isSignUp ? "Create account" : "Welcome back"}
                    </CardTitle>
                    <Link
                        href={"/"}
                        className="lg:hidden flex items-center gap-3 py-2 justify-center"
                    >
                        <LayoutDashboard className="w-6 h-6 text-sidebar-primary-foreground" />
                        <h1 className="font-bold text-2xl">ProjectPulse</h1>
                    </Link>
                    <CardDescription>
                        {isSignUp
                            ? "Sign up to get started with ProjectPulse"
                            : "Sign in to access your dashboard"}
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {isSignUp && (
                            <Roles
                                selectedRole={selectedRole}
                                setSelectedRole={setSelectedRole}
                            />
                        )}
                        {isSignUp && (
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className="h-11"
                                />
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className="h-11"
                            />
                        </div>

                        <div
                            className={`grid ${
                                isSignUp ? "grid-cols-2" : "grid-cols-1"
                            } gap-3`}
                        >
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Password</Label>
                                    {!isSignUp && (
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
                                    )}
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="h-11"
                                />
                            </div>

                            {isSignUp && (
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">
                                        Confirm
                                    </Label>
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="h-11"
                                    />
                                </div>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-11"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="animate-pulse">
                                    {isSignUp
                                        ? "Creating account..."
                                        : "Signing in..."}
                                </span>
                            ) : (
                                <>
                                    {isSignUp
                                        ? "Create account"
                                        : `Sign in as ${selectedRole}`}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 pt-6 border-t text-center">
                        <p className="text-sm text-muted-foreground">
                            {isSignUp ? (
                                <>
                                    Already have an account?{" "}
                                    <Link
                                        href="/login"
                                        className="text-primary font-medium hover:underline"
                                    >
                                        Sign in
                                    </Link>
                                </>
                            ) : (
                                <>
                                    Don’t have an account?{" "}
                                    <Link
                                        href="/signup"
                                        className="text-primary font-medium hover:underline"
                                    >
                                        Sign up
                                    </Link>
                                </>
                            )}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AuthForm;
