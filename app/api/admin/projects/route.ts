import { NextRequest, NextResponse } from "next/server";
import Project from "@/models/Project";
import { requireAdminByClerkId } from "@/lib/requireAdmin";

// CREATE PROJECT
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const user = await requireAdminByClerkId(body.createdBy);
        const project = await Project.create({ ...body, createdBy: user._id });
        return NextResponse.json(project, { status: 201 });
    } catch (error: any) {
        console.error("Error creating project:", error);
        return NextResponse.json(
            { message: error.message || "Failed to create project" },
            { status: 400 }
        );
    }
}
