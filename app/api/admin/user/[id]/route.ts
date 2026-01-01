import { clerk } from "@/lib/clerk";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;

    try {
        const body = await req.json();
        const { name, email, role, password } = body;

        // 1️⃣ Update Clerk user
        const updateData: any = {
            unsafeMetadata: {},
        };

        if (name) updateData.unsafeMetadata.name = name;
        if (role) updateData.unsafeMetadata.role = role;
        if (email) updateData.emailAddress = [email.toLowerCase()];
        if (password) updateData.password = password;

        // Remove empty objects
        if (Object.keys(updateData.unsafeMetadata).length === 0)
            delete updateData.unsafeMetadata;

        const updatedClerkUser = await clerk.users.updateUser(
            id,
            updateData
        );
        await connectDB();
        const updatedUser = await User.findOneAndUpdate(
            { clerkId: id },
            {
                ...(name && { name }),
                ...(role && { role }),
                ...(email && { email: email.toLowerCase() }),
            },
            { new: true }
        );
        return NextResponse.json({
            message: "User updated successfully",
            updatedClerkUser,
            updatedUser,
        });
    } catch (err: any) {
        console.error("UPDATE USER ERROR:", err);
        return NextResponse.json(
            { error: err.message || "Failed to update user" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    const { id } = await params;

    try {
        
        await clerk.users.deleteUser(id);
        await connectDB(); // make sure DB is connected
        await User.findOneAndDelete({ clerkId: id });

        return NextResponse.json({ message: "User deleted" });
    } catch (err: any) {
        console.error("DELETE USER ERROR:", err);
        return NextResponse.json(
            { error: err.message || "Failed to delete user" },
            { status: 500 }
        );
    }
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const { id } = await params;
    try {
        await connectDB();
        const users = await User.find({ createdBy : id });

        // Optional: merge Clerk info
        const merged = await Promise.all(
            users.map(async (u) => {
                const clerkData = await clerk.users.getUser(u.clerkId);
                return {
                    id: u.clerkId,
                    name: u.name,
                    email: u.email,
                    role: u.role,
                    lastSignIn: clerkData.lastSignInAt,
                };
            })
        );

        return NextResponse.json({ users: merged });
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}