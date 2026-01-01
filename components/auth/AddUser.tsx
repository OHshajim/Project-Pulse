"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowRight, CheckCircle } from "lucide-react";
import { postUserData } from "@/data/userData";
import { useUser } from "@clerk/nextjs";
import Roles from "./Roles";

interface AddUserDialogProps {
    trigger: React.ReactNode;
    onUserAdded?: () => void;
}

export function AddUserDialog({ trigger, onUserAdded }: AddUserDialogProps) {
    const {user} = useUser();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("EMPLOYEE");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [open, setOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !role || !password || !name) {
            alert("All fields are required");
            return;
        }

        setIsLoading(true);

        try {
            const res = await postUserData({
                email,
                role,
                name,
                password,
                createdBy: user?.id || "SYSTEM",
            });
            if (res.user) {
                setIsSuccess(true);
                if (onUserAdded) onUserAdded();
            } else {
                alert("Failed to create user");
            }
        } catch (err: any) {
            console.error(err);
            alert(err?.response?.data?.error || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
        if (!newOpen) {
            // Reset state when dialog closes
            setTimeout(() => {
                setEmail("");
                setRole("EMPLOYEE");
                setPassword("");
                setIsSuccess(false);
            }, 200);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        Add New User
                    </DialogTitle>
                    <DialogDescription>
                        {isSuccess
                            ? `User ${email} created successfully!`
                            : "Enter user details to create a new account."}
                    </DialogDescription>
                </DialogHeader>

                {isSuccess ? (
                    <div className="space-y-4 py-4">
                        <div className="p-4 rounded-lg bg-success/10 border border-success/20 flex items-center gap-2">
                            <CheckCircle className="text-success" />
                            <p className="text-sm text-success font-medium">
                                {email} ({role}) has been added successfully.
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => setIsSuccess(false)}
                            >
                                Add another
                            </Button>
                            <Button
                                className="flex-1"
                                onClick={() => handleOpenChange(false)}
                            >
                                Done
                            </Button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 py-4">
                        <Roles
                            selectedRole={role}
                            setSelectedRole={setRole}
                        />
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="h-11"
                                autoFocus
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="user@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-11"
                                autoFocus
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                                    Creating...
                                </span>
                            ) : (
                                <>
                                    Create User
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </>
                            )}
                        </Button>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
