import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
    {
        clerkId: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        role: {
            type: String,
            enum: ["ADMIN", "EMPLOYEE", "CLIENT"],
            required: true,
        },
        createdBy: { type: String },
    },
    { timestamps: true }
);

export const User = models.User || mongoose.model("User", UserSchema);
