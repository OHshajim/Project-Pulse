import { cn } from "@/lib/utils";
import { Activity } from "lucide-react";

const AuthBranding = ({
    title,
    subtitle,
    description,
}: {
    title: string;
    subtitle: string;
    description: string;
}) => {
    return (
        <div className="hidden lg:flex lg:w-1/2 bg-sidebar p-12 flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-sidebar via-sidebar to-primary/20" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-sidebar-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-2xl" />

            <div className="relative">
                <div className="flex items-center gap-3 mb-16">
                    <div className="w-12 h-12 rounded-xl bg-sidebar-primary flex items-center justify-center">
                        <Activity className="w-6 h-6 text-sidebar-primary-foreground" />
                    </div>
                    <div>
                        <h1 className="font-bold text-2xl text-sidebar-foreground">
                            ProjectPulse
                        </h1>
                        <p className="text-sm text-sidebar-foreground/60">
                            Project Health Tracker
                        </p>
                    </div>
                </div>

                <h2 className="text-4xl font-bold text-sidebar-foreground mb-6 leading-tight">
                    {title}
                    <br />
                    <span className="text-sidebar-primary">{subtitle}</span>
                </h2>
                <p className="text-sidebar-foreground/70 text-lg max-w-md">
                    {description}
                </p>
            </div>

            <div className="relative grid grid-cols-3 gap-4">
                {[
                    {
                        label: "Health Score",
                        value: "87%",
                        color: "text-success",
                    },
                    {
                        label: "Active Projects",
                        value: "12",
                        color: "text-sidebar-primary",
                    },
                    {
                        label: "Risks Resolved",
                        value: "94%",
                        color: "text-sidebar-foreground",
                    },
                ].map((stat, i) => (
                    <div
                        key={i}
                        className="p-4 rounded-xl bg-sidebar-accent/50 backdrop-blur-sm"
                    >
                        <p className={cn("text-2xl font-bold", stat.color)}>
                            {stat.value}
                        </p>
                        <p className="text-xs text-sidebar-foreground/60">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AuthBranding;