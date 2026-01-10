import { connectDB } from "@/lib/mongodb";
import { requireAdminByClerkId } from "@/lib/requireAdmin";
import Project from "@/models/Project";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const { id } = await params;
    try {
        await connectDB();
        const user  = await requireAdminByClerkId(id);
        const data = await Project.find({ createdBy: user._id })
            .populate({
                path: "clientId",
                select: "name email",
            })
            .populate({
                path: "employeeIds",
                select: "name email",
            });
        return NextResponse.json({ projects: data });

    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}