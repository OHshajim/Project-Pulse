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
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ForgotPasswordDialog } from "@/app/login/components/ForgotPasswordDialog";
import { z } from "zod";
// import { toast } from "@/hooks/use-toast";
import { Login, Register } from "@/lib/auth";
import Roles from "./Roles";

/* -------------------- VALIDATION -------------------- */
const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.string(),
});

const registerSchema = loginSchema
    .extend({
        name: z.string().min(2, "Name is too short"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });

/* -------------------- COMPONENT -------------------- */
const AuthForm = ({ isSignUp }: { isSignUp: boolean }) => {
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

        try {
            const payload = {
                ...form,
                role: selectedRole,
            };

            if (isSignUp) {
                const validated = registerSchema.parse(payload);
                await Register(validated);

                // toast({
                //     title: "Account created 🎉",
                //     description: "Welcome to ProjectPulse",
                // });
            } else {
                const validated = loginSchema.parse(payload);
                await Login(validated);

                // toast({
                //     title: "Welcome back 👋",
                //     description: `Signed in as ${selectedRole}`,
                // });
            }

            // router.push("/dashboard");
        } catch (err: any) {
            if (err.name === "ZodError") {
                // toast({
                //     title: "Invalid input",
                //     description: err.errors[0].message,
                //     variant: "destructive",
                // });
            } else {
                // toast({
                //     title: "Something went wrong",
                //     description: "Please try again",
                //     variant: "destructive",
                // });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md animate-fade-in">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
                <Image
                    src="/logo.png"
                    alt="ProjectPulse"
                    width={40}
                    height={40}
                    className="rounded-full"
                />
                <h1 className="font-bold text-xl">ProjectPulse</h1>
            </div>

            <Card className="border-0 shadow-elevated">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">
                        {isSignUp ? "Create account" : "Welcome back"}
                    </CardTitle>
                    <CardDescription>
                        {isSignUp
                            ? "Sign up to get started with ProjectPulse"
                            : "Sign in to access your dashboard"}
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <Roles
                            selectedRole={selectedRole}
                            setSelectedRole={setSelectedRole}
                        />

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
