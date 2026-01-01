import { NextResponse } from "next/server";
import { User } from "@/models/User";
import { connectDB } from "@/lib/mongodb";
import { clerk } from "@/lib/clerk";

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();
        if (!name || !email || !password) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        await connectDB();
        // 🚫 Block if admin already exists
        const adminExists = await User.findOne({ email: email, role: "ADMIN" });
        if (adminExists) {
            return NextResponse.json(
                { message: "Admin already exists" },
                { status: 403 }
            );
        }


        // 👤 Create Clerk user
        const clerkUser = await clerk.users.createUser({
            emailAddress: [email.toLowerCase()],
            password,
            unsafeMetadata: {
                role: "ADMIN",
                name,
            },
        });

        // 💾 Save in MongoDB
        await User.create({
            clerkId: clerkUser.id,
            name,
            email: email.toLowerCase(),
            role: "ADMIN",
        });

        return NextResponse.json(
            { message: "Admin account created successfully" },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("ADMIN SIGNUP ERROR:", error);

        if (error?.errors?.[0]?.message) {
            return NextResponse.json(
                { message: error.errors[0].message },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
