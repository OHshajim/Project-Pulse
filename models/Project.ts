import mongoose, { Schema, models } from "mongoose";

const ProjectSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        clientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        employeeIds: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "User",
            required: true,
        },

        status: {
            type: String,
            enum: ["on-track", "at-risk", "critical", "completed"],
            default: "on-track",
        },

        health: {
            type: String,
            enum: ["good", "warning", "critical"],
            default: "good",
        },

        healthScore: {
            type: Number,
            min: 0,
            max: 100,
            default: 100,
        },

        startDate: {
            type: Date,
            required: true,
        },

        endDate: {
            type: Date,
            required: true,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        isArchived: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export default models.Project || mongoose.model("Project", ProjectSchema);
