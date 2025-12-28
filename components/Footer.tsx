import { LayoutDashboard } from "lucide-react";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="py-12 bg-sidebar text-sidebar-foreground border-t border-sidebar-border">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                    >
                        <div className="w-9 h-9 bg-sidebar-primary rounded-lg flex items-center justify-center">
                            <LayoutDashboard className="w-5 h-5 text-sidebar-primary-foreground" />
                        </div>
                        <span className="text-lg font-semibold">
                            ProjectFlow
                        </span>
                    </Link>

                    {/* Links */}
                    <nav className="flex items-center gap-8 text-sm">
                        <Link
                            href="/login"
                            className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/signup"
                            className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
                        >
                            Sign Up
                        </Link>
                    </nav>

                    {/* Copyright */}
                    <p className="text-sm text-sidebar-foreground/50">
                        © {new Date().getFullYear()} ProjectFlow. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
