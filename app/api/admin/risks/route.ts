import { NextRequest, NextResponse } from "next/server";
import { requireAdminByClerkId } from "@/lib/requireAdmin";
import Risk from "@/models/Risk";

// CREATE RISK
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const user = await requireAdminByClerkId(body.createdBy);
        const risk = await Risk.create({ ...body, createdBy: user._id });
        return NextResponse.json(risk, { status: 201 });
    } catch (error: any) {
        console.error("Error creating risk:", error);
        return NextResponse.json(
            { message: error.message || "Failed to create risk" },
            { status: 400 }
        );
    }
}
