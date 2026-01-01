"use client";

import { useState } from "react";
import Link from "next/link";
import { useSignIn } from "@clerk/nextjs";
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
import { ForgotPasswordDialog } from "@/app/(auth)/login/components/ForgotPasswordDialog";
import { toast } from "sonner";
import API from "@/hooks/useAxios";

const AuthForm = ({ isSignUp }: { isSignUp: boolean }) => {
    const { signIn, isLoaded ,setActive} = useSignIn();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Add password validation for sign-up
        if (isSignUp && form.password !== form.confirmPassword) {
            toast.error("Passwords do not match");
            setIsLoading(false);
            return;
        }

        // Add password strength validation
        if (isSignUp && form.password.length < 8) {
            toast.error("Password must be at least 8 characters");
            setIsLoading(false);
            return;
        }
        const email = form.email.trim().toLowerCase();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address");
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        
        if (!isLoaded || !signIn) return;
        try {
            if (isSignUp) {
                const res = await API.post('/api/admin/signUp', {
                    name: form.name,
                    email: email,
                    password: form.password,
                });
                if (res.status !== 201) {
                    toast.error("Admin signup failed");
                    return;
                }

                // 2️⃣ Sign in immediately
                const result = await signIn.create({
                    identifier: email,
                    password : form.password,
                });

                await setActive({
                    session: result.createdSessionId,
                });
                toast.success("Admin logged in 🎉");
                window.location.href = "/dashboard";
            } else {
                const result = await signIn.create({
                    identifier: email,
                    password: form.password,
                });

                if (result.status === "complete") {
                    await setActive({ session: result.createdSessionId });
                    toast.success("Welcome to Project Pulse 🎉");
                    window.location.href = "/dashboard";
                } else {
                    console.log("Additional step required:", result);
                }
            }
        } catch (err: any) {
        const errorMessage = err.errors?.[0]?.message || "Authentication failed";
        toast.error(errorMessage);
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
                                        : `Sign in`}
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
