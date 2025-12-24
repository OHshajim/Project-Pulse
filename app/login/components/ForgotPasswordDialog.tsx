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
import { Mail, ArrowRight, CheckCircle } from "lucide-react";

interface ForgotPasswordDialogProps {
    trigger: React.ReactNode;
}

export function ForgotPasswordDialog({ trigger }: ForgotPasswordDialogProps) {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [open, setOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.trim()) {
            // toast({
            //     title: "Email required",
            //     description: "Please enter your email address",
            //     variant: "destructive",
            // });
            return;
        }

        setIsLoading(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setIsLoading(false);
        setIsSuccess(true);

        // toast({
        //     title: "Reset link sent",
        //     description: "Check your email for password reset instructions",
        // });
    };

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
        if (!newOpen) {
            // Reset state when dialog closes
            setTimeout(() => {
                setEmail("");
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
                        {isSuccess ? (
                            <>
                                <CheckCircle className="w-5 h-5 text-success" />
                                Check your email
                            </>
                        ) : (
                            <>
                                <Mail className="w-5 h-5 text-primary" />
                                Reset password
                            </>
                        )}
                    </DialogTitle>
                    <DialogDescription>
                        {isSuccess
                            ? "We've sent password reset instructions to your email address."
                            : "Enter your email address and we'll send you a link to reset your password."}
                    </DialogDescription>
                </DialogHeader>

                {isSuccess ? (
                    <div className="space-y-4 py-4">
                        <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                            <p className="text-sm text-success font-medium">
                                Reset link sent to {email}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                                {`Didn't receive the email? Check your spam folder
                                or try again.`}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => setIsSuccess(false)}
                            >
                                Try different email
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
                        <div className="space-y-2">
                            <Label htmlFor="reset-email">Email address</Label>
                            <Input
                                id="reset-email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-11"
                                autoFocus
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full h-11"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="animate-pulse">
                                    Sending...
                                </span>
                            ) : (
                                <>
                                    Send reset link
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
