import { connectDB } from "@/lib/mongodb";
import { requireAdminByClerkId } from "@/lib/requireAdmin";
import Risk from "@/models/Risk";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const { id } = await params;
    try {
        await connectDB();
        const user  = await requireAdminByClerkId(id);
        const data = await Risk.find({ createdBy: user._id })
            .populate({
                path: "createdBy",
                select: "name email",
            })
            .populate({
                path: "projectId",
                select: "name",
            });
        return NextResponse.json({ risks: data });
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}