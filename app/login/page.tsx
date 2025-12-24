import Image from "next/image";
import LoginForm from "./components/LoginForm";
import AuthBranding from "@/components/AuthBranding";

export default function Login() {

    return (
        <div className="min-h-screen bg-background flex">
            {/* Branding */}
            <AuthBranding
                description="Real-time health scoring, structured feedback, and risk
                    management for modern software teams."
                subtitle="Act before issues escalate."
                title="Monitor project health."
            />

            {/* Login Form */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md animate-fade-in">
                    <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
                        <div className="w-10 h-10 flex items-center justify-center">
                            <Image
                                src="/logo.png"
                                alt="ProjectPulse"
                                width={300}
                                height={300}
                                className="rounded-full"
                            />
                        </div>
                        <h1 className="font-bold text-xl">ProjectPulse</h1>
                    </div>
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}
