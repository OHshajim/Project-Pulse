import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            index: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        role: {
            type: String,
            enum: ["employee", "admin", "client"],
            default: "client",
        },

        resetPasswordOtp: {
            type: Number,
        },

        resetPasswordOtpExpires: {
            type: Date,
        },
    },
    { timestamps: true }
);

export const User = models.User || mongoose.model("User", UserSchema);
