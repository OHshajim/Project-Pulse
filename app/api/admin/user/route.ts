import { NextResponse } from "next/server";
import { User } from "@/models/User";
import { clerk } from "@/lib/clerk";
import { requireAdminByClerkId } from "@/lib/requireAdmin";
import { connectDB } from "@/lib/mongodb";

export async function POST(req: Request) {
    try {
        // 🔐 Admin only

        
        const body = await req.json();
        const { name, email, password, role, createdBy } = body;

        
        if (!name || !email || !password || !role) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }
        if (!["EMPLOYEE", "CLIENT"].includes(role)) {
            return NextResponse.json(
                { message: "Invalid role" },
                { status: 400 }
            );
        }
        
        await requireAdminByClerkId(createdBy!);
        await connectDB();

        // 🚫 Check MongoDB
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 409 }
            );
        }

        // 👤 Create user in Clerk WITH PASSWORD
        const clerkUser = await clerk.users.createUser({
            emailAddress: [email],
            password,
            unsafeMetadata: {
                role,
                name,
                createdBy: createdBy || "SYSTEM",
            },
        });

        // 💾 Save user in MongoDB
        const newUser = await User.create({
            clerkId: clerkUser.id,
            name,
            email,
            role,
            createdBy,
        });

        return NextResponse.json(
            {
                message: "User created successfully",
                user: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role,
                    createdAt: newUser.createdAt,
                },
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("CREATE USER ERROR:", error);

        // Clerk-specific error (weak password, etc.)
        if (error?.errors?.[0]?.message) {
            return NextResponse.json(
                { message: error.errors[0].message },
                { status: 400 }
            );
        }

        if (error.message === "Unauthorized") {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        if (error.message === "Forbidden") {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 });
        }

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
