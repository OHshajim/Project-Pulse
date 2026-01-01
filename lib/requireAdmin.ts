import { User } from "@/models/User";
import { connectDB } from "./mongodb";

export async function requireAdminByClerkId(userId: string) {
    if (!userId) throw new Error("Unauthorized");

    await connectDB();

    const user = await User.findOne({ clerkId: userId });

    if (!user || user.role !== "ADMIN") {
        throw new Error("Forbidden");
    }

    return user;
}
