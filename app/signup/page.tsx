import AuthBranding from "@/components/auth/AuthBranding";
import AuthForm from "@/components/auth/AuthForm";

export default function Signup() {
    return (
        <div className="min-h-screen bg-background flex">
            {/* Branding */}
            <AuthBranding
                title="Join your team."
                subtitle="Start tracking health today."
                description="Create your account to access real-time project monitoring,
                feedback systems, and risk management tools."
            />
            {/* Signup Form */}
            <div className="flex-1 flex items-center justify-center p-8">
                <AuthForm isSignUp={true} />
            </div>
        </div>
    );
}
