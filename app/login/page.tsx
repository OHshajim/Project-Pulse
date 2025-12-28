import AuthBranding from "@/components/auth/AuthBranding";
import AuthForm from "@/components/auth/AuthForm";

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
                <AuthForm isSignUp={false} />
            </div>
        </div>
    );
}
