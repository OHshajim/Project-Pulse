import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { sendEmail } from "@/lib/sendEmail";

export async function POST(req: Request) {
    try {
        await connectDB();

        const { email } = await req.json();

        if (!email) {
            return NextResponse.json(
                { message: "Email is required" },
                { status: 400 }
            );
        }

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        const otp = Math.floor(100000 + Math.random() * 900000);

        user.resetPasswordOtp = otp;
        user.resetPasswordOtpExpires = new Date(
            Date.now() + 10 * 60 * 1000 // 10 minutes
        );

        await user.save();

        await sendEmail(
            user.email,
            "Reset your password",
            `
        <h2>Password Reset</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP will expire in 10 minutes.</p>
      `
        );

        return NextResponse.json({
            message: "OTP sent to your email",
        });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
